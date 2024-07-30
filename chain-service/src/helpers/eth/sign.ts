import { IMessage } from 'types/dapps';
import { isHexString } from 'ethers/lib/utils';
import { ethers } from 'ethers';
import { isString } from 'lodash';
import { TypedDataUtils, TypedDataV1, typedSignatureHash } from '@metamask/eth-sig-util';
import { bufferToHex, hashPersonalMessage, toBuffer } from 'ethereumjs-util';

const hexlify = (v: string, options?: any) => {
  return !isHexString(v) ? ethers.utils.hexlify(ethers.utils.toUtf8Bytes(v), options) : v;
};

const mapToTransactionParameters = (transactionMsg: IMessage) => {
  const txData = transactionMsg.raw.params.length
    ? transactionMsg.raw.params[0]
    : transactionMsg.raw.params;

  return {
    fromAddress: txData.from,
    toAddress: txData.to || txData.recipient,
    amount: ethers.BigNumber.from(txData.amount || txData.value || '0').toString(),
    gasLimit: txData?.gasLimit ? Number(txData?.gasLimit) : undefined,
    gasPrice: txData?.gasPrice ? Number(txData?.gasPrice) : undefined,
    memo: txData?.data || '',
  };
};

export const getEvmTxData = (_dappMessage: IMessage) => {
  const jsonrpcpayload = _dappMessage.raw;

  const txInput = jsonrpcpayload.params.length ? jsonrpcpayload.params[0] : jsonrpcpayload.params;

  switch (jsonrpcpayload.method) {
    case 'personal_sign':
    case 'eth_sign': {
      return hexlify(txInput.data);
    }
    case 'eth_sendTransaction':
    case 'eth_signTransaction': {
      return { ...txInput, ...mapToTransactionParameters(_dappMessage) };
    }

    case 'eth_signTypedData':
    case 'eth_signTypedData_v2':
    case 'eth_signTypedData_v3':
    case 'eth_signTypedData_v4': {
      const data = isString(txInput.data) ? JSON.parse(txInput.data) : txInput.data;

      return txInput.version === 'V1'
        ? typedSignatureHash(data as TypedDataV1)
        : bufferToHex(TypedDataUtils.eip712Hash(data, txInput.version));
    }
    default:
      throw new Error(`Message type not supported: ${jsonrpcpayload.method}`);
  }
};

export const getEvmRPCHash = (_dappMessage: IMessage):Buffer => {
  const jsonrpcpayload = _dappMessage.raw;

  const txHash = getEvmTxData(_dappMessage);

  switch (jsonrpcpayload.method) {
    case 'personal_sign':
    case 'eth_sign': {
      const message = toBuffer(txHash);
      return hashPersonalMessage(message);
    }

    case 'eth_signTypedData':
    case 'eth_signTypedData_v2':
    case 'eth_signTypedData_v3':
    case 'eth_signTypedData_v4': {
      return toBuffer(txHash);
    }
    default:
      throw new Error(`Message type not supported: ${jsonrpcpayload.method}`);
  }
};

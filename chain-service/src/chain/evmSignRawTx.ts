import _bn from 'bn.js';
import { concatSig } from '@metamask/eth-sig-util';
import { toBuffer, publicToAddress, bufferToHex } from '@ethereumjs/util';

import Ethereum from './eth';
import { decodeBson } from '../helpers/bson/utils';
import { IMessage } from '../types/dapps';
import { getEvmRPCHash, getEvmTxData } from '../helpers/eth/sign';
import { ecrecover, fromRpcSig } from 'ethereumjs-util';

interface ISignature {
  r: any;
  s: any;
  recoveryParam: any;
  v: any;
}

class EvmSignRawTx extends Ethereum {
  signature: ISignature;
  signInMessage: IMessage;

  /**
   * constructor description
   * @param  {Setup} setup [configration of the coins/token]
   */
  constructor(network: string) {
    super(network);
  }

  // and return transaction hex and metadata
  async init(config: any): Promise<any> {
    await this.baseInit(config);
  }

  async initFromHex(hex: string) {
    this.signInMessage = decodeBson(hex);
    // assert(We assert here that metaData matches hex);

    return this.config;
  }

  get hex() {
    return getEvmTxData(this.signInMessage);
  }

  _getHashedWithSalt = (): Buffer => {
    return getEvmRPCHash(this.signInMessage);
  };

  _formatSignature(signature: ISignature) {
    const sig = {
      r: new _bn(signature.r, 16),
      s: new _bn(signature.s, 16),
      recoveryParam: signature.recoveryParam,
      v: signature.v,
    };

    sig.recoveryParam = sig.recoveryParam || 1;

    sig.v = 27 + sig.recoveryParam;
    return signature;
  }

  async setSignature(signatures: ISignature[]): Promise<any> {
    const signature = signatures[0];

    // Set the signature of the transaction
    this.signature = this._formatSignature(signature);

    return true;
  }

  getHash(): any {
    const msgHash = this._getHashedWithSalt();
    const msgHashString = Buffer.from(msgHash).toString('hex');

    return [msgHashString];
  }

  /**
 * Recover the public key from the given signature and message hash.
 *
 * @param messageHash - The hash of the signed message.
 * @param signature - The signature.
 * @returns The public key of the signer.
 */
  _recoverPublicKey(
    messageHash: Buffer,
    signature: string,
  ): Buffer {
    const sigParams = fromRpcSig(signature);
    return ecrecover(messageHash, sigParams.v, sigParams.r, sigParams.s);
  }

  _getPublicKeyFor(signature: ISignature) {
    const msgHash = this._getHashedWithSalt();

    return this._recoverPublicKey(msgHash, this._makeSignatureHex(this._formatSignature(signature)));
  }

  async isFundsReady() {
    return true;
  }

  _makeSignatureHex(sig: any) {
    return concatSig(
      // because number
      toBuffer(`0x${sig.v.toString('16')}`),
      // because bignumber library
      toBuffer(`0x${sig.r.toString('hex')}`),
      toBuffer(`0x${sig.s.toString('hex')}`)
    );
  }

  serializeTransaction() {
    return this._makeSignatureHex(this.signature);
  }

  _recoverSignature(signature: ISignature) {
    const publicKey = this._getPublicKeyFor(signature);
    const sender = publicToAddress(publicKey);
    const senderHex = bufferToHex(sender);
    return senderHex;
  }

  async verifySignature(signatures: ISignature[], pubKey: any): Promise<any> {
    try {
      const curAddr = this.getAddress(pubKey); // console.log({recoverAddr, curAddr})
      const recoverAddr = this._recoverSignature(signatures[0]);

      return recoverAddr === curAddr;
    } catch (e) {
      return false;
    }
  }

  getTxnId() {
    return this.hex;
  }
}

export default EvmSignRawTx;

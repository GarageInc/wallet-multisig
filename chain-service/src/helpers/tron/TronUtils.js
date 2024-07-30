import bs58 from 'bs58';
import createHash from 'create-hash';
import * as ethUtils from 'ethereumjs-util';

const EC = require('elliptic').ec;
const { keccak256 } = require('js-sha3');
const abiCoder = require("web3-eth-abi");

const { hexStr2byteArray } = require('@tronscan/client/src/lib/code');
const { getBase58CheckAddress } = require('@tronscan/client/src/utils/crypto');
 
const ADDRESS_SIZE = 34
const ADDRESS_PREFIX_BYTE = 0x41

const longToByteArray = (value) => {
    // we want to represent the input as a 8-bytes array
    const byteArray = new Array(8).fill(0)
    const hex256 = 0xff
    let long = value
  
    for (let index = 0; index < byteArray.length; index += 1) {
      const byte = long & hex256
  
      byteArray[index] = byte
      long = (long - byte) / 256
    }
  
    return byteArray
}
 
function byte2hexStr (byte) {
    if (typeof byte !== 'number') { throw new Error('Input must be a number') }
    
    if (byte < 0 || byte > 255) { throw new Error('Input must be a byte') }
    
    const hexByteMap = '0123456789ABCDEF'
    
    let str = ''
    str += hexByteMap.charAt(byte >> 4)
    str += hexByteMap.charAt(byte & 0x0f)
    return str
}

function _typeToString(input) {
    if (input.type === "tuple") {
      return "(" + input.components.map(_typeToString).join(",") + ")";
    }
    return input.type;
}
 
export const TronUtils = {
    ECKeySign: function (signature) {
        const r = signature.r
        const s = signature.s
        const id = signature.recoveryParam
    
        let rHex = r.toString('hex')
    
        while (rHex.length < 64) {
        rHex = `0${rHex}`
        }
    
        let sHex = s.toString('hex')
    
        while (sHex.length < 64) {
        sHex = `0${sHex}`
        }
    
        const idHex = byte2hexStr(id)
        return rHex + sHex + idHex
    },
 
    addressToHex: function (address) {
        if (address.substr(0, 2) === '41') {
            return address
        }
        const decoded = bs58.decode(address.trim())
        return decoded.slice(0, 21).toString('hex')
    },
 
    pubHexToAddressHex: function (pubHex, addressPrefix) { // actually the same as direct but better code
        const buffer = Buffer.from(pubHex, 'hex');
        const pubBuffAddr = ethUtils.pubToAddress(buffer, true);

        return `${addressPrefix}${pubBuffAddr.toString('hex')}`
    },
 
    addressHexToStr: function (addressHex) {
        const one = createHash('sha256').update(addressHex, 'hex').digest('hex')
        const hash = createHash('sha256').update(one, 'hex').digest()
        const checksum = hash.slice(0, 4) // checkSum = the first 4 bytes of hash
        const checkSummed = addressHex + checksum.toString('hex')
        return bs58.encode(Buffer.from(checkSummed, 'hex'))
    },
 
    isAddressValid: (base58Str) => {
        try {
        if (typeof base58Str !== 'string') {
            return false
        }
        if (base58Str.length !== ADDRESS_SIZE) {
            return false
        }
        let address = bs58.decode(base58Str)
        if (address.length !== 25) {
            return false
        }
        if (address[0] !== ADDRESS_PREFIX_BYTE) {
            return false
        }
        const checkSum = address.slice(21)
        address = address.slice(0, 21)
        const hash0 = createHash('sha256').update(address, 'hex').digest('hex')
        const hash1 = createHash('sha256').update(hash0, 'hex').digest('hex')
        const checkSum1 = hash1.slice(0, 6)
        const checkSum0 = checkSum.toString('hex').slice(0, 6)
        return checkSum0 === checkSum1
        } catch (e) {
        // ignore
        }
    
        return false
    },

    // https://github.com/tronscan/tronscan-node-client/blob/a8c6126440cf6d76a0f324a7837604f078489d99/src/utils/crypto.js#L184
    pubkeyHexToBytes(pubKeyHex) {
        var ec = new EC('secp256k1');
        const keyPair = ec.keyFromPublic(pubKeyHex, 'hex');
        var pubkey = keyPair.getPublic();
        var x = pubkey.x;
        var y = pubkey.y;
        var xHex = x.toString('hex');
        while (xHex.length < 64) {
          xHex = "0" + xHex;
        }
        var yHex = y.toString('hex');
        while (yHex.length < 64) {
          yHex = "0" + yHex;
        }
        var pubkeyHex = "04" + xHex + yHex;
        var pubkeyBytes = hexStr2byteArray(pubkeyHex);
        return pubkeyBytes;
    },

    // https://github.com/tronscan/tronscan-node-client/blob/a8c6126440cf6d76a0f324a7837604f078489d99/src/utils/crypto.js#L96
    computeAddressBytes(pubkeyBytes, addressPreffix) {
        if (pubkeyBytes.length === 65) {
          pubkeyBytes = pubkeyBytes.slice(1);
        }
    
        var hash = keccak256(pubkeyBytes).toString();
        var addressHex = `${addressPreffix}${hash.substring(24)}`;

        return hexStr2byteArray(addressHex);
    },

    // https://github.com/tronscan/tronscan-node-client/blob/a8c6126440cf6d76a0f324a7837604f078489d99/src/utils/crypto.js#L159
    addressBytesToStr(addressBytes) {
        return getBase58CheckAddress(addressBytes);
    },

    blockToRefData(block) {
        const hashBytes = hexStr2byteArray(block.blockID)
        const numBytes = longToByteArray(block.block_header.raw_data.number)
      
        numBytes.reverse()
      
        const generateBlockId = [
          ...numBytes.slice(0, 8),
          ...hashBytes.slice(8, hashBytes.length - 1)
        ]
      
        return { 
          ref_block_hash: Uint8Array.from(generateBlockId.slice(8, 16)),
          ref_block_bytes: Uint8Array.from(numBytes.slice(6, 8))
        };
    },

    // https://github.com/ConsenSys/abi-decoder/blob/master/index.js#L24
    encodeFunctionCall(functionAbi, functionParams, addHexPrefix = true) {
        const methodSignature = this.getFunctionSignature(functionAbi);

        const encodedParams = this.encodeFunctionParams(functionAbi, functionParams, false);

        const dataHex = `${methodSignature}${encodedParams}`;

        return addHexPrefix ? `0x${dataHex}` : dataHex;
    },

    
    encodeFunctionParams(functionAbi, functionParams, addHexPrefix = true) {
        const encodedResult = abiCoder.encodeParameters(functionAbi.inputs, functionParams);

        return addHexPrefix ? encodedResult : encodedResult.replace('0x', '');
    },

    decodeFunctionCall(functionAbi, encodedHex) {
        const methodSignature = this.getFunctionSignature(functionAbi);

        const encodedParams = encodedHex.replace(methodSignature, '');
        
        const decodedResult = abiCoder.decodeParameters(functionAbi.inputs, encodedParams);

        return decodedResult;
    },

    decodeFunctionParams(functionParamsAbi, encodedHex) {

        const decodedResult = abiCoder.decodeParameters(functionParamsAbi, encodedHex);

        return decodedResult;
    },

    getFunctionSelector(functionAbi) {
        let functionSelector = functionAbi.name;
        functionSelector += "(" +
          functionAbi.inputs
            .map(_typeToString)
            .join(",") +
        ")";

        return functionSelector;
    },

    getFunctionSignature(functionAbi) {
        let functionSelector;

        if (functionAbi.type == 'function') {
            functionSelector = this.getFunctionSelector(functionAbi);
        } else {
            functionSelector = functionAbi.name;
        }

        return this.functionSelectorToSignature(functionSelector, functionAbi.type);
    },

    functionSelectorToSignature(functionSelector, functionType) {
        let methodSignature;
        const signature = keccak256(functionSelector);

        if (functionType === "event") {
            methodSignature = signature;
        } else {
            methodSignature = signature.slice(0, 8);
        }
        
        return methodSignature;
    }
}
 
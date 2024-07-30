import mongoose from 'mongoose';
import { SessionStateSchema } from './session_state';
import { PartyStateSchema } from './party_state';
import { supportedBlockchains } from './constants';

const SignatureSchema = new mongoose.Schema(
  {
    blockchain: {
      type: String,
      required: true,
      enum: supportedBlockchains,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['pending', 'rejected', 'ready', 'expired']
    },
    assetId: {
      type: String,
      required: true,
    },
    assetType: {
      type: String,
      required: true,
      enum: ['coin', 'token', 'ERC20', 'ERC721', 'TRC10', 'TRC20', 'TRC721', 'RAW_SIGNATURE', 'EVM_SMART_CONTRACT']
    },
    addressFrom: {
      type: String,
      required: true,
    },
    rawData: {
      type: String,
      required: false,
    },
    destination: {
      type: String,
      required: true,
    },
    destinationSignature: {
      type: String,
      required: false,
    },
    destinationSignedByPubKey: {
      type: String,
      required: false,
    },
    dealHash: {
      type: String,
      required: false,
    },
    hashOrder: {
      type: Number,
      required: false,
    },
    nonce: {
      type: String,
      required: false,
      max: 16,
    },
    transactionHex: {
      type: String,
      required: true,
      max: 102400, // 100 kB
    },
    transactionId: {
      type: String,
      required: false,
      max: 256, // 100 kB
    },
    protocolVersion: {
      type: String,
      required: true,
      enum: ['1', 'secp256k1-v1']
    },
    initiatorPubKey: {
      type: String,
      required: true,
      minlength: 64,
      maxlegth: 68,
    },
    expiresIn: {
      type: Number,
      required: true,
      min: 30000, // 30 sec
      max: 600000, // 10 minutes
      default: 300000, // 5 minutes
    },
    partiesAmount: {
      type: Number,
      required: true,
      min: 2,
      max: 16,
    },
    minimumSigAmount: {
      type: Number,
      required: false,
      validate: {
        validator: function(minimumSigAmount) {
          return !minimumSigAmount || minimumSigAmount >= 2 && this.partiesAmount >= minimumSigAmount;
        },
        message: "minimumSigAmount should be between 2 and partiesAmount"
      }
    },
    partiesState: [PartyStateSchema],
    state: [SessionStateSchema],
  },
  {
    timestamps: {
      createdAt: "initiatedAt"
    }
  },
);

export const Signature = mongoose.model('signature', SignatureSchema);

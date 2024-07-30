import mongoose from 'mongoose';
import { PartyStateSchema } from './party_state';
import { SessionStateSchema } from './session_state';
import { supportedBlockchains } from './constants';

const VaultSchema = new mongoose.Schema(
  {
    blockchain: {
      type: String,
      required: true,
      enum: supportedBlockchains
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['pending', 'rejected', 'ready', 'expired']
    },
    sessionComment: {
      type: String,
      required: false,
      enum: ['ecc.secp256p1']
    },
    partiesAmount: {
      type: Number,
      required: true,
      min: 2,
      max: 16,
    },
    minimumSigAmount: {
      type: Number,
      required: true,
      min: 2,
      validate: {
        validator: function(minimumSigAmount) {
          return minimumSigAmount >= 2 && this.partiesAmount >= minimumSigAmount;
        },
        message: "minimumSigAmount should be between 2 and partiesAmount"
      }
    },
    protocolVersion: {
      type: String,
      required: true,
      min: 1,
      max: 1,
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
    partiesState: [PartyStateSchema],
    state: [SessionStateSchema],
  },
  {
    timestamps: {
      createdAt: "initiatedAt"
    }
  },
);

export const Vault = mongoose.model('vault', VaultSchema);

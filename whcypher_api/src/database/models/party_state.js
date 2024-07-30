import mongoose from 'mongoose';

export const PartyStateSchema = new mongoose.Schema(
  {
    partyPubKey: {
      type: String,
      required: true
    },
    sequence: {
      type: Number,
      required: true,
      min: 1,
      max: 16,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['pending', 'rejected', 'ready', 'expired']
    },
    accountPubKey: {
      type: String,
      required: false
    },
    partyPubKeySignature: {
      type: String,
      required: true
    },
    timestamp: {
      type: String,
      required: true
    },
  },
  {
    createdAt: "joinedAt"
  },
);

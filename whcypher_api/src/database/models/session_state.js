import mongoose from 'mongoose';

const MAX_MESSAGE_LENGTH = 100*1024; // 100 kB

export const SessionStateSchema = new mongoose.Schema(
  {
    round: {
      type: String,
      required: true,
    },
    subsessionId: {
      type: Number,
      required: false,
    },
    message: {
      type: String,
      required: true,
      minlength: 2,
      maxlegth: MAX_MESSAGE_LENGTH,
    },
    fromParty : {
      type: Number,
      required: true,
      min: 2,
      max: 16,
    },
    toParty : {
      type: Number,
      required: false,
      min: 2,
      max: 16,
    },
    partyPubKey : {
      type: String,
      required: true,
      minlength: 64,
      maxlegth: 76,
    },
    bodySignature: {
      type: String,
      required: true
    },
    timestamp: {
      type: String,
      required: true
    },
  },
  {
    createdAt: "providedAt"
  },
);

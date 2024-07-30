import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    accountKey: {
      type: String,
      required: true,
    },
    payloadEncrypted: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: {
      createdAt: "initiatedAt"
    }
  },
);

export const Activity = mongoose.model('activity', ActivitySchema);

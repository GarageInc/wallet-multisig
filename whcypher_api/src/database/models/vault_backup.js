import mongoose from 'mongoose';
import { supportedBlockchains } from './constants';

const VaultBackupSchema = new mongoose.Schema(
  {
    hashedVaultId: {
      type: String,
      required: true,
    },
    accountPubKey: {
      type: String,
      required: false
    },
    hashedName: {
      type: String,
      required: true,
    },
    encryptedVaultName: {
      type: String,
      required: true,
    },
    encryptedVaultData: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "initiatedAt"
    }
  },
);

export const VaultBackup = mongoose.model('vaultBackup', VaultBackupSchema);

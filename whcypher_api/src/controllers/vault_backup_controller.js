import { VaultBackup } from '../database';

export const createBackup = async (req, res) => {
  VaultBackup.countDocuments(
    {
      hashedVaultId: req.body.hashedVaultId,
      accountPubKey: req.body.accountPubKey,
    },
    async (error, count) => {
      if (error) {
        res.status(400).json({ error: error.message });
      } else if (count > 1) {
        res.status(400).json({ error: 'Document already exists. Max count 1.' });
      } else {
        const vaultBackup = new VaultBackup({
          hashedVaultId: req.body.hashedVaultId,
          hashedName: req.body.hashedName,
          encryptedVaultName: req.body.encryptedVaultName,
          accountPubKey: req.auth.accountPubKey,
          encryptedVaultData: req.body.encryptedVaultData,
        });

        await vaultBackup.save();
        res.status(201).json(vaultBackup);
      }
    }
  );
};

export const getBackups = async (req, res) => {
  try {
    const vaultBackups = await VaultBackup
      .find({ accountPubKey: req.query.accountPubKey })
      .select({ blockchain: 1, calculatedAddress: 1, hashedVaultId: 1, name: 1, hashedName: 1 });

    res.status(200).json(vaultBackups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBackupById = async (req, res) => {
  try {
    const vaultBackup = await VaultBackup.findOne(
      {
        hashedVaultId: req.query.hashedVaultId,
        accountPubKey: req.params.accountPubKey,
      }
    );
    if (vaultBackup) {
      res.status(200).json(vaultBackup);
    } else {
      res.status(404).json({ error: 'Backup not found!' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBackupById = async (req, res) => {
  try {
    var vaultBackup = await VaultBackup.findOne(
      {
        hashedVaultId: req.query.hashedVaultId,
        accountPubKey: req.params.accountPubKey,
      }
    );

    vaultBackup.hashedName = req.body.hashedName;
    vaultBackup.encryptedVaultName = req.body.encryptedVaultName;

    vaultBackup = await VaultBackup.findOneAndUpdate(
      {
        hashedVaultId: req.query.hashedVaultId,
        accountPubKey: req.params.accountPubKey,
      },
      vaultBackup,
      {
        new: true,
      },
    );

    res.status(200).json(vaultBackup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

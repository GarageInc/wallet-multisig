import express from 'express';
import {
  getBackups,
  getBackupById,
  createBackup,
  updateBackupById,
} from '../controllers/vault_backup_controller';

const router = express.Router();

//  curl http://localhost:3000/v1/vaults -X POST -H 'X-PUBKEY: 03702b1c0e4cf33d6b9165e9b3a0e77709b57ba09ab153098f26dc0edc5fdca8fc' -H "Content-Type: application/json"     -d "{ \"blockchain\": \"Bitcoin\", \"partiesAmount\": 3, \"minimumSigAmount\": 2 }" | jq .
router.post('/', createBackup);
router.get('/', getBackups);
router.get('/:accountPubKey', getBackupById);
router.post('/:accountPubKey', updateBackupById);

export { router };

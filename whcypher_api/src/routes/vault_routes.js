import express from 'express';
import {
  createSession,
  joinSession,
  getSessionId,
  // getMetaBySessionId,
  updateSessionState,
  confirmSession,
  rejectSession,
} from '../controllers/vault_controller';

const router = express.Router();

//  curl http://localhost:3000/v1/vaults -X POST -H 'X-PUBKEY: 03702b1c0e4cf33d6b9165e9b3a0e77709b57ba09ab153098f26dc0edc5fdca8fc' -H "Content-Type: application/json"     -d "{ \"blockchain\": \"Bitcoin\", \"partiesAmount\": 3, \"minimumSigAmount\": 2 }" | jq .
router.post('/', createSession);

router.get('/:id', getSessionId);
// router.get('/:id/_meta', getMetaBySessionId);

router.post('/:id/join', joinSession);
router.put('/:id/join', joinSession);

router.post('/:id', updateSessionState);
router.put('/:id', updateSessionState);

router.post('/:id/confirm', confirmSession);

router.post('/:id/reject', rejectSession);
router.delete('/:id/reject', rejectSession);

export { router };

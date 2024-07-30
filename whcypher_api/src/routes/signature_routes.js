import express from 'express';
import {
  createSession,
  joinSession,
  searchSessions,
  getSessionId,
  // getMetaBySessionId,
  updateSessionState,
  confirmSession,
  rejectSession,
} from '../controllers/signature_controller';

const router = express.Router();

router.post('/', createSession);

router.post('/search', searchSessions);

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

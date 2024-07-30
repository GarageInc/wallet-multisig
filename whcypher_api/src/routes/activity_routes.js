import express from 'express';
import {
  getActivities,
  createActivity,
} from '../controllers/activity_controller';

const router = express.Router();

router.get('/', getActivities);
router.post('/', createActivity);

export { router };

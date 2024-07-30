import { Activity } from '../database';

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity
      .find({ accountKey: req.query.accountPubKey });

    res.status(200).json(activities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createActivity = async (req, res) => {
  const activity = new Activity({
    id: req.body.id,
    accountKey: req.body.accountKey,
    payloadEncrypted: req.body.payloadEncrypted,
  });
  try {
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

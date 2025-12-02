const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const { auth, adminOnly } = require('../middleware/auth');

// admin-only: view activities
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const acts = await Activity.find().populate('user','name email').sort({ createdAt: -1 }).limit(500);
    res.json(acts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

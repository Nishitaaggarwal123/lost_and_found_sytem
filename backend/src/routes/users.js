const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, adminOnly, logActivity } = require('../middleware/auth');

// list users - admin only
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

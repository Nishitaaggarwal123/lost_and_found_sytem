const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');
const LostItem = require('../models/LostItem');
const { auth, logActivity } = require('../middleware/auth');

// create claim
router.post('/', auth, async (req, res) => {
  try {
    const { itemId, reason } = req.body;
    const item = await LostItem.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    const claim = await Claim.create({ item: item._id, claimant: req.user._id, reason });
    await logActivity(req.user._id, 'create_claim', { claimId: claim._id, itemId: item._id });
    res.json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// list claims (user can see their claims; admin can see all)
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { claimant: req.user._id };
    const claims = await Claim.find(query).populate('item').populate('claimant','name email');
    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

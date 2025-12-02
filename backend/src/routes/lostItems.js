const express = require('express');
const router = express.Router();
const LostItem = require('../models/LostItem');
const { auth, logActivity } = require('../middleware/auth');

// create lost item
router.post('/', auth, async (req, res) => {
  try {
    const data = req.body;
    data.reportedBy = req.user._id;
    const item = await LostItem.create(data);
    await logActivity(req.user._id, 'create_lost_item', { itemId: item._id, title: item.title });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// list lost items
router.get('/', auth, async (req, res) => {
  try {
    const items = await LostItem.find().populate('reportedBy','name email').sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

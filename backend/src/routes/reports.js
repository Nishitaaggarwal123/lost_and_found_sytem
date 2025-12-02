const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const { auth, logActivity } = require('../middleware/auth');

// create report
router.post('/', auth, async (req, res) => {
  try {
    const data = req.body;
    data.reporter = req.user._id;
    const report = await Report.create(data);
    await logActivity(req.user._id, 'create_report', { reportId: report._id, title: report.title });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// list reports (admin can see all; users see their own)
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { reporter: req.user._id };
    const reports = await Report.find(query).populate('reporter','name email').sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Activity = require('../models/Activity');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'Invalid token user' });
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid', error: err.message });
  }
};

// admin middleware
const adminOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
};

// activity logger helper
const logActivity = async (userId, action, meta) => {
  try {
    await Activity.create({ user: userId, action, meta });
  } catch (err) {
    console.error('Activity log error', err);
  }
};

module.exports = { auth, adminOnly, logActivity };

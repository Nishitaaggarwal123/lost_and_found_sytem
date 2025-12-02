const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth, adminOnly, logActivity } = require('../middleware/auth');

// signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Provide name, email and password' });
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashed });
    await logActivity(user._id, 'signup', { email });
    res.json({ message: 'User registered', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========= SINGLE LOGIN FOR BOTH ADMIN + USER ==========

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email: ADMIN_EMAIL, role: "admin" },
        process.env.JWT_SECRET || "change_this_secret",
        { expiresIn: "7d" }
      );

      return res.json({
        message: "Admin login successful",
        role: "admin",
        token,
        user: {
          name: "Admin",
          email: ADMIN_EMAIL,
          role: "admin"
        }
      });
    }

    // 2️⃣ Check user login in DB
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET || "change_this_secret",
      { expiresIn: "7d" }
    );

    return res.json({
      message: "User login successful",
      role: "user",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: "user"
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// impersonate (admin-only) - admin can get a token for any user
router.post('/impersonate/:userId', auth, adminOnly, async (req, res) => {
  try {
    const targetId = req.params.userId;
    const target = await User.findById(targetId);
    if (!target) return res.status(404).json({ message: 'User not found' });
    const token = jwt.sign({ id: target._id }, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '7d' });
    await logActivity(req.user._id, 'impersonate', { target: target._id });
    res.json({ token, user: { id: target._id, name: target.name, email: target.email, role: target.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

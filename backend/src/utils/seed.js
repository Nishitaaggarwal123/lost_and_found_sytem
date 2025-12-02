const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports.seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPass = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPass) return;
    let admin = await User.findOne({ email: adminEmail.toLowerCase() });
    if (!admin) {
      const hashed = await bcrypt.hash(adminPass, 10);
      admin = await User.create({ name: 'Admin', email: adminEmail.toLowerCase(), password: hashed, role: 'admin' });
      console.log('Admin user created:', adminEmail);
    }
  } catch (err) {
    console.error('Seed admin error', err);
  }
};

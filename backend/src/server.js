require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const lostItemRoutes = require('./routes/lostItems');
const claimRoutes = require('./routes/claims');
const reportRoutes = require('./routes/reports');
const activityRoutes = require('./routes/activities');

const { seedAdmin } = require('./utils/seed');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items/lost', lostItemRoutes);
app.use('/api/items/claim', claimRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/activities', activityRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lost_and_found_db';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(async () => {
  console.log('MongoDB connected');
  await seedAdmin();
  app.listen(PORT, () => console.log('Server running on port', PORT));
})
.catch(err => {
  console.error('DB connection error:', err);
});

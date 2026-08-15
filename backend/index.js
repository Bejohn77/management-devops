require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const User = require('./models/User');
const path = require('path');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Management system API is running' });
});

const seedUsers = async () => {
  const existingAdmin = await User.findOne({ email: 'admin@management.com' });
  if (!existingAdmin) {
    const adminPassword = await bcrypt.hash('Admin123!', 10);
    const userPassword = await bcrypt.hash('User123!', 10);

    await User.create({
      name: 'Admin User',
      email: 'admin@management.com',
      password: adminPassword,
      role: 'admin',
    });

    await User.create({
      name: 'Regular User',
      email: 'user@management.com',
      password: userPassword,
      role: 'user',
    });

    console.log('Seed accounts created: admin@management.com / Admin123! and user@management.com / User123!');
  }
};

const start = async () => {
  try {
    const dbConnected = await connectDB();
    if (dbConnected) {
      await seedUsers();
    } else {
      console.warn('Server starting without a DB connection — some routes may fail.');
    }

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../frontend/dist')));
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
      });
    }

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup error', err);
    process.exit(1);
  }
};

start();

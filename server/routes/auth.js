const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getAllUsers } = require('../controllers/userController'); // Adjust the path if needed

// Signup route (user or admin)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Server error during signup' });
  }
});

// Admin login route
router.post('/login/admin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email, role: 'admin' }).select('+password');
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Admin login error:', err);
    return res.status(500).json({ message: 'Server error during admin login' });
  }
});

// User login route
router.post('/login/user', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, role: 'user' }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    return res.status(200).json({ token });
  } catch (err) {
    console.error('User login error:', err);
    return res.status(500).json({ message: 'Server error during user login' });
  }
});

// Route to get all users
router.get('/api/users', getAllUsers);

module.exports = router;

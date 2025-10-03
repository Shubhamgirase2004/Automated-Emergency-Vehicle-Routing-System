const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all users controller
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: 1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Signup controller
exports.signup = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    // Prevent duplicate users
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role: role || 'user' });
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      'your_jwt_secret', // Use process.env.JWT_SECRET in production
      { expiresIn: '1d' }
    );

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed' });
  }
};

// User login controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      'your_jwt_secret', // Use process.env.JWT_SECRET in production
      { expiresIn: '1d' }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin login controller
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin)
      return res.status(400).json({ message: 'Invalid admin credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid admin credentials' });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      'your_jwt_secret', // Use process.env.JWT_SECRET in production
      { expiresIn: '1d' }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

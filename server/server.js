const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

app.use(express.json());

// Enable CORS for specific origin; adjust for production
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Use morgan for logging requests
app.use(morgan('dev'));

// Your auth routes
app.use('/api/auth', authRoutes);

// Error handling middleware to catch unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(err => {
  console.error('DB connection error:', err);
});

import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    user = new User({
      name,
      email,
      password
    });
    
    // Save user to database
    await user.save();
    
    // Create and sign JWT token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET || 'ecostep_jwt_secret',
      { expiresIn: '7d' }
    );
    
    // Return user info and token
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        points: user.points
      }
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Update last active
    user.lastActive = Date.now();
    await user.save();
    
    // Create and sign JWT token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET || 'ecostep_jwt_secret',
      { expiresIn: '7d' }
    );
    
    // Return user info and token
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        points: user.points
      }
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
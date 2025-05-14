import express from 'express';
import User from '../models/User.js';
import Emission from '../models/Emission.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/me
// @desc    Update user profile
// @access  Private
router.put('/me', auth, async (req, res) => {
  try {
    const { name, isPublic } = req.body;
    
    // Find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update fields
    if (name) user.name = name;
    if (isPublic !== undefined) user.isPublic = isPublic;
    
    // Save user
    await user.save();
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      points: user.points,
      isPublic: user.isPublic
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/leaderboard
// @desc    Get leaderboard
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    // Get users sorted by points (only public profiles)
    const users = await User.find({ isPublic: true })
      .select('name points achievements')
      .sort({ points: -1 })
      .limit(20);
    
    // Map to leaderboard format
    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      points: user.points,
      achievements: user.achievements.length
    }));
    
    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get recent emissions data
    const recentEmissions = await Emission.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(30);
    
    // Calculate total emissions by category
    const emissionsByCategory = await Emission.aggregate([
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      { $group: {
          _id: '$category',
          total: { $sum: '$co2Value' }
        }
      }
    ]);
    
    // Get rank on leaderboard
    const userRank = await User.countDocuments({ 
      points: { $gt: user.points },
      isPublic: true
    }) + 1;
    
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        points: user.points,
        achievements: user.achievements.length,
        rank: userRank
      },
      emissions: {
        recent: recentEmissions,
        byCategory: emissionsByCategory
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
import express from 'express';
import Emission from '../models/Emission.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import { calculateCO2 } from '../utils/carbonCalculator.js';
import { checkAchievements } from '../utils/achievementChecker.js';

const router = express.Router();

// @route   POST /api/emissions
// @desc    Create a new emission entry
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { category, subcategory, value, unit, details, date } = req.body;
    
    // Calculate CO2 equivalent
    const co2Value = calculateCO2(category, subcategory, value, unit);
    
    // Create new emission
    const emission = new Emission({
      user: req.user.id,
      category,
      subcategory,
      value,
      unit,
      co2Value,
      details,
      date: date || Date.now()
    });
    
    // Save emission
    await emission.save();
    
    // Update user points (basic points for logging)
    const user = await User.findById(req.user.id);
    user.points += 5; // Base points for logging
    user.lastActive = Date.now();
    
    // Update streak
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const lastEntry = await Emission.findOne({ 
      user: req.user.id,
      createdAt: { $gte: oneDayAgo }
    }).sort({ createdAt: -1 });
    
    if (!lastEntry) {
      user.streakDays += 1;
    }
    
    // Check for achievements
    const achievements = await checkAchievements(req.user.id);
    
    // Save user
    await user.save();
    
    res.status(201).json({
      emission,
      points: user.points,
      streakDays: user.streakDays,
      newAchievements: achievements
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/emissions
// @desc    Get user's emissions
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { category, startDate, endDate, limit = 30 } = req.query;
    
    // Build query
    const query = { user: req.user.id };
    
    if (category) {
      query.category = category;
    }
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    // Get emissions
    const emissions = await Emission.find(query)
      .sort({ date: -1 })
      .limit(Number(limit));
    
    res.json(emissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/emissions/summary
// @desc    Get emissions summary
// @access  Private
router.get('/summary', auth, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let startDate;
    const now = new Date();
    
    // Determine start date based on period
    switch(period) {
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setMonth(now.getMonth() - 1));
    }
    
    // Get total emissions by category
    const totalByCategory = await Emission.aggregate([
      { 
        $match: { 
          user: mongoose.Types.ObjectId(req.user.id),
          date: { $gte: startDate }
        } 
      },
      { 
        $group: {
          _id: '$category',
          total: { $sum: '$co2Value' }
        }
      }
    ]);
    
    // Get daily emissions for the period
    const dailyEmissions = await Emission.aggregate([
      { 
        $match: { 
          user: mongoose.Types.ObjectId(req.user.id),
          date: { $gte: startDate }
        } 
      },
      {
        $group: {
          _id: { 
            $dateToString: { format: '%Y-%m-%d', date: '$date' } 
          },
          total: { $sum: '$co2Value' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);
    
    res.json({
      totalByCategory,
      dailyEmissions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
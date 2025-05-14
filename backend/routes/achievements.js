import express from 'express';
import User from '../models/User.js';
import Achievement from '../models/Achievement.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/achievements
// @desc    Get all achievements
// @access  Public
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ points: 1 });
    res.json(achievements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/achievements/user
// @desc    Get user's achievements
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get all achievements
    const allAchievements = await Achievement.find();
    
    // Map user's earned achievements 
    const userAchievements = allAchievements.map(achievement => {
      const earned = user.achievements.find(a => a.achievementId === achievement.achievementId);
      
      return {
        ...achievement.toObject(),
        earned: !!earned,
        dateEarned: earned ? earned.dateEarned : null
      };
    });
    
    res.json(userAchievements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
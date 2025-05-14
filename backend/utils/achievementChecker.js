import User from '../models/User.js';
import Emission from '../models/Emission.js';
import Achievement from '../models/Achievement.js';

/**
 * Check for new achievements earned by the user
 * @param {string} userId - User ID
 * @returns {Array} - Array of newly earned achievements
 */
export const checkAchievements = async (userId) => {
  try {
    // Get user
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Get all achievements
    const allAchievements = await Achievement.find();
    
    // Get emissions data
    const emissions = await Emission.find({ user: userId });
    
    // Check each achievement
    const newlyEarnedAchievements = [];
    
    for (const achievement of allAchievements) {
      // Skip already earned achievements
      const alreadyEarned = user.achievements.some(
        a => a.achievementId === achievement.achievementId
      );
      
      if (alreadyEarned) continue;
      
      // Check if achievement conditions are met
      let isEarned = false;
      
      switch (achievement.achievementId) {
        case 'first_entry':
          // First carbon footprint entry
          isEarned = emissions.length > 0;
          break;
        
        case 'week_streak':
          // Log entries for 7 consecutive days
          isEarned = user.streakDays >= 7;
          break;
        
        case 'reduce_10':
          // Reduce carbon footprint by 10%
          // This would require comparing recent emissions with past emissions
          // Simplified version for demo:
          if (emissions.length >= 10) {
            const recent = emissions.slice(0, 5);
            const older = emissions.slice(5, 10);
            
            const recentAvg = recent.reduce((sum, e) => sum + e.co2Value, 0) / recent.length;
            const olderAvg = older.reduce((sum, e) => sum + e.co2Value, 0) / older.length;
            
            isEarned = recentAvg <= olderAvg * 0.9; // 10% reduction
          }
          break;
        
        case 'transport_master':
          // Log 10 low-emission transportation choices
          const lowEmissionCount = emissions.filter(e => 
            e.category === 'transport' && 
            (e.subcategory === 'train' || e.subcategory === 'bus' || 
             (e.subcategory === 'car' && e.details?.fuelType === 'electric'))
          ).length;
          
          isEarned = lowEmissionCount >= 10;
          break;
        
        case 'diet_guru':
          // Maintain plant-based diet for 14 days
          const recentDays = 14;
          const dietEntries = emissions
            .filter(e => e.category === 'diet')
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, recentDays);
          
          const plantBasedCount = dietEntries.filter(e => 
            e.subcategory === 'vegan' || e.subcategory === 'vegetarian'
          ).length;
          
          isEarned = plantBasedCount >= recentDays;
          break;
      }
      
      // If achievement earned, add to user's achievements
      if (isEarned) {
        // Add achievement to user
        user.achievements.push({
          achievementId: achievement.achievementId,
          dateEarned: Date.now()
        });
        
        // Add points to user
        user.points += achievement.points;
        
        // Add to newly earned achievements list
        newlyEarnedAchievements.push(achievement);
      }
    }
    
    // Save user if any achievements were earned
    if (newlyEarnedAchievements.length > 0) {
      await user.save();
    }
    
    return newlyEarnedAchievements;
  } catch (err) {
    console.error('Achievement check error:', err);
    return [];
  }
};
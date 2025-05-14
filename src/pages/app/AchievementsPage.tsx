import React from 'react';
import { Award, Lock, CheckCircle, TrendingUp, Calendar, Droplet, Leaf, Bike, Salad } from 'lucide-react';
import { ACHIEVEMENTS } from '../../config';

// Sample user's achievements
const userAchievements = [
  { id: 'first_entry', completed: true, date: '2023-10-15', progress: 100 },
  { id: 'week_streak', completed: true, date: '2023-10-22', progress: 100 },
  { id: 'transport_master', completed: true, date: '2023-11-05', progress: 100 },
  { id: 'reduce_10', completed: false, progress: 65 },
  { id: 'diet_guru', completed: false, progress: 30 },
];

// Map achievement icons
const getAchievementIcon = (iconName: string) => {
  switch (iconName) {
    case 'Footprints':
      return <Leaf />;
    case 'Calendar':
      return <Calendar />;
    case 'TrendingDown':
      return <TrendingUp />;
    case 'Bike':
      return <Bike />;
    case 'Salad':
      return <Salad />;
    default:
      return <Award />;
  }
};

const AchievementsPage: React.FC = () => {
  // Combine achievements with user progress data
  const achievementsWithProgress = ACHIEVEMENTS.map(achievement => {
    const userProgress = userAchievements.find(ua => ua.id === achievement.id);
    return {
      ...achievement,
      completed: userProgress?.completed || false,
      progress: userProgress?.progress || 0,
      date: userProgress?.date || null
    };
  });
  
  const totalPoints = achievementsWithProgress
    .filter(a => a.completed)
    .reduce((sum, a) => sum + a.points, 0);
  
  const completedCount = achievementsWithProgress.filter(a => a.completed).length;
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Achievements</h1>
        <p className="text-gray-600 mt-1">Track your progress and earn rewards for eco-friendly actions.</p>
      </div>
      
      {/* Summary Card */}
      <div className="card p-5 mb-6 bg-gradient-to-r from-secondary-500 to-accent-500 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="rounded-full bg-white/20 p-3 mr-4">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Your Achievements</h3>
              <p className="text-secondary-50">Keep going to unlock all eco-badges!</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-xs text-secondary-50">Completed</p>
              <p className="text-2xl font-bold">{completedCount}/{ACHIEVEMENTS.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-xs text-secondary-50">Total Points</p>
              <p className="text-2xl font-bold">{totalPoints}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievementsWithProgress.map((achievement) => (
          <div key={achievement.id} className={`card overflow-hidden transition-transform duration-300 hover:scale-[1.01] border-l-4 ${
            achievement.completed 
              ? 'border-l-green-500' 
              : achievement.progress > 0 
                ? 'border-l-warning-500' 
                : 'border-l-gray-300'
          }`}>
            <div className="p-5">
              <div className="flex justify-between">
                <div className={`rounded-full p-3 ${
                  achievement.completed 
                    ? 'bg-green-100 text-green-600' 
                    : achievement.progress > 0 
                      ? 'bg-warning-100 text-warning-500' 
                      : 'bg-gray-100 text-gray-400'
                }`}>
                  {getAchievementIcon(achievement.icon)}
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-sm text-gray-500 mr-1">
                    {achievement.points} pts
                  </span>
                  {achievement.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-300" />
                  )}
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-800 mt-3">{achievement.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
              
              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-gray-700 font-medium">{achievement.progress}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      achievement.completed 
                        ? 'bg-green-500' 
                        : achievement.progress > 50 
                          ? 'bg-warning-500' 
                          : 'bg-primary-400'
                    }`}
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>
              
              {achievement.date && (
                <p className="text-xs text-gray-500 mt-3">
                  Achieved on {new Date(achievement.date).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
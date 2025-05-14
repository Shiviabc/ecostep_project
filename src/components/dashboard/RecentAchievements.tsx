import React from 'react';
import { CheckCircle, Award, Footprints, Calendar, Bike } from 'lucide-react';

const achievements = [
  {
    id: 'first_entry',
    name: 'First Steps',
    description: 'Logged your first carbon footprint entry',
    points: 10,
    date: '2 weeks ago',
    icon: <Footprints className="h-5 w-5" />,
  },
  {
    id: 'week_streak',
    name: 'Consistency Champion',
    description: 'Logged entries for 7 consecutive days',
    points: 50,
    date: '1 week ago',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    id: 'transport_master',
    name: 'Transport Master',
    description: 'Logged 10 low-emission transportation choices',
    points: 75,
    date: '3 days ago',
    icon: <Bike className="h-5 w-5" />,
  },
];

const RecentAchievements: React.FC = () => {
  return (
    <div className="space-y-4">
      {achievements.map((achievement) => (
        <div key={achievement.id} className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="mr-3 mt-1 rounded-full p-2 bg-warning-100 text-warning-500">
            {achievement.icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center">
              <h4 className="font-medium text-gray-800">{achievement.name}</h4>
              <span className="ml-2 badge-success flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                {achievement.points} pts
              </span>
            </div>
            <p className="text-sm text-gray-600">{achievement.description}</p>
            <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
          </div>
        </div>
      ))}
      
      <div className="flex justify-center pt-2">
        <div className="flex items-center text-primary-500 text-sm font-medium">
          <Award className="h-4 w-4 mr-1" />
          View all achievements
        </div>
      </div>
    </div>
  );
};

export default RecentAchievements;
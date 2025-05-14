import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, 
  BarChart3, 
  Award, 
  PlusCircle, 
  Leaf, 
  TrendingDown, 
  Zap,
  Users
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import EmissionsChart from '../../components/dashboard/EmissionsChart';
import EmissionSummary from '../../components/dashboard/EmissionSummary';
import RecentAchievements from '../../components/dashboard/RecentAchievements';
import EcoTips from '../../components/dashboard/EcoTips';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-gray-600 mt-1">Here's an overview of your carbon footprint and progress.</p>
        </div>
        <button 
          onClick={() => navigate('/emissions')}
          className="btn-primary mt-4 md:mt-0 flex items-center"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Log New Emission
        </button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Emissions</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">423 kg</p>
              <p className="text-xs text-error-600 flex items-center mt-1">
                <TrendingDown className="h-3 w-3 mr-1" />
                12% less than average
              </p>
            </div>
            <div className="rounded-full p-3 bg-primary-100 text-primary-500">
              <Zap className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Eco Points</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">185</p>
              <p className="text-xs text-success-600 flex items-center mt-1">
                +45 this week
              </p>
            </div>
            <div className="rounded-full p-3 bg-secondary-100 text-secondary-500">
              <Leaf className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Achievements</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">3</p>
              <p className="text-xs text-primary-600 flex items-center mt-1">
                2 more to unlock
              </p>
            </div>
            <div className="rounded-full p-3 bg-accent-100 text-accent-500">
              <Award className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Leaderboard</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">#12</p>
              <p className="text-xs text-warning-600 flex items-center mt-1">
                Top 15% of users
              </p>
            </div>
            <div className="rounded-full p-3 bg-warning-100 text-warning-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="card p-5 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-primary-500" />
              Emissions Over Time
            </h3>
            <select className="text-sm border rounded-md p-1 text-gray-600">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-60">
            <EmissionsChart />
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-accent-500" />
              Emission Sources
            </h3>
          </div>
          <div className="h-60">
            <EmissionSummary />
          </div>
        </div>
      </div>
      
      {/* Achievements and Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <Award className="h-5 w-5 mr-2 text-warning-500" />
              Recent Achievements
            </h3>
            <button 
              onClick={() => navigate('/achievements')}
              className="text-sm text-primary-500 hover:text-primary-600"
            >
              View All
            </button>
          </div>
          <RecentAchievements />
        </div>
        
        <div className="card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <Leaf className="h-5 w-5 mr-2 text-success-500" />
              Eco-Friendly Tips
            </h3>
          </div>
          <EcoTips />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
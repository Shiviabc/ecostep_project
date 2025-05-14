import React from 'react';
import { CheckCircle, TrendingDown, Award, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessScreen: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-8">
      <div className="rounded-full bg-success-100 text-success-500 p-4 mx-auto w-20 h-20 flex items-center justify-center mb-6">
        <CheckCircle className="h-12 w-12" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        Emissions Logged Successfully!
      </h2>
      
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        Thanks for tracking your carbon footprint. Your data has been saved and your stats have been updated.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex justify-center mb-2">
            <TrendingDown className="h-6 w-6 text-primary-500" />
          </div>
          <h3 className="font-medium text-gray-800">Carbon Impact</h3>
          <p className="text-sm text-gray-600">32.6 kg CO₂ added to your tracking</p>
        </div>
        
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex justify-center mb-2">
            <Award className="h-6 w-6 text-secondary-500" />
          </div>
          <h3 className="font-medium text-gray-800">Points Earned</h3>
          <p className="text-sm text-gray-600">+15 points for tracking</p>
        </div>
        
        <div className="bg-accent-50 rounded-lg p-4">
          <div className="flex justify-center mb-2">
            <Leaf className="h-6 w-6 text-accent-500" />
          </div>
          <h3 className="font-medium text-gray-800">Eco Suggestion</h3>
          <p className="text-sm text-gray-600">Try carpooling to reduce emissions</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <button 
          onClick={() => navigate('/dashboard')}
          className="btn-primary"
        >
          View Dashboard
        </button>
        
        <button 
          onClick={() => navigate('/emissions')}
          className="btn-outline"
        >
          Log Another Entry
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
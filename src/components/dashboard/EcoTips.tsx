import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';

const tips = [
  {
    id: 1,
    title: 'Walk or Bike for Short Trips',
    description: 'For distances under 2 miles, walking or biking can reduce your carbon footprint by up to 100% compared to driving.',
    category: 'Transportation',
    impact: 'High',
  },
  {
    id: 2,
    title: 'Try Meatless Mondays',
    description: 'Replacing meat with plant-based foods just one day a week can reduce your dietary carbon footprint by approximately 15%.',
    category: 'Diet',
    impact: 'Medium',
  },
  {
    id: 3,
    title: 'Unplug Electronics',
    description: 'Devices on standby can account for up to 10% of home energy use. Unplug chargers and devices when not in use.',
    category: 'Energy',
    impact: 'Medium',
  },
  {
    id: 4,
    title: 'Compost Food Waste',
    description: 'Composting food scraps can reduce your waste emissions by up to 80% compared to sending them to landfill.',
    category: 'Waste',
    impact: 'High',
  },
  {
    id: 5,
    title: 'Wash Clothes in Cold Water',
    description: 'Using cold water for laundry reduces energy consumption by up to 90% per load compared to hot water.',
    category: 'Energy',
    impact: 'Medium',
  },
];

const EcoTips: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };
  
  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };
  
  const currentTip = tips[currentTipIndex];
  
  return (
    <div>
      <div className="relative p-4 bg-gray-50 rounded-lg h-40">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center mb-2">
              <div className="rounded-full p-1 mr-2 bg-success-100 text-success-500">
                <Lightbulb className="h-4 w-4" />
              </div>
              <span className={`text-xs font-medium rounded-full px-2 py-0.5 
                ${currentTip.impact === 'High' ? 'bg-success-100 text-success-600' : 
                  currentTip.impact === 'Medium' ? 'bg-warning-100 text-warning-600' : 
                  'bg-gray-100 text-gray-600'}`}>
                {currentTip.impact} Impact
              </span>
              <span className="text-xs text-gray-500 ml-2">{currentTip.category}</span>
            </div>
            
            <h4 className="font-medium text-gray-800 mb-1">{currentTip.title}</h4>
            <p className="text-sm text-gray-600 line-clamp-3">{currentTip.description}</p>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-1">
              {tips.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full ${
                    idx === currentTipIndex ? 'w-4 bg-primary-500' : 'w-1.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={prevTip}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-200"
                aria-label="Previous tip"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={nextTip}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-200"
                aria-label="Next tip"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="p-3 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-800 mb-1">Did You Know?</h5>
          <p className="text-xs text-gray-600">The average person generates about 4 tons of CO₂ annually just from their daily activities.</p>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-800 mb-1">Quick Win</h5>
          <p className="text-xs text-gray-600">Reusing a water bottle for a year saves about 1,460 plastic bottles from landfill.</p>
        </div>
      </div>
    </div>
  );
};

export default EcoTips;
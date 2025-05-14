import React, { useState } from 'react';
import { Utensils, ArrowRight, ArrowLeft } from 'lucide-react';

type DietType = 'vegan' | 'vegetarian' | 'pescatarian' | 'lowMeat' | 'mediumMeat' | 'highMeat';

const DietForm: React.FC<{ onNext: () => void; onBack: () => void }> = ({ onNext, onBack }) => {
  const [dietType, setDietType] = useState<DietType>('mediumMeat');
  const [meatServings, setMeatServings] = useState('2');
  const [dairyServings, setDairyServings] = useState('2');
  
  const dietTypes = [
    { id: 'vegan', label: 'Vegan', description: 'No animal products' },
    { id: 'vegetarian', label: 'Vegetarian', description: 'No meat, but includes dairy and eggs' },
    { id: 'pescatarian', label: 'Pescatarian', description: 'Includes fish, but no meat' },
    { id: 'lowMeat', label: 'Low Meat', description: '1-2 meat servings weekly' },
    { id: 'mediumMeat', label: 'Medium Meat', description: '3-5 meat servings weekly' },
    { id: 'highMeat', label: 'High Meat', description: 'Daily meat consumption' },
  ];
  
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you'd typically validate and save the data
    onNext();
  };
  
  return (
    <form onSubmit={handleNext}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Diet Information</h3>
      
      {/* Diet Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Diet Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dietTypes.map((diet) => (
            <button
              key={diet.id}
              type="button"
              className={`p-3 rounded-lg border flex flex-col items-start transition-colors
                ${dietType === diet.id
                  ? 'border-primary-500 bg-primary-50 text-primary-500'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              onClick={() => setDietType(diet.id as DietType)}
            >
              <span className="font-medium">{diet.label}</span>
              <span className="text-xs text-gray-500 mt-1">{diet.description}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Additional Details */}
      {(['lowMeat', 'mediumMeat', 'highMeat'].includes(dietType)) && (
        <div className="mb-4">
          <label htmlFor="meatServings" className="block text-sm font-medium text-gray-700 mb-1">
            Weekly Meat Servings
          </label>
          <select
            id="meatServings"
            value={meatServings}
            onChange={(e) => setMeatServings(e.target.value)}
            className="select"
          >
            <option value="1">1 or fewer</option>
            <option value="2">2-3</option>
            <option value="5">4-6</option>
            <option value="7">7+ (daily)</option>
          </select>
        </div>
      )}
      
      {!['vegan'].includes(dietType) && (
        <div className="mb-6">
          <label htmlFor="dairyServings" className="block text-sm font-medium text-gray-700 mb-1">
            Daily Dairy Servings
          </label>
          <select
            id="dairyServings"
            value={dairyServings}
            onChange={(e) => setDairyServings(e.target.value)}
            className="select"
          >
            <option value="0">None</option>
            <option value="1">1</option>
            <option value="2">2-3</option>
            <option value="4">4+</option>
          </select>
        </div>
      )}
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="btn-outline flex items-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </button>
        
        <button
          type="submit"
          className="btn-primary flex items-center"
        >
          Next
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default DietForm;
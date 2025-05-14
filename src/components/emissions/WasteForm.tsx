import React, { useState } from 'react';
import { Trash2, RecycleIcon, Wind, Leaf, ArrowLeft, Save } from 'lucide-react';

const WasteForm: React.FC<{ onSubmit: () => void; onBack: () => void }> = ({ onSubmit, onBack }) => {
  const [landfillWaste, setLandfillWaste] = useState('');
  const [recyclingWaste, setRecyclingWaste] = useState('');
  const [compostWaste, setCompostWaste] = useState('');
  const [recyclingHabits, setRecyclingHabits] = useState<string[]>([]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you'd typically validate and save the data
    onSubmit();
  };
  
  const handleRecyclingToggle = (item: string) => {
    setRecyclingHabits(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item) 
        : [...prev, item]
    );
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Waste Management</h3>
      
      <div className="space-y-6">
        {/* Landfill Waste */}
        <div>
          <div className="flex items-center mb-2">
            <Trash2 className="h-5 w-5 text-error-500 mr-2" />
            <label htmlFor="landfill" className="block text-sm font-medium text-gray-700">
              Landfill Waste (kg per week)
            </label>
          </div>
          <input
            id="landfill"
            type="number"
            min="0"
            step="0.1"
            value={landfillWaste}
            onChange={(e) => setLandfillWaste(e.target.value)}
            className="input"
            placeholder="Amount of weekly non-recyclable waste"
          />
        </div>
        
        {/* Recycling */}
        <div>
          <div className="flex items-center mb-2">
            <RecycleIcon className="h-5 w-5 text-primary-500 mr-2" />
            <label htmlFor="recycling" className="block text-sm font-medium text-gray-700">
              Recycling (kg per week)
            </label>
          </div>
          <input
            id="recycling"
            type="number"
            min="0"
            step="0.1"
            value={recyclingWaste}
            onChange={(e) => setRecyclingWaste(e.target.value)}
            className="input"
            placeholder="Amount of weekly recycled waste"
          />
        </div>
        
        {/* Compost */}
        <div>
          <div className="flex items-center mb-2">
            <Leaf className="h-5 w-5 text-success-500 mr-2" />
            <label htmlFor="compost" className="block text-sm font-medium text-gray-700">
              Composted Waste (kg per week)
            </label>
          </div>
          <input
            id="compost"
            type="number"
            min="0"
            step="0.1"
            value={compostWaste}
            onChange={(e) => setCompostWaste(e.target.value)}
            className="input"
            placeholder="Amount of weekly composted waste"
          />
        </div>
        
        {/* Recycling Habits */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recycling Habits (select all that apply)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { id: 'paper', label: 'Paper & Cardboard' },
              { id: 'plastic', label: 'Plastic Containers' },
              { id: 'glass', label: 'Glass' },
              { id: 'metal', label: 'Metal & Aluminum' },
              { id: 'ewaste', label: 'Electronic Waste' },
              { id: 'textiles', label: 'Textiles & Clothing' }
            ].map((item) => (
              <div 
                key={item.id}
                className={`px-3 py-2 border rounded-lg cursor-pointer transition-colors
                  ${recyclingHabits.includes(item.id)
                    ? 'border-primary-500 bg-primary-50 text-primary-500'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                onClick={() => handleRecyclingToggle(item.id)}
              >
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Waste Reduction Efforts */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Waste Reduction Efforts
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input id="reusable" type="checkbox" className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded" />
              <label htmlFor="reusable" className="ml-2 text-sm text-gray-700">Use reusable shopping bags</label>
            </div>
            <div className="flex items-center">
              <input id="bulkFood" type="checkbox" className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded" />
              <label htmlFor="bulkFood" className="ml-2 text-sm text-gray-700">Buy food in bulk to reduce packaging</label>
            </div>
            <div className="flex items-center">
              <input id="waterBottle" type="checkbox" className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded" />
              <label htmlFor="waterBottle" className="ml-2 text-sm text-gray-700">Use reusable water bottle</label>
            </div>
            <div className="flex items-center">
              <input id="plasticFree" type="checkbox" className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded" />
              <label htmlFor="plasticFree" className="ml-2 text-sm text-gray-700">Avoid single-use plastics</label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
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
          <Save className="mr-2 h-5 w-5" />
          Submit All Data
        </button>
      </div>
    </form>
  );
};

export default WasteForm;
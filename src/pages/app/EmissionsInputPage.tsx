import React, { useState } from 'react';
import { 
  Car, 
  Plane, 
  Train, 
  Bus, 
  Utensils, 
  Lightbulb, 
  Trash2, 
  ArrowRight, 
  CheckCircle
} from 'lucide-react';
import TransportForm from '../../components/emissions/TransportForm';
import DietForm from '../../components/emissions/DietForm';
import EnergyForm from '../../components/emissions/EnergyForm';
import WasteForm from '../../components/emissions/WasteForm';
import SuccessScreen from '../../components/emissions/SuccessScreen';

type CategoryType = 'transport' | 'diet' | 'energy' | 'waste';

const EmissionsInputPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('transport');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const categories = [
    { id: 'transport', label: 'Transportation', icon: <Car className="h-5 w-5" /> },
    { id: 'diet', label: 'Diet', icon: <Utensils className="h-5 w-5" /> },
    { id: 'energy', label: 'Energy', icon: <Lightbulb className="h-5 w-5" /> },
    { id: 'waste', label: 'Waste', icon: <Trash2 className="h-5 w-5" /> },
  ];
  
  const handleSubmit = () => {
    // In a real application, this would send data to the backend
    setIsSubmitted(true);
    
    // After submission, we'd usually reset the form or navigate elsewhere
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };
  
  const renderForm = () => {
    switch (activeCategory) {
      case 'transport':
        return <TransportForm onNext={() => setActiveCategory('diet')} />;
      case 'diet':
        return <DietForm onNext={() => setActiveCategory('energy')} onBack={() => setActiveCategory('transport')} />;
      case 'energy':
        return <EnergyForm onNext={() => setActiveCategory('waste')} onBack={() => setActiveCategory('diet')} />;
      case 'waste':
        return <WasteForm onSubmit={handleSubmit} onBack={() => setActiveCategory('energy')} />;
      default:
        return null;
    }
  };
  
  if (isSubmitted) {
    return <SuccessScreen />;
  }
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Track Your Emissions</h1>
        <p className="text-gray-600 mt-1">Log your activities to calculate your carbon footprint.</p>
      </div>
      
      {/* Category Navigation */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap justify-between">
          {categories.map((category, index) => {
            const isActive = category.id === activeCategory;
            const isPast = categories.findIndex(c => c.id === activeCategory) > index;
            
            return (
              <React.Fragment key={category.id}>
                <div 
                  className={`flex flex-col items-center ${index < categories.length - 1 ? 'w-1/4' : ''}`}
                  onClick={() => setActiveCategory(category.id as CategoryType)}
                >
                  <div 
                    className={`rounded-full h-10 w-10 flex items-center justify-center cursor-pointer
                      ${isActive ? 'bg-primary-500 text-white' : 
                        isPast ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {isPast ? <CheckCircle className="h-5 w-5" /> : category.icon}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${isActive ? 'text-primary-500' : 
                    isPast ? 'text-green-600' : 'text-gray-500'}`}>
                    {category.label}
                  </span>
                </div>
                
                {index < categories.length - 1 && (
                  <div className="hidden md:flex items-center">
                    <ArrowRight className="h-4 w-4 text-gray-300" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      {/* Active Form */}
      <div className="card p-6 animate-slide-up">
        {renderForm()}
      </div>
    </div>
  );
};

export default EmissionsInputPage;
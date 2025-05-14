import React, { useState } from 'react';
import { Car, Plane, Train, Bus, ArrowRight } from 'lucide-react';

type TransportMode = 'car' | 'plane' | 'train' | 'bus';
type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';

const TransportForm: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [transportMode, setTransportMode] = useState<TransportMode>('car');
  const [distance, setDistance] = useState('');
  const [fuelType, setFuelType] = useState<FuelType>('petrol');
  const [model, setModel] = useState('');
  
  const transportModes = [
    { id: 'car', label: 'Car', icon: <Car className="h-5 w-5" /> },
    { id: 'plane', label: 'Plane', icon: <Plane className="h-5 w-5" /> },
    { id: 'train', label: 'Train', icon: <Train className="h-5 w-5" /> },
    { id: 'bus', label: 'Bus', icon: <Bus className="h-5 w-5" /> },
  ];
  
  const fuelTypes = [
    { id: 'petrol', label: 'Petrol' },
    { id: 'diesel', label: 'Diesel' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'electric', label: 'Electric' },
  ];
  
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you'd typically validate and save the data
    onNext();
  };
  
  return (
    <form onSubmit={handleNext}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Transportation Details</h3>
      
      {/* Transport Mode Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mode of Transport
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {transportModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={`py-3 px-4 rounded-lg border flex flex-col items-center transition-colors
                ${transportMode === mode.id
                  ? 'border-primary-500 bg-primary-50 text-primary-500'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              onClick={() => setTransportMode(mode.id as TransportMode)}
            >
              <div className={`rounded-full p-2 mb-1 ${
                transportMode === mode.id ? 'bg-primary-100' : 'bg-gray-100'
              }`}>
                {mode.icon}
              </div>
              <span className="text-sm">{mode.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Distance */}
      <div className="mb-4">
        <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">
          Distance (km)
        </label>
        <input
          id="distance"
          type="number"
          min="0"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="input"
          placeholder="Enter distance in kilometers"
          required
        />
      </div>
      
      {/* Vehicle Details */}
      {transportMode === 'car' && (
        <>
          <div className="mb-4">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
              Car Model
            </label>
            <input
              id="model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="input"
              placeholder="e.g., Toyota Prius, Tesla Model 3"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuel Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {fuelTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  className={`py-2 px-3 rounded-lg border text-sm transition-colors
                    ${fuelType === type.id
                      ? 'border-primary-500 bg-primary-50 text-primary-500'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  onClick={() => setFuelType(type.id as FuelType)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      
      {transportMode === 'plane' && (
        <div className="mb-6">
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
            Aircraft Type
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="select"
          >
            <option value="">Select aircraft type</option>
            <option value="domestic">Domestic Flight</option>
            <option value="shortHaul_under3">Short Haul (under 3 hours)</option>
            <option value="longHaul_3plus">Long Haul (3 or more hours)</option>
          </select>
        </div>
      )}
      
      {transportMode === 'train' && (
        <div className="mb-6">
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
            Train Type
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="select"
          >
            <option value="">Select train type</option>
            <option value="local">Local/Regional</option>
            <option value="highSpeed">High-Speed</option>
            <option value="subway">Subway/Metro</option>
          </select>
        </div>
      )}
      
      {transportMode === 'bus' && (
        <div className="mb-6">
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
            Bus Type
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="select"
          >
            <option value="">Select bus type</option>
            <option value="local">Local/City</option>
            <option value="coach">Coach/Long Distance</option>
            <option value="electric">Electric Bus</option>
          </select>
        </div>
      )}
      
      <div className="flex justify-end">
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

export default TransportForm;
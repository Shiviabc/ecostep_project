import React, { useState } from 'react';
import { Lightbulb, Zap, Flame, ArrowRight, ArrowLeft } from 'lucide-react';

const EnergyForm: React.FC<{ onNext: () => void; onBack: () => void }> = ({ onNext, onBack }) => {
  const [electricityUsage, setElectricityUsage] = useState('');
  const [naturalGasUsage, setNaturalGasUsage] = useState('');
  const [propaneUsage, setPropaneUsage] = useState('');
  const [renewablePercent, setRenewablePercent] = useState('0');
  
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you'd typically validate and save the data
    onNext();
  };
  
  return (
    <form onSubmit={handleNext}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Energy Consumption</h3>
      
      <div className="space-y-6">
        {/* Electricity */}
        <div>
          <div className="flex items-center mb-2">
            <Zap className="h-5 w-5 text-warning-500 mr-2" />
            <label htmlFor="electricity" className="block text-sm font-medium text-gray-700">
              Electricity (kWh per month)
            </label>
          </div>
          <input
            id="electricity"
            type="number"
            min="0"
            value={electricityUsage}
            onChange={(e) => setElectricityUsage(e.target.value)}
            className="input"
            placeholder="Average monthly electricity usage"
          />
          
          {electricityUsage !== '' && (
            <div className="mt-3">
              <label htmlFor="renewablePercent" className="block text-sm font-medium text-gray-700 mb-1">
                Percentage from renewable sources
              </label>
              <div className="flex items-center">
                <input
                  id="renewablePercent"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={renewablePercent}
                  onChange={(e) => setRenewablePercent(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-3 w-12 text-sm font-medium text-gray-700">{renewablePercent}%</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Natural Gas */}
        <div>
          <div className="flex items-center mb-2">
            <Flame className="h-5 w-5 text-error-500 mr-2" />
            <label htmlFor="naturalGas" className="block text-sm font-medium text-gray-700">
              Natural Gas (m³ per month)
            </label>
          </div>
          <input
            id="naturalGas"
            type="number"
            min="0"
            value={naturalGasUsage}
            onChange={(e) => setNaturalGasUsage(e.target.value)}
            className="input"
            placeholder="Average monthly natural gas usage"
          />
        </div>
        
        {/* Other Energy Sources */}
        <div>
          <div className="flex items-center mb-2">
            <Lightbulb className="h-5 w-5 text-accent-500 mr-2" />
            <label htmlFor="propane" className="block text-sm font-medium text-gray-700">
              Propane (gallons per month)
            </label>
          </div>
          <input
            id="propane"
            type="number"
            min="0"
            value={propaneUsage}
            onChange={(e) => setPropaneUsage(e.target.value)}
            className="input"
            placeholder="Average monthly propane usage (if applicable)"
          />
        </div>
        
        {/* Energy Saving Measures */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Energy Saving Measures (select all that apply)
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input id="led" type="checkbox" className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded" />
              <label htmlFor="led" className="ml-2 text-sm text-gray-700">LED lighting throughout home</label>
            </div>
            <div className="flex items-center">
              <input id="thermostat" type="checkbox" className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded" />
              <label htmlFor="thermostat" className="ml-2 text-sm text-gray-700">Programmable thermostat</label>
            </div>
            <div className="flex items-center">
              <input id="insulation" type="checkbox" className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded" />
              <label htmlFor="insulation" className="ml-2 text-sm text-gray-700">Well-insulated home</label>
            </div>
            <div className="flex items-center">
              <input id="solarPanels" type="checkbox" className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded" />
              <label htmlFor="solarPanels" className="ml-2 text-sm text-gray-700">Solar panels installed</label>
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
          Next
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default EnergyForm;
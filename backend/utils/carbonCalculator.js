// Carbon calculation factors
const CARBON_FACTORS = {
  transport: {
    car: {
      petrol: 0.192, // kg CO2 per km
      diesel: 0.171,
      electric: 0.053,
      hybrid: 0.111
    },
    train: 0.041,
    bus: 0.105,
    plane: {
      domestic: 0.255,
      shortHaul: 0.156,
      longHaul: 0.151
    }
  },
  diet: {
    vegan: 2.89, // kg CO2 per day
    vegetarian: 3.81,
    pescatarian: 3.91,
    lowMeat: 4.67,
    mediumMeat: 5.63,
    highMeat: 7.19
  },
  energy: {
    electricity: 0.233, // kg CO2 per kWh
    naturalGas: 0.184,
    propane: 0.215
  },
  waste: {
    landfill: 0.627, // kg CO2 per kg waste
    recycled: 0.058,
    composted: 0.026
  }
};

/**
 * Calculate CO2 emissions based on category, subcategory, and value
 * @param {string} category - emission category (transport, diet, energy, waste)
 * @param {string} subcategory - specific type within the category
 * @param {number} value - amount
 * @param {string} unit - unit of measurement
 * @returns {number} - calculated CO2 emissions in kg
 */
export const calculateCO2 = (category, subcategory, value, unit) => {
  let co2Value = 0;
  
  switch (category) {
    case 'transport':
      if (subcategory === 'car') {
        // For cars, we need the fuel type from details
        const fuelType = details?.fuelType || 'petrol';
        co2Value = CARBON_FACTORS.transport.car[fuelType] * value; // value in km
      } else if (subcategory === 'plane') {
        // For planes, we need the flight type from details
        const flightType = details?.flightType || 'domestic';
        co2Value = CARBON_FACTORS.transport.plane[flightType] * value; // value in km
      } else {
        co2Value = CARBON_FACTORS.transport[subcategory] * value; // value in km
      }
      break;
    
    case 'diet':
      co2Value = CARBON_FACTORS.diet[subcategory]; // daily value
      break;
    
    case 'energy':
      co2Value = CARBON_FACTORS.energy[subcategory] * value; // value in kWh or m3
      break;
    
    case 'waste':
      co2Value = CARBON_FACTORS.waste[subcategory] * value; // value in kg
      break;
    
    default:
      co2Value = 0;
  }
  
  return co2Value;
};
// API Configuration
export const API_URL = import.meta.env.PROD ? 'https://api.ecostep.example.com' : 'http://localhost:5000';

// Carbon Footprint Constants
export const CARBON_FACTORS = {
  // Transportation (kg CO2 per km)
  transportation: {
    car: {
      petrol: 0.192,
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
  
  // Diet (kg CO2 per day)
  diet: {
    vegan: 2.89,
    vegetarian: 3.81,
    pescatarian: 3.91,
    lowMeat: 4.67,
    mediumMeat: 5.63,
    highMeat: 7.19
  },
  
  // Energy (kg CO2 per kWh)
  energy: {
    electricity: 0.233,
    naturalGas: 0.184,
    propane: 0.215
  },
  
  // Waste (kg CO2 per kg waste)
  waste: {
    landfill: 0.627,
    recycled: 0.058,
    composted: 0.026
  }
};

// Gamification Constants
export const ACHIEVEMENTS = [
  {
    id: 'first_entry',
    name: 'First Steps',
    description: 'Log your first carbon footprint entry',
    points: 10,
    icon: 'Footprints'
  },
  {
    id: 'week_streak',
    name: 'Consistency Champion',
    description: 'Log entries for 7 consecutive days',
    points: 50,
    icon: 'Calendar'
  },
  {
    id: 'reduce_10',
    name: 'Carbon Cutter',
    description: 'Reduce your carbon footprint by 10%',
    points: 100,
    icon: 'TrendingDown'
  },
  {
    id: 'transport_master',
    name: 'Transport Master',
    description: 'Log 10 low-emission transportation choices',
    points: 75,
    icon: 'Bike'
  },
  {
    id: 'diet_guru',
    name: 'Plant-Based Pioneer',
    description: 'Maintain a plant-based diet for 14 days',
    points: 150,
    icon: 'Salad'
  }
];

// Points System
export const POINTS = {
  logEntry: 5,
  lowEmissionTransport: 15,
  plantBasedMeal: 10,
  reduceEnergy: 20,
  recycleWaste: 10
};
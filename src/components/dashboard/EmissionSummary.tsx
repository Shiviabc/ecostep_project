import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const EmissionSummary: React.FC = () => {
  const data = {
    labels: ['Transportation', 'Diet', 'Energy', 'Waste'],
    datasets: [
      {
        data: [35, 25, 30, 10],
        backgroundColor: [
          '#2D6A4F', // Primary
          '#52B788', // Secondary
          '#40916C', // Accent
          '#74C69D'  // Lighter green
        ],
        borderColor: [
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff'
        ],
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}% (${Math.round(423 * value / 100)} kg CO₂)`;
          }
        }
      }
    }
  };

  return (
    <div className="relative h-full flex items-center justify-center">
      <Doughnut data={data} options={options} />
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-gray-800">423</span>
        <span className="text-xs text-gray-500">kg CO₂</span>
      </div>
    </div>
  );
};

export default EmissionSummary;
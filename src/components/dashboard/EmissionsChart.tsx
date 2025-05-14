import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample data
const labels = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
});

const EmissionsChart: React.FC = () => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Your Emissions',
        data: [
          18, 22, 19, 23, 25, 17, 15,
          20, 22, 18, 16, 14, 12, 10,
          15, 13, 11, 14, 16, 18, 15,
          12, 10, 14, 16, 13, 11, 9,
          12, 10
        ],
        borderColor: '#2D6A4F',
        backgroundColor: 'rgba(45, 106, 79, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Average User',
        data: [
          22, 24, 23, 25, 26, 24, 25,
          23, 24, 25, 23, 22, 21, 20,
          21, 22, 20, 21, 22, 23, 21,
          20, 19, 20, 21, 20, 19, 18,
          19, 20
        ],
        borderColor: '#9CA3AF',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y} kg CO₂`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: 'kg CO₂',
          font: {
            size: 12,
          },
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 7,
        },
      },
    },
    elements: {
      point: {
        radius: 2,
        hoverRadius: 4,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default EmissionsChart;
import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { CategoryStats, EXPENSE_CATEGORIES } from '@/types';
import { formatCurrency } from '@/lib/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryPieChartProps {
  data: CategoryStats[];
}

const COLORS = [
  '#EF4444', // red-500
  '#F87171', // red-400
  '#FCA5A5', // red-300
  '#DC2626', // red-600
  '#B91C1C', // red-700
  '#991B1B', // red-800
  '#FEE2E2', // red-100
  '#FEF2F2', // red-50
];

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  const { chartData, totalExpense } = useMemo(() => {
    // Filter to show only expense categories
    const expenseData = data.filter(item => EXPENSE_CATEGORIES.includes(item.category as any));
    const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);

    return {
      chartData: {
        labels: expenseData.map(item => item.category),
        datasets: [
          {
            data: expenseData.map(item => item.amount),
            backgroundColor: COLORS,
            borderColor: '#ffffff',
            borderWidth: 3,
            hoverBorderWidth: 4,
            hoverBorderColor: '#ffffff',
            hoverOffset: 4,
          },
        ],
      },
      totalExpense,
    };
  }, [data]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 'normal' as const,
          },
          generateLabels: (chart: any) => {
            const chartData = chart.data;
            if (chartData.labels.length && chartData.datasets.length) {
              return chartData.labels.map((label: string, i: number) => {
                const dataset = chartData.datasets[0];
                const value = dataset.data[i];
                const total = dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: COLORS[i % COLORS.length],
                  strokeStyle: dataset.borderColor,
                  lineWidth: dataset.borderWidth,
                  pointStyle: 'circle' as const,
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1F2937',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = formatCurrency(context.parsed);
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            
            return [
              `${label}`,
              `Amount: ${value}`,
              `Percentage: ${percentage}%`,
            ];
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: false,
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    },
    cutout: '60%',
    spacing: 2,
  }), [data]);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-80">
        <p className="text-gray-500 text-center">No category data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-80 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(totalExpense)}
          </div>
          <div className="text-sm text-gray-500">Total Expense</div>
        </div>
      </div>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CategoryStats } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface CategoryPieChartProps {
  data: CategoryStats[];
}

const COLORS = [
  '#3B82F6', // blue-500
  '#60A5FA', // blue-400
  '#93C5FD', // blue-300
  '#DBEAFE', // blue-100
  '#EFF6FF', // blue-50
  '#1E40AF', // blue-800
  '#1D4ED8', // blue-700
  '#2563EB', // blue-600
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{data.category}</p>
        <p className="text-sm text-gray-600">{formatCurrency(data.amount)}</p>
        <p className="text-sm text-blue-600 font-medium">{data.percentage.toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  if (percentage < 5) return null; // Don't show label for small slices

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${percentage.toFixed(0)}%`}
    </text>
  );
};

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  const chartData = data.map(item => ({
    ...item,
    name: item.category,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="amount"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value: string) => <span className="text-sm text-gray-700">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

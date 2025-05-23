
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DataVisualizationProps {
  data: {
    type: 'bar' | 'pie' | 'text';
    title: string;
    description: string;
    chartData?: any[];
    textContent?: string;
  };
}

const COLORS = ['#8338EC', '#3A86FF', '#FF006E', '#FB5607', '#FFBE0B'];

const DataVisualization: React.FC<DataVisualizationProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-web3-bg-dark rounded-lg p-4 border border-gray-800">
      <h3 className="font-bold text-white mb-2">{data.title}</h3>
      <p className="text-web3-text-secondary text-sm mb-4">{data.description}</p>

      {data.type === 'bar' && data.chartData && (
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.chartData}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                axisLine={{ stroke: '#374151' }}
              />
              <YAxis 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                axisLine={{ stroke: '#374151' }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#E5E7EB' }}
                itemStyle={{ color: '#E5E7EB' }}
                labelStyle={{ color: '#E5E7EB' }}
              />
              <Bar dataKey="value" fill="#8338EC" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {data.type === 'pie' && data.chartData && (
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#E5E7EB' }}
                itemStyle={{ color: '#E5E7EB' }}
                labelStyle={{ color: '#E5E7EB' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {data.type === 'text' && data.textContent && (
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-md text-white whitespace-pre-wrap">
          {data.textContent}
        </div>
      )}
    </div>
  );
};

export default DataVisualization;

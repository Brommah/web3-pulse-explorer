
import React, { useState } from 'react';
import TimeframeSelector from './TimeframeSelector';
import TopicCard from './TopicCard';
import { TimeFrame, getTopicsByTimeFrame } from '@/utils/mockData';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const TrendingTopics: React.FC = () => {
  const [activeTimeframe, setActiveTimeframe] = useState<TimeFrame>('24h');
  
  const topics = getTopicsByTimeFrame(activeTimeframe);

  // Data for the chart
  const chartData = topics.map((topic, index) => ({
    name: topic.title.substring(0, 10) + '...',
    value: topic.mentions,
    sentiment: topic.sentiment,
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trending Topics</h2>
        <TimeframeSelector 
          activeTimeframe={activeTimeframe} 
          onTimeframeChange={setActiveTimeframe} 
        />
      </div>

      <div className="bg-web3-card-bg p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-4">Topic Engagement Overview</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#8E9196', fontSize: 10 }}
                axisLine={{ stroke: '#333' }}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#242A38', 
                  borderColor: '#333',
                  color: '#fff'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#9b87f5" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topics.map(topic => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;

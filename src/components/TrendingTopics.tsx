import React, { useState } from 'react';
import TimeframeSelector from './TimeframeSelector';
import TopicCard from './TopicCard';
import { TimeFrame, getTopicsByTimeFrame } from '@/utils/mockData';
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';

// Updated color palette to match design
const TOPIC_COLORS = [
  '#9b87f5', // Purple - Ethereum Layer 2
  '#33C3F0', // Sky Blue - DeFi Lending
  '#70D6BF', // Green - NFT Market
  '#FEC6A1', // Soft Orange - Zero Knowledge
  '#D946EF', // Magenta Pink - Other
];

// Simple, clean tooltip that matches the design
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  
  return (
    <div className="bg-web3-card-bg p-2 border border-gray-700 rounded-md shadow-lg">
      <p className="font-medium text-sm">{data.fullTitle}</p>
      <div className="mt-1 space-y-0.5 text-xs">
        <p className="flex justify-between">
          <span className="text-web3-text-secondary mr-4">Mentions:</span>
          <span className="font-medium">{data.value}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-web3-text-secondary mr-4">Change:</span>
          <span className={data.trend > 0 ? 'text-web3-success' : 'text-web3-error'}>
            {data.trend > 0 ? '+' : ''}{data.trend}%
          </span>
        </p>
      </div>
    </div>
  );
};

const TrendingTopics: React.FC = () => {
  const [activeTimeframe, setActiveTimeframe] = useState<TimeFrame>('24h');
  const [visibleTopics, setVisibleTopics] = useState<string[]>([]);
  const { toast } = useToast();
  
  const topics = getTopicsByTimeFrame(activeTimeframe);

  // Initialize visible topics if empty
  React.useEffect(() => {
    if (visibleTopics.length === 0 && topics.length > 0) {
      setVisibleTopics(topics.map(topic => topic.id));
    }
  }, [topics, visibleTopics]);

  // Enhanced data for the chart with full titles and trends
  const chartData = topics
    .map((topic, index) => ({
      name: topic.title.substring(0, 10) + '...',
      fullTitle: topic.title,
      value: topic.mentions,
      sentiment: topic.sentiment,
      trend: topic.trend,
      id: topic.id,
      color: TOPIC_COLORS[index % TOPIC_COLORS.length]
    }))
    .sort((a, b) => b.value - a.value);

  // Generate time-based data points for each topic
  const generateTimeData = () => {
    // Get number of time points based on timeframe
    const numTimePoints = activeTimeframe === '24h' ? 5 : 
                          activeTimeframe === 'week' ? 7 : 4;
    
    // Time labels based on timeframe
    const timeLabels = Array.from({ length: numTimePoints }).map((_, i) => {
      if (activeTimeframe === '24h') return `${i * 4}h`;
      if (activeTimeframe === 'week') return `Day ${i + 1}`;
      return `Week ${i + 1}`;
    });
    
    // Generate time series data for each topic
    return timeLabels.map((time, i) => {
      const timePoint: any = { time };
      
      // Add each topic's data to this time point
      chartData.forEach(topic => {
        // Calculate a realistic value for this time point
        // Base it on the topic's mentions with some random variation
        const baseValue = topic.value * (0.7 + (i / (numTimePoints - 1)) * 0.6);
        const randomFactor = 0.9 + Math.random() * 0.2;
        const value = Math.round(baseValue * randomFactor);
        
        timePoint[topic.id] = value;
        timePoint[`${topic.id}_name`] = topic.fullTitle;
        timePoint[`${topic.id}_color`] = topic.color;
      });
      
      return timePoint;
    });
  };

  const timeSeriesData = generateTimeData();
  
  const toggleTopic = (topicId: string) => {
    setVisibleTopics(prev => {
      // If topic is currently visible, hide it unless it's the last one visible
      if (prev.includes(topicId)) {
        if (prev.length > 1) {
          return prev.filter(id => id !== topicId);
        } else {
          toast({
            title: "Cannot hide all topics",
            description: "At least one topic must remain visible",
            variant: "destructive",
          });
          return prev;
        }
      }
      // Otherwise show it
      return [...prev, topicId];
    });
  };

  // Format X-axis labels based on timeframe
  const formatXAxisTick = (value: string) => value;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trending Topics</h2>
        <TimeframeSelector 
          activeTimeframe={activeTimeframe} 
          onTimeframeChange={setActiveTimeframe} 
        />
      </div>

      <div className="bg-web3-card-bg rounded-lg">
        <div className="p-4">
          <h3 className="text-lg font-medium mb-3">Topic Engagement Overview</h3>
          
          {/* Topic Legends - Styled as colorful pill buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {chartData.map((topic) => (
              <Badge 
                key={topic.id}
                className={`cursor-pointer px-3 py-1.5 transition-all ${
                  visibleTopics.includes(topic.id) 
                    ? 'opacity-100' 
                    : 'opacity-50'
                }`}
                style={{ 
                  backgroundColor: visibleTopics.includes(topic.id) 
                    ? topic.color 
                    : 'transparent',
                  borderColor: topic.color,
                  color: visibleTopics.includes(topic.id) 
                    ? 'white' 
                    : topic.color 
                }}
                onClick={() => toggleTopic(topic.id)}
              >
                {topic.fullTitle}
              </Badge>
            ))}
          </div>
        </div>

        <div className="h-[250px] pb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeSeriesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#8E9196', fontSize: 10 }}
                axisLine={{ stroke: '#333' }}
                tickLine={false}
                padding={{ left: 10, right: 10 }}
                tickFormatter={formatXAxisTick}
              />
              <YAxis 
                tick={{ fill: '#8E9196', fontSize: 10 }}
                axisLine={{ stroke: '#333' }}
                tickLine={false}
                tickCount={5}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Render a separate line for each topic */}
              {topics
                .filter(topic => visibleTopics.includes(topic.id))
                .map((topic, index) => (
                  <Line
                    key={topic.id}
                    type="monotone"
                    dataKey={topic.id}
                    name={topic.title}
                    stroke={TOPIC_COLORS[index % TOPIC_COLORS.length]}
                    strokeWidth={3}
                    dot={{ 
                      fill: TOPIC_COLORS[index % TOPIC_COLORS.length], 
                      strokeWidth: 0, 
                      r: 4 
                    }}
                    activeDot={{ 
                      r: 6, 
                      stroke: 'white', 
                      strokeWidth: 1 
                    }}
                  />
                ))}
            </LineChart>
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

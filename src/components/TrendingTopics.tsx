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
  Legend,
  CartesianGrid
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from './ui/chart';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';

const TOPIC_COLORS = [
  '#9b87f5', // Primary Purple
  '#33C3F0', // Sky Blue
  '#70D6BF', // Green
  '#FEC6A1', // Soft Orange
  '#D946EF', // Magenta Pink
];

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  
  return (
    <div className="bg-web3-card-bg p-3 border border-gray-700 rounded-md shadow-lg">
      <p className="font-bold text-sm">{data.fullTitle}</p>
      <div className="mt-1 space-y-1 text-xs">
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
        <p className="flex justify-between">
          <span className="text-web3-text-secondary mr-4">Sentiment:</span>
          <span className={data.sentiment > 0.5 ? 'text-web3-success' : data.sentiment < 0 ? 'text-web3-error' : 'text-web3-warning'}>
            {Math.round((data.sentiment + 1) / 2 * 100)}%
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

  const toggleTopic = (topicId: string) => {
    setVisibleTopics(prev => {
      // If topic is currently visible, hide it unless it's the last one visible
      if (prev.includes(topicId)) {
        if (prev.length > 1) {
          const newVisible = prev.filter(id => id !== topicId);
          return newVisible;
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
  const formatXAxisTick = (value: string, index: number) => {
    if (activeTimeframe === '24h') {
      // For 24h, show hours
      return `${index * 4}h`;
    } else if (activeTimeframe === 'week') {
      // For week, show days
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return days[index % 7];
    } else {
      // For month, show week numbers
      return `W${index + 1}`;
    }
  };

  // Filter chart data to only show visible topics
  const visibleChartData = chartData.filter(topic => 
    visibleTopics.includes(topic.id)
  );

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
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-medium">Topic Engagement Overview</h3>
          
          {/* Topic Legends */}
          <div className="flex flex-wrap gap-2 mb-2">
            {chartData.map((topic, index) => (
              <Badge 
                key={topic.id}
                className={`cursor-pointer px-2 py-1 transition-opacity ${
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

        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={visibleChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.4} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#8E9196', fontSize: 10 }}
                axisLine={{ stroke: '#333' }}
                tickLine={false}
                tickFormatter={formatXAxisTick}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                tick={{ fill: '#8E9196', fontSize: 10 }}
                axisLine={{ stroke: '#333' }}
                tickLine={false}
                tickCount={5}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Render a separate line for each topic */}
              {chartData
                .filter(topic => visibleTopics.includes(topic.id))
                .map((topic, index) => (
                  <Line
                    key={topic.id}
                    type="monotone"
                    dataKey="value"
                    data={[topic]}
                    name={topic.fullTitle}
                    stroke={topic.color}
                    strokeWidth={2}
                    dot={{ fill: topic.color, strokeWidth: 1, r: 4 }}
                    activeDot={{ r: 6, stroke: 'white', strokeWidth: 1 }}
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

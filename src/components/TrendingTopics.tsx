
import React, { useState } from 'react';
import TimeframeSelector from './TimeframeSelector';
import TopicCard from './TopicCard';
import { TimeFrame, getTopicsByTimeFrame } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

interface TrendingTopicsProps {
  onTopicClick?: (topicId: string) => void;
  expandedTopicId?: string | null;
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ onTopicClick, expandedTopicId }) => {
  const [activeTimeframe, setActiveTimeframe] = useState<TimeFrame>('24h');
  const { toast } = useToast();
  
  const topics = getTopicsByTimeFrame(activeTimeframe);

  const handleTimeframeChange = (timeframe: TimeFrame) => {
    setActiveTimeframe(timeframe);
    toast({
      title: "Timeframe Updated",
      description: `Showing topics from the past ${timeframe}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-2">
        <TimeframeSelector 
          activeTimeframe={activeTimeframe} 
          onTimeframeChange={handleTimeframeChange} 
        />
      </div>

      <div className="space-y-3">
        {topics.map(topic => (
          <TopicCard 
            key={topic.id}
            topic={topic} 
            onClick={onTopicClick}
            isExpanded={expandedTopicId === topic.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;


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

  const handleTopicClick = (topicId: string) => {
    if (onTopicClick) {
      onTopicClick(topicId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-2">
        <TimeframeSelector 
          activeTimeframe={activeTimeframe} 
          onTimeframeChange={handleTimeframeChange} 
        />
      </div>

      <div className="space-y-4">
        {topics.map((topic, index) => (
          <div 
            key={topic.id} 
            data-topic-id={topic.id}
            className="animate-fade-in" 
            style={{ 
              animationDelay: `${index * 0.05}s`,
              opacity: 0 // Start with opacity 0, animation will change to 1
            }}
          >
            <TopicCard 
              topic={topic} 
              onClick={handleTopicClick}
              isExpanded={expandedTopicId === topic.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;

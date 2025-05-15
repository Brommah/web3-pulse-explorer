
import React, { useState } from 'react';
import TimeframeSelector from './TimeframeSelector';
import TopicCard from './TopicCard';
import { TimeFrame, getTopicsByTimeFrame } from '@/utils/mockData';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';

interface TrendingTopicsProps {
  onTopicClick?: (topicId: string) => void;
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ onTopicClick }) => {
  const [activeTimeframe, setActiveTimeframe] = useState<TimeFrame>('24h');
  const { toast } = useToast();
  
  const topics = getTopicsByTimeFrame(activeTimeframe);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <TimeframeSelector 
          activeTimeframe={activeTimeframe} 
          onTimeframeChange={setActiveTimeframe} 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {topics.map(topic => (
          <TopicCard 
            key={topic.id} 
            topic={topic} 
            onClick={onTopicClick}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;

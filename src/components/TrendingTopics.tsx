
import React, { useState } from 'react';
import TimeframeSelector from './TimeframeSelector';
import TopicCard from './TopicCard';
import TopicDetailPanel from './TopicDetailPanel';
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

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <TimeframeSelector 
          activeTimeframe={activeTimeframe} 
          onTimeframeChange={setActiveTimeframe} 
        />
      </div>

      <div className="space-y-2">
        {topics.map(topic => (
          <div key={topic.id} className="w-full">
            <TopicCard 
              topic={topic} 
              onClick={onTopicClick}
              isExpanded={expandedTopicId === topic.id}
            />
            {expandedTopicId === topic.id && (
              <TopicDetailPanel 
                topicId={topic.id} 
                onUserClick={(userId) => {
                  if (onTopicClick) {
                    // This is a bit of a hack - we're using onTopicClick to handle user clicks
                    // from within the topic detail panel
                    onTopicClick(userId);
                  }
                }} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;

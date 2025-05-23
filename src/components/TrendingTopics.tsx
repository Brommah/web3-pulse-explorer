
import React from 'react';
import TopicCard from './TopicCard';
import { TimeFrame, getTopicsByTimeFrame } from '@/utils/mockData';

interface TrendingTopicsProps {
  onTopicClick?: (topicId: string) => void;
  expandedTopicId?: string | null;
  activeTimeframe: TimeFrame;
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ 
  onTopicClick, 
  expandedTopicId,
  activeTimeframe
}) => {
  const topics = getTopicsByTimeFrame(activeTimeframe);

  const handleTopicClick = (topicId: string) => {
    if (onTopicClick) {
      onTopicClick(topicId);
    }
  };

  return (
    <div className="space-y-4">
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

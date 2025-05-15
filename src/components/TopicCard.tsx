
import React from 'react';
import { Topic } from '@/utils/mockData';
import { TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TopicDetailPanel from './TopicDetailPanel';

interface TopicCardProps {
  topic: Topic;
  onClick?: (topicId: string) => void;
  isExpanded: boolean;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick, isExpanded }) => {
  const isTrendUp = topic.trend > 0;
  
  const handleClick = () => {
    if (onClick) onClick(topic.id);
  };
  
  const handleUserClick = (userId: string) => {
    console.log("User clicked in TopicCard:", userId);
    if (onClick) {
      // First close this topic card by toggling it off
      onClick(topic.id);
      // Use setTimeout to ensure the topic card toggle is processed first
      setTimeout(() => {
        // Then trigger the user click in the parent component
        const event = new CustomEvent('user-click', { detail: { userId } });
        document.dispatchEvent(event);
      }, 10);
    }
  };
  
  return (
    <Card 
      className={`
        bg-web3-card-bg 
        hover:border-web3-accent-purple 
        transition-all 
        duration-300 
        cursor-pointer 
        w-full
        ${isExpanded ? 'border-web3-accent-purple shadow-lg shadow-web3-accent-purple/10' : 'border-gray-800'}
        ${isTrendUp ? 'hover:shadow-web3-success/5' : 'hover:shadow-web3-error/5'} 
        hover:shadow-lg
      `}
    >
      <CardContent className="p-4" onClick={handleClick}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-white">{topic.title}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {topic.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-opacity-20 text-xs px-2 py-0">
                  {tag}
                </Badge>
              ))}
              {topic.tags.length > 3 && (
                <Badge variant="secondary" className="bg-opacity-20 text-xs px-2 py-0">
                  +{topic.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center px-2 py-1 rounded ${isTrendUp ? 'bg-web3-success bg-opacity-10' : 'bg-web3-error bg-opacity-10'}`}>
              {isTrendUp ? <TrendingUp size={14} className="text-web3-success" /> : <TrendingDown size={14} className="text-web3-error" />}
              <span className={`ml-1 text-xs font-medium ${isTrendUp ? 'text-web3-success' : 'text-web3-error'}`}>{Math.abs(topic.trend)}%</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-web3-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </CardContent>

      {isExpanded && (
        <div className="animate-accordion-down overflow-hidden">
          <TopicDetailPanel 
            topicId={topic.id} 
            skipTitle={true} // Skip displaying the title again in the expanded view
            onUserClick={handleUserClick}
          />
        </div>
      )}
    </Card>
  );
};

export default TopicCard;


import React from 'react';
import { Topic } from '@/utils/mockData';
import { TrendingUp, TrendingDown, ChevronDown, GitBranch } from 'lucide-react';
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

  // Generate topic hierarchy based on the topic title
  const getTopicHierarchy = () => {
    if (topic.title.includes("DeFi")) {
      return "Web3 > DeFi > Lending Protocols";
    } else if (topic.title.includes("NFT")) {
      return "Web3 > NFT > Marketplace Trends";
    } else if (topic.title.includes("DAO")) {
      return "Web3 > Governance > DAO Proposals";
    } else if (topic.title.includes("Layer")) {
      return "Web3 > Infrastructure > Layer 2 Solutions";
    } else {
      return "Web3 > General > Community Discussion";
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
        ${isExpanded ? 'border-web3-accent-purple' : 'border-gray-800'}
      `}
    >
      <CardContent className="p-4" onClick={handleClick}>
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <h3 className="font-bold text-lg text-white">{topic.title}</h3>
            
            {/* Topic hierarchy path - NEW! */}
            <div className="flex items-center mt-1 mb-2">
              <GitBranch size={14} className="text-web3-accent-blue mr-1.5" />
              <p className="text-xs text-web3-text-secondary">
                {getTopicHierarchy().split(" > ").map((part, index, arr) => (
                  <React.Fragment key={index}>
                    <span className={index === arr.length - 1 ? "text-web3-accent-purple" : ""}>
                      {part}
                    </span>
                    {index < arr.length - 1 && <span className="mx-1 text-gray-500">›</span>}
                  </React.Fragment>
                ))}
              </p>
            </div>
            
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
            
            {/* Enhanced summary snippet with mentions and participants */}
            <p className="text-web3-text-secondary text-xs mt-2 line-clamp-2">
              {topic.description || `Discussion about ${topic.title} with ${topic.participants} participants and ${topic.mentions.toLocaleString()} mentions. Current sentiment is ${topic.sentiment > 0.5 ? "positive" : topic.sentiment < 0 ? "negative" : "neutral"}.`}
            </p>
            
            {/* Added activity indicator */}
            <div className="flex items-center mt-2 text-xs text-web3-text-secondary">
              <span className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-web3-accent-green mr-1.5"></span>
                Active now
              </span>
              <span className="mx-2">•</span>
              <span>{topic.participants} participants</span>
              <span className="mx-2">•</span>
              <span>{topic.mentions.toLocaleString()} mentions</span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
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

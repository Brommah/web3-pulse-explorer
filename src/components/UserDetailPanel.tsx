
import React from 'react';
import { getUserById, getConversationsByUserId, TimeFrame } from '@/utils/mockData';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ConversationHistory from './ConversationHistory';
import EngagementMetrics from './EngagementMetrics';
import { format } from 'date-fns';

interface UserDetailPanelProps {
  userId: string;
  onTopicClick?: (topicId: string) => void;
  activeTimeframe: TimeFrame;
}

const UserDetailPanel: React.FC<UserDetailPanelProps> = ({ userId, onTopicClick, activeTimeframe }) => {
  const user = getUserById(userId);
  if (!user) return null;
  
  const conversations = getConversationsByUserId(userId);

  const handleTopicClick = (topicId: string) => {
    console.log("Topic clicked in UserDetailPanel:", topicId);
    if (onTopicClick) {
      onTopicClick(topicId);
    }
  };

  return (
    <div className="bg-web3-bg-dark rounded-md p-6 mt-3 border border-web3-accent-purple/70 shadow-lg shadow-web3-accent-purple/10 animate-fade-in">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-web3-accent-purple to-web3-accent-blue rounded-full blur-sm opacity-70"></div>
          <Avatar className="h-16 w-16 border-2 border-web3-accent-purple relative">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="bg-web3-accent-purple/20">{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-web3-accent-purple to-web3-accent-blue bg-clip-text text-transparent">{user.username}</h2>
          <p className="text-sm text-web3-text-secondary">{user.address}</p>
          <div className="flex items-center mt-2">
            <Badge className="bg-gradient-to-r from-web3-accent-purple to-web3-accent-blue mr-2">Reputation {user.reputation}</Badge>
            <span className="text-xs text-web3-text-secondary">
              Member since {format(user.joinedAt, 'MMM yyyy')}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4 border-l-4 border-web3-accent-purple pl-3">Engagement Metrics</h3>
          <EngagementMetrics 
            user={user} 
            conversations={conversations}
            initialTimeframe={activeTimeframe} 
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4 border-l-4 border-web3-accent-purple pl-3">Conversation History</h3>
          <ConversationHistory 
            conversations={conversations} 
            onTopicClick={handleTopicClick} 
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetailPanel;

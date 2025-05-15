
import React from 'react';
import { getUserById, getConversationsByUserId } from '@/utils/mockData';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ConversationHistory from './ConversationHistory';
import EngagementMetrics from './EngagementMetrics';
import { format } from 'date-fns';

interface UserDetailPanelProps {
  userId: string;
  onTopicClick?: (topicId: string) => void;
}

const UserDetailPanel: React.FC<UserDetailPanelProps> = ({ userId, onTopicClick }) => {
  const user = getUserById(userId);
  if (!user) return null;
  
  const conversations = getConversationsByUserId(userId);

  return (
    <div className="bg-web3-bg-dark rounded-md p-6 mt-3 border border-web3-accent-purple shadow-lg animate-fade-in">
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16 border-2 border-web3-accent-purple">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-sm text-web3-text-secondary">{user.address}</p>
          <div className="flex items-center mt-2">
            <Badge className="bg-web3-accent-purple mr-2">Reputation {user.reputation}</Badge>
            <span className="text-xs text-web3-text-secondary">
              Member since {format(user.joinedAt, 'MMM yyyy')}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4 border-l-4 border-web3-accent-purple pl-3">Engagement Metrics</h3>
          <EngagementMetrics user={user} conversations={conversations} />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4 border-l-4 border-web3-accent-purple pl-3">Conversation History</h3>
          <ConversationHistory 
            conversations={conversations} 
            onTopicClick={onTopicClick} 
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetailPanel;

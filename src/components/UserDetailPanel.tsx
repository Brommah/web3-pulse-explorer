
import React from 'react';
import { getUserById, getConversationsByUserId, User, Conversation } from '@/utils/mockData';
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
    <div className="bg-web3-bg-dark rounded-md p-4 mt-2 border border-gray-800 animate-fade-in">
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-sm text-web3-text-secondary">{user.address}</p>
          <div className="flex items-center mt-1">
            <Badge className="bg-web3-accent-purple mr-2">Reputation {user.reputation}</Badge>
            <span className="text-xs text-web3-text-secondary">
              Member since {format(user.joinedAt, 'MMM yyyy')}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-6">
        <EngagementMetrics user={user} conversations={conversations} />
        <ConversationHistory 
          conversations={conversations} 
          onTopicClick={onTopicClick} 
        />
      </div>
    </div>
  );
};

export default UserDetailPanel;

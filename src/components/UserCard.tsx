
import React from 'react';
import { User } from '@/utils/mockData';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import UserDetailPanel from './UserDetailPanel';
import { TimeFrame } from '@/utils/mockData';

interface UserCardProps {
  user: User;
  onClick?: (userId: string) => void;
  isExpanded: boolean;
  activeTimeframe: TimeFrame;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick, isExpanded, activeTimeframe }) => {
  const handleClick = () => {
    if (onClick) onClick(user.id);
  };
  
  const handleTopicClick = (topicId: string) => {
    console.log("Topic clicked in UserCard:", topicId);
    if (onClick) {
      // First close this user card by toggling it off
      onClick(user.id);
      // Use setTimeout to ensure the user card toggle is processed first
      setTimeout(() => {
        // Then trigger the topic click in the parent component
        const event = new CustomEvent('topic-click', { detail: { topicId } });
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
        ${isExpanded ? 'border-web3-accent-purple' : 'border-gray-800'}
      `}
    >
      <CardContent className="p-4" onClick={handleClick}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-white">{user.username}</h3>
              <p className="text-web3-text-secondary text-xs truncate max-w-[160px]">{user.address}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-web3-accent-purple">Reputation {user.reputation}</Badge>
            <ChevronDown className={`h-4 w-4 text-web3-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </CardContent>

      {isExpanded && (
        <div className="animate-accordion-down overflow-hidden">
          <UserDetailPanel 
            userId={user.id} 
            onTopicClick={handleTopicClick}
            activeTimeframe={activeTimeframe}
          />
        </div>
      )}
    </Card>
  );
};

export default UserCard;


import React from 'react';
import { User } from '@/utils/mockData';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import UserDetailPanel from './UserDetailPanel';

interface UserCardProps {
  user: User;
  onClick: (userId: string) => void;
  isExpanded: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick, isExpanded }) => {
  const handleClick = () => {
    onClick(user.id);
  };

  const handleTopicClick = (topicId: string) => {
    console.log("Topic clicked in UserCard:", topicId);
    // When a topic is clicked inside a user card, we want to navigate to that topic
    // This will close the user card and open the topic card
    onClick(user.id); // First close this user card by toggling it off
    // Use setTimeout to ensure the user card toggle is processed first
    setTimeout(() => {
      // Then trigger the topic click in the parent component
      const event = new CustomEvent('topic-click', { detail: { topicId } });
      document.dispatchEvent(event);
    }, 10);
  };

  // Generate a value statement based on user properties
  const getUserValueStatement = () => {
    const statements = [
      user.contributions > 300 ? `Made ${user.contributions} valuable contributions to the community.` : '',
      user.reputation > 95 ? 'Highly respected member with excellent reputation.' : user.reputation > 90 ? 'Well-respected community contributor.' : '',
      user.topics > 35 ? `Active in ${user.topics} different discussion topics.` : '',
      user.sentiment > 0.8 ? 'Known for positive and constructive feedback.' : '',
      user.topTopics.length > 0 ? `Expert in ${user.topTopics.join(', ')}.` : ''
    ].filter(Boolean);

    return statements.length > 0 
      ? statements.join(' ') 
      : `Active community member since ${user.joinedAt.toLocaleDateString()}.`;
  };

  return (
    <Card 
      className={`
        bg-web3-card-bg 
        hover:border-web3-accent-purple
        transition-all 
        duration-300
        w-full 
        ${isExpanded ? 'border-web3-accent-purple' : 'border-gray-800'}
      `}
    >
      <CardContent className="p-4 cursor-pointer" onClick={handleClick}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-web3-accent-purple">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-white">{user.username}</h3>
              <p className="text-xs text-web3-text-secondary truncate max-w-[200px]">{user.address}</p>
              
              {/* Value summary snippet */}
              <p className="text-xs text-web3-text-secondary mt-1 line-clamp-2">
                {getUserValueStatement()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-web3-accent-purple">
              {user.reputation}
            </Badge>
            <ChevronDown className={`h-4 w-4 text-web3-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </CardContent>

      {isExpanded && (
        <div className="animate-accordion-down overflow-hidden">
          <UserDetailPanel 
            userId={user.id} 
            onTopicClick={handleTopicClick} 
          />
        </div>
      )}
    </Card>
  );
};

export default UserCard;

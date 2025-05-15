
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getTopic, getUsersDiscussingTopic, User, Topic } from '@/utils/mockData';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TopicDetailModalProps {
  topicId: string | null;
  onClose: () => void;
  onUserClick: (userId: string) => void;
}

const TopicDetailModal: React.FC<TopicDetailModalProps> = ({ 
  topicId, 
  onClose,
  onUserClick
}) => {
  if (!topicId) return null;
  
  const topic = getTopic(topicId);
  if (!topic) return null;
  
  const users = getUsersDiscussingTopic(topicId);
  const isTrendUp = topic.trend > 0;
  
  return (
    <Dialog open={!!topicId} onOpenChange={() => onClose()}>
      <DialogContent className="bg-web3-bg-dark text-white border-gray-800 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Topic Details</DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">{topic.title}</h2>
            <div className={`flex items-center ${isTrendUp ? 'text-web3-success' : 'text-web3-error'}`}>
              {isTrendUp ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
              <span className="ml-1 text-base">{Math.abs(topic.trend)}%</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {topic.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-opacity-20">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-web3-card-bg p-3 rounded-md">
              <p className="text-web3-text-secondary text-sm">Mentions</p>
              <p className="text-xl font-bold">{topic.mentions.toLocaleString()}</p>
            </div>
            <div className="bg-web3-card-bg p-3 rounded-md">
              <p className="text-web3-text-secondary text-sm">Participants</p>
              <p className="text-xl font-bold">{topic.participants}</p>
            </div>
            <div className="bg-web3-card-bg p-3 rounded-md">
              <p className="text-web3-text-secondary text-sm">Sentiment</p>
              <p className={`text-xl font-bold ${topic.sentiment > 0.5 ? 'text-web3-success' : topic.sentiment < 0 ? 'text-web3-error' : 'text-web3-warning'}`}>
                {Math.round((topic.sentiment + 1) / 2 * 100)}%
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Key Contributors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {users.map(user => (
                <Card 
                  key={user.id}
                  className="bg-web3-card-bg cursor-pointer hover:border-web3-accent-purple transition-colors"
                  onClick={() => onUserClick(user.id)}
                >
                  <CardContent className="p-3 flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-xs text-web3-text-secondary">{user.address}</p>
                    </div>
                    <Badge className="ml-auto bg-web3-accent-purple">
                      {user.reputation}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicDetailModal;

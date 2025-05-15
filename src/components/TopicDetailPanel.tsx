
import React from 'react';
import { getTopic, getUsersDiscussingTopic } from '@/utils/mockData';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TopicDetailPanelProps {
  topicId: string;
  onUserClick: (userId: string) => void;
}

const TopicDetailPanel: React.FC<TopicDetailPanelProps> = ({ 
  topicId,
  onUserClick
}) => {
  const topic = getTopic(topicId);
  if (!topic) return null;
  
  const users = getUsersDiscussingTopic(topicId);
  const isTrendUp = topic.trend > 0;
  
  // Generate some mock key mentions for the topic
  const keyMentions = [
    { text: "Scalability improvements", sentiment: "positive" },
    { text: "Network congestion", sentiment: "negative" },
    { text: "Developer adoption", sentiment: "positive" },
    { text: "Fee structure", sentiment: "neutral" },
    { text: "Security updates", sentiment: "positive" }
  ];
  
  return (
    <div className="bg-web3-bg-dark rounded-md p-6 mt-3 border border-web3-accent-purple shadow-lg animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{topic.title}</h2>
          <div className="flex flex-wrap gap-1 mt-2">
            {topic.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-web3-accent-purple bg-opacity-20 text-white">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className={`flex items-center px-3 py-1.5 rounded-md ${isTrendUp ? 'bg-web3-success bg-opacity-10' : 'bg-web3-error bg-opacity-10'}`}>
          {isTrendUp ? <TrendingUp size={20} className="text-web3-success" /> : <TrendingDown size={20} className="text-web3-error" />}
          <span className={`ml-1.5 text-base font-bold ${isTrendUp ? 'text-web3-success' : 'text-web3-error'}`}>{Math.abs(topic.trend)}%</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-web3-card-bg p-4 rounded-md shadow-md">
          <p className="text-web3-text-secondary text-sm mb-1">Mentions</p>
          <p className="text-xl font-bold">{topic.mentions.toLocaleString()}</p>
        </div>
        <div className="bg-web3-card-bg p-4 rounded-md shadow-md">
          <p className="text-web3-text-secondary text-sm mb-1">Participants</p>
          <p className="text-xl font-bold">{topic.participants}</p>
        </div>
        <div className="bg-web3-card-bg p-4 rounded-md shadow-md">
          <p className="text-web3-text-secondary text-sm mb-1">Sentiment</p>
          <p className={`text-xl font-bold ${topic.sentiment > 0.5 ? 'text-web3-success' : topic.sentiment < 0 ? 'text-web3-error' : 'text-web3-warning'}`}>
            {Math.round((topic.sentiment + 1) / 2 * 100)}%
          </p>
        </div>
      </div>
      
      {/* Key Mentions Section */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4 border-l-4 border-web3-accent-purple pl-3">Key Mentions</h3>
        <div className="grid grid-cols-1 gap-2.5">
          {keyMentions.map((mention, index) => (
            <div 
              key={index}
              className={`p-3 rounded-md ${
                mention.sentiment === 'positive' ? 'bg-web3-success bg-opacity-10 border border-web3-success border-opacity-30' : 
                mention.sentiment === 'negative' ? 'bg-web3-error bg-opacity-10 border border-web3-error border-opacity-30' : 
                'bg-web3-warning bg-opacity-10 border border-web3-warning border-opacity-30'
              }`}
            >
              <p className="text-sm">{mention.text}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4 border-l-4 border-web3-accent-purple pl-3">Key Contributors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {users.map(user => (
            <Card 
              key={user.id}
              className="bg-web3-card-bg cursor-pointer hover:border-web3-accent-purple transition-colors border border-gray-800"
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
  );
};

export default TopicDetailPanel;

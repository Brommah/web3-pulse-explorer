
import React from 'react';
import { getTopic, getUsersDiscussingTopic, mockConversations, Conversation } from '@/utils/mockData';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { TrendingUp, TrendingDown, MessageSquare, ThumbsUp } from 'lucide-react';

interface TopicDetailPanelProps {
  topicId: string;
  onUserClick: (userId: string) => void;
  skipTitle?: boolean;
}

interface KeyMention {
  text: string;
  sentiment: "positive" | "negative" | "neutral";
  conversations: Conversation[];
}

const TopicDetailPanel: React.FC<TopicDetailPanelProps> = ({ 
  topicId,
  onUserClick,
  skipTitle = false
}) => {
  const topic = getTopic(topicId);
  if (!topic) return null;
  
  const users = getUsersDiscussingTopic(topicId);
  const isTrendUp = topic.trend > 0;
  
  // Generate mock key mentions with their related conversations
  const keyMentions: KeyMention[] = [
    { 
      text: "Scalability improvements", 
      sentiment: "positive",
      conversations: [
        { 
          id: 'km1-1', 
          topicId: topic.id, 
          topicTitle: topic.title, 
          content: "The new scaling solution implemented by Aave has drastically improved transaction throughput.",
          timestamp: new Date(Date.now() - 3600000 * 4),
          reactions: 42,
          replies: 18
        },
        { 
          id: 'km1-2', 
          topicId: topic.id, 
          topicTitle: topic.title, 
          content: "With these recent improvements, we're seeing much lower gas fees on lending activities.",
          timestamp: new Date(Date.now() - 3600000 * 8),
          reactions: 27,
          replies: 9
        }
      ]
    },
    { 
      text: "Network congestion", 
      sentiment: "negative",
      conversations: [
        { 
          id: 'km2-1', 
          topicId: topic.id, 
          topicTitle: topic.title, 
          content: "The network congestion is still an issue during peak trading hours.",
          timestamp: new Date(Date.now() - 3600000 * 12),
          reactions: 31,
          replies: 14
        }
      ]
    },
    { 
      text: "Developer adoption", 
      sentiment: "positive",
      conversations: [
        { 
          id: 'km3-1', 
          topicId: topic.id, 
          topicTitle: topic.title, 
          content: "More developers are building on top of these lending protocols than ever before.",
          timestamp: new Date(Date.now() - 3600000 * 6),
          reactions: 54,
          replies: 23
        },
        { 
          id: 'km3-2', 
          topicId: topic.id, 
          topicTitle: topic.title, 
          content: "The developer tooling has significantly improved over the last quarter.",
          timestamp: new Date(Date.now() - 3600000 * 10),
          reactions: 38,
          replies: 17
        }
      ]
    },
    { 
      text: "Fee structure", 
      sentiment: "neutral",
      conversations: [
        { 
          id: 'km4-1', 
          topicId: topic.id, 
          topicTitle: topic.title, 
          content: "The community is discussing changes to the fee structure for long-term sustainability.",
          timestamp: new Date(Date.now() - 3600000 * 24),
          reactions: 29,
          replies: 32
        }
      ]
    },
    { 
      text: "Security updates", 
      sentiment: "positive",
      conversations: [
        { 
          id: 'km5-1', 
          topicId: topic.id, 
          topicTitle: topic.title, 
          content: "The latest security audit found no critical vulnerabilities.",
          timestamp: new Date(Date.now() - 3600000 * 14),
          reactions: 61,
          replies: 12
        }
      ]
    }
  ];
  
  return (
    <div className="bg-web3-bg-dark rounded-b-md p-6 border-t-0 border border-web3-accent-purple shadow-lg animate-fade-in">
      <div className="flex justify-between items-start">
        {!skipTitle && (
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
        )}
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
      
      {/* Key Mentions Section with Community Posts */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4 border-l-4 border-web3-accent-purple pl-3">Key Mentions</h3>
        <div className="grid grid-cols-1 gap-4">
          {keyMentions.map((mention, index) => (
            <div key={index} className="space-y-3">
              <div 
                className={`p-3 rounded-md ${
                  mention.sentiment === 'positive' ? 'bg-web3-success bg-opacity-10 border border-web3-success border-opacity-30' : 
                  mention.sentiment === 'negative' ? 'bg-web3-error bg-opacity-10 border border-web3-error border-opacity-30' : 
                  'bg-web3-warning bg-opacity-10 border border-web3-warning border-opacity-30'
                }`}
              >
                <p className="text-sm font-medium">{mention.text}</p>
              </div>
              
              {/* Community Posts for this key mention */}
              <div className="pl-4 border-l-2 border-gray-700 ml-2 space-y-2">
                {mention.conversations.map(convo => (
                  <Card key={convo.id} className="bg-web3-card-bg border border-gray-800">
                    <CardContent className="p-3 text-sm">
                      <p className="mb-2">{convo.content}</p>
                      <div className="flex items-center text-xs text-web3-text-secondary mt-2 justify-between">
                        <span>{new Date(convo.timestamp).toLocaleString()}</span>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <ThumbsUp size={12} className="mr-1" />
                            <span>{convo.reactions}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare size={12} className="mr-1" />
                            <span>{convo.replies}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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

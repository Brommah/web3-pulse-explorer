import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getTopic, getUsersDiscussingTopic, User, Topic } from '@/utils/mockData';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface TopicDetailModalProps {
  topicId: string | null;
  onClose: () => void;
  onUserClick: (userId: string) => void;
}

interface KeyMention {
  text: string;
  sentiment: "positive" | "negative" | "neutral";
  user: User;
  content: string;
  timestamp: Date;
}

const TopicDetailModal: React.FC<TopicDetailModalProps> = ({ 
  topicId, 
  onClose,
  onUserClick
}) => {
  const [openMentions, setOpenMentions] = useState<{[key: string]: boolean}>({});
  
  // Toggle a specific mention's open state
  const toggleMention = (mentionText: string) => {
    setOpenMentions(prev => ({
      ...prev,
      [mentionText]: !prev[mentionText]
    }));
  };
  
  if (!topicId) return null;
  
  const topic = getTopic(topicId);
  if (!topic) return null;
  
  const users = getUsersDiscussingTopic(topicId);
  const isTrendUp = topic.trend > 0;

  const handleUserClick = (userId: string) => {
    console.log("User clicked in TopicDetailModal:", userId);
    onUserClick(userId);
    onClose(); // Close the topic modal when navigating to a user
  };
  
  // Updated mock users to include all required User properties
  const mockUsers: User[] = [
    { 
      id: 'u1', 
      username: 'crypto_whale', 
      address: '0x123...789', 
      avatar: '', 
      reputation: 92,
      joinedAt: new Date(2022, 1, 15),
      contributions: 220,
      topics: 35,
      topTopics: ['DeFi', 'Yield', 'Governance'],
      sentiment: 0.75
    },
    { 
      id: 'u2', 
      username: 'defi_expert', 
      address: '0x456...012', 
      avatar: '', 
      reputation: 87,
      joinedAt: new Date(2021, 6, 10),
      contributions: 180,
      topics: 29,
      topTopics: ['Lending', 'Staking', 'Yield'],
      sentiment: 0.82
    },
    { 
      id: 'u3', 
      username: 'nft_collector', 
      address: '0x789...345', 
      avatar: '', 
      reputation: 78,
      joinedAt: new Date(2022, 3, 22),
      contributions: 142,
      topics: 23,
      topTopics: ['NFT', 'Art', 'Collectibles'],
      sentiment: 0.65
    },
    { 
      id: 'u4', 
      username: 'blockchain_dev', 
      address: '0xabc...def', 
      avatar: '', 
      reputation: 95,
      joinedAt: new Date(2020, 9, 5),
      contributions: 276,
      topics: 41,
      topTopics: ['Layer2', 'Development', 'Security'],
      sentiment: 0.91
    },
    { 
      id: 'u5', 
      username: 'token_trader', 
      address: '0xdef...123', 
      avatar: '', 
      reputation: 82,
      joinedAt: new Date(2021, 11, 18),
      contributions: 165,
      topics: 28,
      topTopics: ['Trading', 'Markets', 'Analysis'],
      sentiment: 0.73
    },
  ];
  
  // Generate mock key mentions
  const keyMentions: KeyMention[] = [
    { 
      text: "Scalability improvements", 
      sentiment: "positive",
      user: mockUsers[0],
      content: "The new scaling solution implemented by Aave has drastically improved transaction throughput.",
      timestamp: new Date(Date.now() - 3600000 * 4)
    },
    { 
      text: "Network congestion", 
      sentiment: "negative",
      user: mockUsers[2],
      content: "The network congestion is still an issue during peak trading hours.",
      timestamp: new Date(Date.now() - 3600000 * 12)
    },
    { 
      text: "Developer adoption", 
      sentiment: "positive",
      user: mockUsers[3],
      content: "More developers are building on top of these lending protocols than ever before.",
      timestamp: new Date(Date.now() - 3600000 * 6)
    },
    { 
      text: "Fee structure", 
      sentiment: "neutral",
      user: mockUsers[0],
      content: "The community is discussing changes to the fee structure for long-term sustainability.",
      timestamp: new Date(Date.now() - 3600000 * 24)
    },
    { 
      text: "Security updates", 
      sentiment: "positive",
      user: mockUsers[1],
      content: "The latest security audit found no critical vulnerabilities.",
      timestamp: new Date(Date.now() - 3600000 * 14)
    }
  ];
  
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
          
          {/* Key Mentions Section - Now Collapsible */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Key Mentions</h3>
            <div className="grid grid-cols-1 gap-2">
              {keyMentions.map((mention, index) => (
                <Collapsible 
                  key={index} 
                  open={!!openMentions[mention.text]}
                  className="w-full"
                >
                  <div 
                    className={`p-2 rounded-md flex justify-between items-center cursor-pointer ${
                      mention.sentiment === 'positive' ? 'bg-web3-success bg-opacity-10 border border-web3-success border-opacity-20' : 
                      mention.sentiment === 'negative' ? 'bg-web3-error bg-opacity-10 border border-web3-error border-opacity-20' : 
                      'bg-web3-warning bg-opacity-10 border border-web3-warning border-opacity-20'
                    }`}
                    onClick={() => toggleMention(mention.text)}
                  >
                    <p className="text-sm">{mention.text}</p>
                    <CollapsibleTrigger asChild onClick={(e) => {
                      e.stopPropagation(); // Prevent the parent div's onClick from firing
                      toggleMention(mention.text);
                    }}>
                      <button className="focus:outline-none">
                        {openMentions[mention.text] ? 
                          <ChevronUp className="h-4 w-4 text-web3-text-secondary" /> : 
                          <ChevronDown className="h-4 w-4 text-web3-text-secondary" />
                        }
                      </button>
                    </CollapsibleTrigger>
                  </div>
                  
                  <CollapsibleContent>
                    <div className="pl-4 border-l-2 border-gray-700 ml-2 mt-2">
                      <Card className="bg-web3-card-bg border border-gray-800">
                        <CardContent className="p-3">
                          <div className="flex items-start mb-2">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={mention.user.avatar} alt={mention.user.username} />
                              <AvatarFallback className="text-xs">{mention.user.username[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-web3-accent-purple">{mention.user.username}</p>
                              <p className="text-xs text-web3-text-secondary">{mention.user.address}</p>
                            </div>
                          </div>
                          <blockquote className="text-sm border-l-2 border-gray-600 pl-3 italic">
                            {mention.content}
                          </blockquote>
                          <div className="text-xs text-web3-text-secondary mt-2">
                            {mention.timestamp.toLocaleString()}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Key Contributors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {users.map(user => (
                <Card 
                  key={user.id}
                  className="bg-web3-card-bg cursor-pointer hover:border-web3-accent-purple transition-colors"
                  onClick={() => handleUserClick(user.id)}
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

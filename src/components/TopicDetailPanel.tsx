import React, { useState } from 'react';
import { getTopic, getUsersDiscussingTopic, mockConversations, Conversation, User } from '@/utils/mockData';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp, Smile, Frown, Meh, GitBranch } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface TopicDetailPanelProps {
  topicId: string;
  onUserClick: (userId: string) => void;
  skipTitle?: boolean;
}

interface KeyMention {
  text: string;
  sentiment: "positive" | "negative" | "neutral";
  conversations: Array<Conversation & { user: User }>;
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
  
  // Mock topic hierarchy data to represent the topic tree structure
  // In a real application, this would come from the Conversation Intelligence Service
  const topicHierarchy = {
    path: topic.title.includes("DeFi") ? 
      "Web3 > DeFi > Lending Protocols" : 
      topic.title.includes("NFT") ? 
        "Web3 > NFT > Marketplace Trends" : 
        "Web3 > General > Community Discussion"
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
  
  // Track open/closed state for each key mention
  const [openMentions, setOpenMentions] = useState<{[key: string]: boolean}>({});
  
  // Toggle a specific mention's open state
  const toggleMention = (mentionText: string) => {
    setOpenMentions(prev => ({
      ...prev,
      [mentionText]: !prev[mentionText]
    }));
  };

  const handleUserClick = (userId: string) => {
    console.log("User clicked in TopicDetailPanel:", userId);
    if (onUserClick) {
      onUserClick(userId);
    }
  };
  
  // Generate mock key mentions with users and conversations
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
          replies: 18,
          user: mockUsers[0]
        },
        { 
          id: 'km1-2', 
          topicId: topic.id, 
          topicTitle: topic.title, 
          content: "With these recent improvements, we're seeing much lower gas fees on lending activities.",
          timestamp: new Date(Date.now() - 3600000 * 8),
          reactions: 27,
          replies: 9,
          user: mockUsers[1]
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
          replies: 14,
          user: mockUsers[2]
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
          replies: 23,
          user: mockUsers[3]
        },
        { 
          id: 'km3-2', 
          topicId: topic.id, 
          topicTitle: topic.title, 
          content: "The developer tooling has significantly improved over the last quarter.",
          timestamp: new Date(Date.now() - 3600000 * 10),
          reactions: 38,
          replies: 17,
          user: mockUsers[4]
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
          replies: 32,
          user: mockUsers[0]
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
          replies: 12,
          user: mockUsers[1]
        }
      ]
    }
  ];
  
  // Helper function to get sentiment data
  const getSentimentData = (sentiment: "positive" | "negative" | "neutral") => {
    switch(sentiment) {
      case 'positive':
        return {
          icon: <Smile className="h-5 w-5" />,
          bgColor: 'bg-web3-success',
          borderColor: 'border-web3-success',
          textColor: 'text-web3-success',
          tooltip: 'Positive sentiment'
        };
      case 'negative':
        return {
          icon: <Frown className="h-5 w-5" />,
          bgColor: 'bg-web3-error',
          borderColor: 'border-web3-error',
          textColor: 'text-web3-error',
          tooltip: 'Negative sentiment'
        };
      default:
        return {
          icon: <Meh className="h-5 w-5" />,
          bgColor: 'bg-web3-warning',
          borderColor: 'border-web3-warning',
          textColor: 'text-web3-warning',
          tooltip: 'Neutral sentiment'
        };
    }
  };
  
  return (
    <div className="bg-web3-bg-dark rounded-b-md p-6 border-t-0 border border-web3-accent-purple shadow-lg animate-fade-in">
      {/* Topic header section */}
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
      
      {/* Topic hierarchy path - NEW! */}
      <div className="mt-4 flex items-center">
        <GitBranch size={16} className="text-web3-accent-blue mr-2" />
        <p className="text-sm text-web3-text-secondary">
          {topicHierarchy.path.split(" > ").map((part, index, arr) => (
            <React.Fragment key={index}>
              <span className={index === arr.length - 1 ? "text-web3-accent-purple font-medium" : ""}>
                {part}
              </span>
              {index < arr.length - 1 && <span className="mx-1">›</span>}
            </React.Fragment>
          ))}
        </p>
      </div>
      
      {/* Topic metrics */}
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
      
      {/* Key Mentions Section with Improved Sentiment Indicators */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4 border-l-4 border-web3-accent-purple pl-3">Key Mentions</h3>
        <div className="grid grid-cols-1 gap-4">
          {keyMentions.map((mention, index) => {
            const sentimentData = getSentimentData(mention.sentiment);
            
            return (
              <Collapsible 
                key={index} 
                open={!!openMentions[mention.text]}
                className="space-y-2"
              >
                <div 
                  className={`rounded-md flex justify-between items-center cursor-pointer border-l-4 ${sentimentData.borderColor} bg-web3-card-bg shadow-sm hover:bg-opacity-80 transition-colors`}
                  onClick={() => toggleMention(mention.text)}
                >
                  {/* Left side with icon and text */}
                  <div className="flex items-center flex-grow py-3 pl-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className={`p-1.5 rounded-full mr-3 ${sentimentData.bgColor} bg-opacity-20`}>
                            <span className={sentimentData.textColor}>
                              {sentimentData.icon}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>{sentimentData.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p className="text-sm font-medium">{mention.text}</p>
                    
                    {/* Conversation count badge */}
                    <Badge className={`ml-3 ${sentimentData.bgColor} bg-opacity-20 ${sentimentData.textColor} border border-opacity-30 ${sentimentData.borderColor}`}>
                      {mention.conversations.length} {mention.conversations.length === 1 ? 'post' : 'posts'}
                    </Badge>
                  </div>
                  
                  {/* Expand/collapse button */}
                  <CollapsibleTrigger asChild onClick={(e) => {
                    e.stopPropagation();
                    toggleMention(mention.text);
                  }}>
                    <button className="pr-3 focus:outline-none">
                      {openMentions[mention.text] ? 
                        <ChevronUp className="h-4 w-4 text-web3-text-secondary" /> : 
                        <ChevronDown className="h-4 w-4 text-web3-text-secondary" />
                      }
                    </button>
                  </CollapsibleTrigger>
                </div>
                
                {/* Community Posts for this key mention */}
                <CollapsibleContent>
                  <div className="pl-4 border-l-2 border-gray-700 ml-2 space-y-2 mt-2">
                    {mention.conversations.map(convo => (
                      <Card key={convo.id} className="bg-web3-card-bg border border-gray-800">
                        <CardContent className="p-3">
                          <div className="flex items-start mb-2">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={convo.user.avatar} alt={convo.user.username} />
                              <AvatarFallback className="text-xs">{convo.user.username[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <p className="text-sm font-medium text-web3-accent-purple">{convo.user.username}</p>
                              <p className="text-xs text-web3-text-secondary">{convo.user.address}</p>
                            </div>
                          </div>
                          <blockquote className="text-sm border-l-2 border-gray-600 pl-3 italic">
                            {convo.content}
                          </blockquote>
                          <div className="text-xs text-web3-text-secondary mt-2">
                            {new Date(convo.timestamp).toLocaleString()}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4 border-l-4 border-web3-accent-purple pl-3">Key Contributors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {users.map(user => (
            <Card 
              key={user.id}
              className="bg-web3-card-bg cursor-pointer hover:border-web3-accent-purple transition-colors border border-gray-800"
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
  );
};

export default TopicDetailPanel;

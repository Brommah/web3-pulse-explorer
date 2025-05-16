// Mock data for the Web3 Community Intelligence Dashboard

export type Topic = {
  id: string;
  title: string;
  mentions: number;
  sentiment: number; // Range from -1 to 1
  trend: number; // Percentage change
  participants: number;
  timestamp: Date;
  tags: string[];
  description?: string; // Added description field
};

export type TimeFrame = '24h' | 'week' | 'month';

export type User = {
  id: string;
  username: string;
  address: string; // Ethereum address
  avatar: string;
  joinedAt: Date;
  reputation: number;
  contributions: number;
  topics: number;
  topTopics: string[];
  sentiment: number;
};

export type Conversation = {
  id: string;
  topicId: string;
  topicTitle: string;
  content: string;
  timestamp: Date;
  reactions: number;
  replies: number;
};

export const mockTopics: Topic[] = [
  {
    id: '1',
    title: 'Ethereum Layer 2 Solutions',
    mentions: 1243,
    sentiment: 0.75,
    trend: 23.5,
    participants: 324,
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    tags: ['Ethereum', 'Scaling', 'Layer2', 'Optimism'],
    description: 'Discussion on scaling solutions for Ethereum including Optimism and Arbitrum. Community focuses on transaction throughput and security considerations.'
  },
  {
    id: '2',
    title: 'DeFi Lending Protocols',
    mentions: 978,
    sentiment: 0.42,
    trend: 8.2,
    participants: 189,
    timestamp: new Date(Date.now() - 3600000 * 6), // 6 hours ago
    tags: ['DeFi', 'Lending', 'Aave', 'Compound'],
    description: 'Analysis of lending protocol performance, interest rates, and new collateral types. Recent focus on cross-chain opportunities.'
  },
  {
    id: '3',
    title: 'NFT Market Recovery',
    mentions: 854,
    sentiment: 0.23,
    trend: -12.8,
    participants: 276,
    timestamp: new Date(Date.now() - 3600000 * 12), // 12 hours ago
    tags: ['NFT', 'Markets', 'Art', 'Collectibles'],
    description: 'Market analysis of NFT collections showing early recovery signs. Discussion on utility vs. art and liquidity challenges.'
  },
  {
    id: '4',
    title: 'Zero Knowledge Proofs',
    mentions: 765,
    sentiment: 0.88,
    trend: 45.3,
    participants: 142,
    timestamp: new Date(Date.now() - 3600000 * 18), // 18 hours ago
    tags: ['ZKP', 'Privacy', 'Scaling', 'Technical'],
    description: 'Technical discussions on recent ZK-proof advancements, particularly zkEVMs and their potential for Ethereum scaling.'
  },
  {
    id: '5',
    title: 'DAO Governance Models',
    mentions: 632,
    sentiment: 0.34,
    trend: 6.7,
    participants: 197,
    timestamp: new Date(Date.now() - 3600000 * 24), // 24 hours ago
    tags: ['DAO', 'Governance', 'Voting', 'Community'],
    description: 'Comparison of governance systems and voting mechanisms. Focus on balancing token-based and reputation-based approaches.'
  },
  {
    id: '6',
    title: 'Solana Ecosystem Growth',
    mentions: 598,
    sentiment: 0.62,
    trend: 18.4,
    participants: 165,
    timestamp: new Date(Date.now() - 3600000 * 30), // 30 hours ago
    tags: ['Solana', 'Ecosystem', 'DApps', 'Performance'],
    description: 'Tracking rapid expansion of Solana ecosystem projects. Discussions about transaction speed and competitive positioning against Ethereum.'
  },
  {
    id: '7',
    title: 'Regulatory Challenges',
    mentions: 542,
    sentiment: -0.45,
    trend: -8.9,
    participants: 231,
    timestamp: new Date(Date.now() - 3600000 * 36), // 36 hours ago
    tags: ['Regulation', 'Compliance', 'Legal', 'Government'],
    description: 'Updates on global regulatory developments affecting crypto. Concerns about compliance requirements and operating restrictions.'
  },
  {
    id: '8',
    title: 'Cross-Chain Interoperability',
    mentions: 489,
    sentiment: 0.58,
    trend: 11.2,
    participants: 124,
    timestamp: new Date(Date.now() - 3600000 * 48), // 48 hours ago
    tags: ['Interoperability', 'Bridge', 'Multi-chain', 'Infrastructure'],
    description: 'Evaluation of bridge technologies and cross-chain messaging protocols. Security concerns and integration opportunities being highlighted.'
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'cryptovisionary',
    address: '0x1234...5678',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cryptovisionary',
    joinedAt: new Date(2022, 1, 15),
    reputation: 98,
    contributions: 327,
    topics: 42,
    topTopics: ['Ethereum', 'DeFi', 'Governance'],
    sentiment: 0.82
  },
  {
    id: '2',
    username: 'defi_expert',
    address: '0xabcd...ef12',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=defi_expert',
    joinedAt: new Date(2021, 8, 3),
    reputation: 91,
    contributions: 256,
    topics: 38,
    topTopics: ['DeFi', 'Lending', 'Yield Farming'],
    sentiment: 0.76
  },
  {
    id: '3',
    username: 'nft_collector',
    address: '0x7890...1234',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nft_collector',
    joinedAt: new Date(2022, 5, 22),
    reputation: 87,
    contributions: 198,
    topics: 27,
    topTopics: ['NFT', 'Art', 'Collectibles'],
    sentiment: 0.68
  },
  {
    id: '4',
    username: 'dao_governor',
    address: '0x2468...1357',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dao_governor',
    joinedAt: new Date(2021, 11, 7),
    reputation: 94,
    contributions: 287,
    topics: 35,
    topTopics: ['DAO', 'Governance', 'Voting'],
    sentiment: 0.79
  },
  {
    id: '5',
    username: 'layer2_dev',
    address: '0x1357...2468',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=layer2_dev',
    joinedAt: new Date(2022, 3, 18),
    reputation: 97,
    contributions: 312,
    topics: 40,
    topTopics: ['Scaling', 'Layer2', 'Optimism'],
    sentiment: 0.85
  }
];

export const mockConversations: Record<string, Conversation[]> = {
  '1': [
    {
      id: '1-1',
      topicId: '1',
      topicTitle: 'Ethereum Layer 2 Solutions',
      content: 'Optimism and Arbitrum are showing promising transaction volumes, but I\'m concerned about their centralization aspects.',
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      reactions: 42,
      replies: 14
    },
    {
      id: '1-2',
      topicId: '4',
      topicTitle: 'Zero Knowledge Proofs',
      content: 'ZK rollups are the future of Ethereum scaling. The recent advances in proof generation speed are remarkable.',
      timestamp: new Date(Date.now() - 3600000 * 12), // 12 hours ago
      reactions: 38,
      replies: 9
    },
    {
      id: '1-3',
      topicId: '5',
      topicTitle: 'DAO Governance Models',
      content: 'We should combine reputation-based and token-based governance for more balanced decision making in DAOs.',
      timestamp: new Date(Date.now() - 3600000 * 24), // 24 hours ago
      reactions: 56,
      replies: 21
    }
  ],
  '2': [
    {
      id: '2-1',
      topicId: '2',
      topicTitle: 'DeFi Lending Protocols',
      content: 'The new lending markets on Aave v3 introduce significant capital efficiency improvements.',
      timestamp: new Date(Date.now() - 3600000 * 4), // 4 hours ago
      reactions: 28,
      replies: 6
    },
    {
      id: '2-2',
      topicId: '2',
      topicTitle: 'DeFi Lending Protocols',
      content: 'Compound\'s governance proposal to add new collateral types could increase TVL by 25% based on my analysis.',
      timestamp: new Date(Date.now() - 3600000 * 18), // 18 hours ago
      reactions: 51,
      replies: 19
    }
  ],
  '3': [
    {
      id: '3-1',
      topicId: '3',
      topicTitle: 'NFT Market Recovery',
      content: 'Blue chip NFT collections are showing signs of recovery, but the average floor price is still down 70% from ATH.',
      timestamp: new Date(Date.now() - 3600000 * 8), // 8 hours ago
      reactions: 34,
      replies: 16
    },
    {
      id: '3-2',
      topicId: '3',
      topicTitle: 'NFT Market Recovery',
      content: 'Utility-focused NFT projects are outperforming pure art collections in this market.',
      timestamp: new Date(Date.now() - 3600000 * 16), // 16 hours ago
      reactions: 27,
      replies: 11
    },
    {
      id: '3-3',
      topicId: '3',
      topicTitle: 'NFT Market Recovery',
      content: 'The integration of NFTs with DeFi lending is opening new liquidity options for collectors.',
      timestamp: new Date(Date.now() - 3600000 * 36), // 36 hours ago
      reactions: 42,
      replies: 23
    }
  ],
  '4': [
    {
      id: '4-1',
      topicId: '4',
      topicTitle: 'Zero Knowledge Proofs',
      content: 'Polygon\'s zkEVM is a game-changer for Ethereum compatibility while maintaining zero-knowledge security properties.',
      timestamp: new Date(Date.now() - 3600000 * 10), // 10 hours ago
      reactions: 63,
      replies: 27
    }
  ],
  '5': [
    {
      id: '5-1',
      topicId: '5',
      topicTitle: 'DAO Governance Models',
      content: 'Quadratic voting solves many problems in DAO governance, but the implementation needs sybil resistance.',
      timestamp: new Date(Date.now() - 3600000 * 7), // 7 hours ago
      reactions: 48,
      replies: 18
    },
    {
      id: '5-2',
      topicId: '7',
      topicTitle: 'Regulatory Challenges',
      content: 'DAOs need to innovate on legal frameworks. The current regulatory uncertainty is holding back institutional participation.',
      timestamp: new Date(Date.now() - 3600000 * 30), // 30 hours ago
      reactions: 53,
      replies: 26
    }
  ]
};

// Map of topics to users discussing them (added for the new feature)
export const mockTopicParticipants: Record<string, string[]> = {
  '1': ['1', '5', '4', '2'],
  '2': ['2', '1', '3'],
  '3': ['3', '5', '2'],
  '4': ['1', '5', '4'],
  '5': ['4', '1'],
  '6': ['2', '5', '3'],
  '7': ['1', '2', '4'],
  '8': ['5', '3', '1'],
};

export const getTopicsByTimeFrame = (timeframe: TimeFrame): Topic[] => {
  const now = Date.now();
  let timeLimit: number;

  switch (timeframe) {
    case '24h':
      timeLimit = now - 24 * 60 * 60 * 1000; // Last 24 hours
      break;
    case 'week':
      timeLimit = now - 7 * 24 * 60 * 60 * 1000; // Last week
      break;
    case 'month':
      timeLimit = now - 30 * 24 * 60 * 60 * 1000; // Last month
      break;
    default:
      timeLimit = now - 24 * 60 * 60 * 1000; // Default to 24h
  }

  return mockTopics.filter(topic => topic.timestamp.getTime() > timeLimit);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getConversationsByUserId = (userId: string): Conversation[] => {
  return mockConversations[userId] || [];
};

// New functions for the topic-user connection
export const getTopic = (id: string): Topic | undefined => {
  return mockTopics.find(topic => topic.id === id);
};

export const getUsersDiscussingTopic = (topicId: string): User[] => {
  const userIds = mockTopicParticipants[topicId] || [];
  return userIds
    .map(userId => mockUsers.find(user => user.id === userId))
    .filter((user): user is User => user !== undefined);
};

export const getTopicsByUserId = (userId: string): Topic[] => {
  // Find all topics this user has participated in
  const topicIds = Object.entries(mockTopicParticipants)
    .filter(([_, userIds]) => userIds.includes(userId))
    .map(([topicId]) => topicId);
  
  return topicIds
    .map(topicId => mockTopics.find(topic => topic.id === topicId))
    .filter((topic): topic is Topic => topic !== undefined);
};

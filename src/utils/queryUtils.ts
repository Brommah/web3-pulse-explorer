
import { mockTopics, mockUsers, mockTopicParticipants } from './mockData';

// This would be connected to a real backend service in a production environment
export const generateQueryResults = async (query: string) => {
  const normalizedQuery = query.toLowerCase();
  
  // Simple keyword-based query processing
  if (normalizedQuery.includes('top topics') || normalizedQuery.includes('trending')) {
    return generateTopTopicsChart();
  }
  
  if (normalizedQuery.includes('user') || normalizedQuery.includes('contributor')) {
    return generateTopContributorsChart();
  }
  
  if (normalizedQuery.includes('sentiment') || normalizedQuery.includes('feeling')) {
    return generateSentimentAnalysis();
  }

  if (normalizedQuery.includes('topic distribution') || normalizedQuery.includes('categories')) {
    return generateTopicDistribution();
  }

  if (normalizedQuery.includes('engagement') || normalizedQuery.includes('activity')) {
    return generateEngagementMetrics();
  }

  // Default response if query can't be categorized
  return {
    type: 'text',
    title: 'Query Analysis',
    description: 'I analyzed your query but need more specific information',
    textContent: `Your query: "${query}"\n\nTry asking about specific aspects like:\n- Top trending topics\n- Most active contributors\n- Sentiment analysis\n- Topic distribution\n- Community engagement metrics`
  };
};

const generateTopTopicsChart = () => {
  // Sort topics by mentions and get top 5
  const topTopics = [...mockTopics]
    .sort((a, b) => b.mentions - a.mentions)
    .slice(0, 5)
    .map(topic => ({
      name: topic.title,
      value: topic.mentions
    }));

  return {
    type: 'bar',
    title: 'Top Trending Topics',
    description: 'The most discussed topics in the community based on mention count',
    chartData: topTopics
  };
};

const generateTopContributorsChart = () => {
  // Create a map to count participation by user
  const userParticipation: Record<string, number> = {};
  
  // Count how many topics each user participates in
  Object.values(mockTopicParticipants).forEach(userIds => {
    userIds.forEach(userId => {
      userParticipation[userId] = (userParticipation[userId] || 0) + 1;
    });
  });
  
  // Convert to array, sort by participation count, and map to chart format
  const contributors = mockUsers
    .map(user => ({
      id: user.id,
      name: user.username,
      value: userParticipation[user.id] || 0
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return {
    type: 'bar',
    title: 'Top Community Contributors',
    description: 'Users with the highest participation across discussion topics',
    chartData: contributors
  };
};

const generateSentimentAnalysis = () => {
  const sentimentData = [
    { name: 'Positive', value: mockTopics.filter(t => t.sentiment > 0.5).length },
    { name: 'Neutral', value: mockTopics.filter(t => t.sentiment >= 0 && t.sentiment <= 0.5).length },
    { name: 'Negative', value: mockTopics.filter(t => t.sentiment < 0).length }
  ];

  return {
    type: 'pie',
    title: 'Topic Sentiment Distribution',
    description: 'Distribution of positive, neutral, and negative sentiment across topics',
    chartData: sentimentData
  };
};

const generateTopicDistribution = () => {
  // Extract main categories from topic hierarchies
  const categories: Record<string, number> = {};
  
  mockTopics.forEach(topic => {
    let category = 'General';
    
    if (topic.title.includes("DeFi")) category = "DeFi";
    else if (topic.title.includes("NFT")) category = "NFT";
    else if (topic.title.includes("DAO")) category = "Governance";
    else if (topic.title.includes("Layer")) category = "Infrastructure";
    
    categories[category] = (categories[category] || 0) + 1;
  });
  
  const distribution = Object.entries(categories).map(([name, value]) => ({ name, value }));
  
  return {
    type: 'pie',
    title: 'Topic Category Distribution',
    description: 'Distribution of discussions across main Web3 categories',
    chartData: distribution
  };
};

const generateEngagementMetrics = () => {
  // Create daily engagement data for the past week
  const today = new Date();
  const dailyData = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    // Generate a random but somewhat realistic value for the demo
    const value = Math.floor(Math.random() * 50) + 50;
    
    dailyData.push({ name: dayName, value });
  }
  
  return {
    type: 'bar',
    title: 'Daily Community Engagement',
    description: 'Message volume and participation trends over the past week',
    chartData: dailyData
  };
};


import { User, Conversation, TimeFrame } from '@/utils/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useState } from 'react';
import TimeframeSelector from './TimeframeSelector';

interface EngagementMetricsProps {
  user: User;
  conversations: Conversation[];
}

const EngagementMetrics: React.FC<EngagementMetricsProps> = ({ user, conversations }) => {
  const [timeframe, setTimeframe] = useState<TimeFrame>('24h');
  
  // Calculate time threshold based on selected timeframe
  const getTimeThreshold = () => {
    const now = new Date();
    switch(timeframe) {
      case '24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case 'week':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case 'month':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
  };

  const timeThreshold = getTimeThreshold();
  
  // Filter conversations based on timeframe
  const filteredConversations = conversations.filter(
    conv => new Date(conv.timestamp) > timeThreshold
  );
  
  // Calculate engagement metrics for the selected timeframe
  const totalReactions = filteredConversations.reduce((sum, conv) => sum + conv.reactions, 0);
  const totalReplies = filteredConversations.reduce((sum, conv) => sum + conv.replies, 0);
  const averageReactions = filteredConversations.length > 0 ? totalReactions / filteredConversations.length : 0;
  const averageReplies = filteredConversations.length > 0 ? totalReplies / filteredConversations.length : 0;
  
  // Get timeframe-specific user stats (simplified calculation for demo)
  const getTimeframeContributions = () => {
    switch(timeframe) {
      case '24h': return Math.round(user.contributions * 0.05); // 5% of total in last 24h
      case 'week': return Math.round(user.contributions * 0.25); // 25% of total in last week
      case 'month': return Math.round(user.contributions * 0.8); // 80% of total in last month
      default: return user.contributions;
    }
  };
  
  const getTimeframeReputation = () => {
    switch(timeframe) {
      case '24h': return Math.round(user.reputation * 0.02); // Gained 2% in last 24h
      case 'week': return Math.round(user.reputation * 0.1); // Gained 10% in last week
      case 'month': return Math.round(user.reputation * 0.3); // Gained 30% in last month
      default: return user.reputation;
    }
  };

  // Prepare data for the pie chart based on filtered conversations
  const topicCounts: Record<string, number> = {};
  filteredConversations.forEach(conv => {
    topicCounts[conv.topicTitle] = (topicCounts[conv.topicTitle] || 0) + 1;
  });
  
  const pieData = Object.entries(topicCounts).map(([name, value]) => ({
    name,
    value
  }));
  
  const COLORS = ['#9b87f5', '#33C3F0', '#70D6BF', '#FEC6A1', '#D946EF'];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Engagement Metrics</h3>
        <TimeframeSelector 
          activeTimeframe={timeframe} 
          onTimeframeChange={setTimeframe}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-web3-card-bg">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-web3-text-secondary mb-2">Topic Distribution</h4>
            <div className="h-[180px] mt-2">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333', color: '#fff' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-web3-text-secondary">
                  No data available for this timeframe
                </div>
              )}
            </div>
            <div className="mt-2">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center text-xs mt-1">
                  <div 
                    className="w-3 h-3 mr-2 rounded-sm" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="truncate max-w-[150px]">{entry.name}</span>
                  <span className="ml-auto">{entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-web3-card-bg">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-web3-text-secondary mb-4">
              {timeframe === '24h' ? '24h Stats' : 
               timeframe === 'week' ? 'Weekly Stats' : 'Monthly Stats'}
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">{timeframe === '24h' ? 'Recent' : timeframe === 'week' ? 'Weekly' : 'Monthly'} Contributions</span>
                <span className="font-bold text-web3-accent-purple">{getTimeframeContributions()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{timeframe === '24h' ? 'Recent' : timeframe === 'week' ? 'Weekly' : 'Monthly'} Reputation Gain</span>
                <span className="font-bold text-web3-accent-purple">+{getTimeframeReputation()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg. Reactions</span>
                <span className="font-bold text-web3-accent-purple">{averageReactions.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg. Replies</span>
                <span className="font-bold text-web3-accent-purple">{averageReplies.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Topics</span>
                <span className="font-bold text-web3-accent-purple">{Object.keys(topicCounts).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EngagementMetrics;

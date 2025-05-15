
import { User, Conversation } from '@/utils/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface EngagementMetricsProps {
  user: User;
  conversations: Conversation[];
}

const EngagementMetrics: React.FC<EngagementMetricsProps> = ({ user, conversations }) => {
  // Calculate engagement metrics
  const totalReactions = conversations.reduce((sum, conv) => sum + conv.reactions, 0);
  const totalReplies = conversations.reduce((sum, conv) => sum + conv.replies, 0);
  const averageReactions = conversations.length > 0 ? totalReactions / conversations.length : 0;
  const averageReplies = conversations.length > 0 ? totalReplies / conversations.length : 0;
  
  // Prepare data for the pie chart
  const topicCounts: Record<string, number> = {};
  conversations.forEach(conv => {
    topicCounts[conv.topicTitle] = (topicCounts[conv.topicTitle] || 0) + 1;
  });
  
  const pieData = Object.entries(topicCounts).map(([name, value]) => ({
    name,
    value
  }));
  
  const COLORS = ['#9b87f5', '#33C3F0', '#70D6BF', '#FEC6A1', '#D946EF'];
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Engagement Metrics</h3>
      
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
                  No data available
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
            <h4 className="text-sm font-medium text-web3-text-secondary mb-4">Engagement Stats</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Contributions</span>
                <span className="font-bold text-web3-accent-purple">{user.contributions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Reputation</span>
                <span className="font-bold text-web3-accent-purple">{user.reputation}</span>
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
                <span className="text-sm">Topics Created</span>
                <span className="font-bold text-web3-accent-purple">{user.topics}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EngagementMetrics;

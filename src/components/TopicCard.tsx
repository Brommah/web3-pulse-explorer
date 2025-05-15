
import { Topic } from '@/utils/mockData';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';

interface TopicCardProps {
  topic: Topic;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const isTrendUp = topic.trend > 0;
  
  return (
    <Card className="bg-web3-card-bg hover:border-web3-accent-purple transition-all duration-300 cursor-pointer">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-white">{topic.title}</h3>
          <div className={`flex items-center ${isTrendUp ? 'text-web3-success' : 'text-web3-error'}`}>
            {isTrendUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="ml-1 text-sm">{Math.abs(topic.trend)}%</span>
          </div>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-web3-text-secondary">
          <Clock size={14} className="mr-1" />
          {formatDistanceToNow(topic.timestamp, { addSuffix: true })}
        </div>

        <div className="mt-3">
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div className="flex flex-col">
              <span className="text-web3-text-secondary">Mentions</span>
              <span className="font-medium text-white">{topic.mentions.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-web3-text-secondary">Participants</span>
              <span className="font-medium text-white">{topic.participants}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {topic.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-opacity-20 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="mt-3">
            <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${topic.sentiment > 0.5 ? 'bg-web3-success' : topic.sentiment < 0 ? 'bg-web3-error' : 'bg-web3-warning'}`}
                style={{ width: `${(topic.sentiment + 1) / 2 * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-web3-text-secondary">Sentiment</span>
              <span className={`font-medium ${topic.sentiment > 0.5 ? 'text-web3-success' : topic.sentiment < 0 ? 'text-web3-error' : 'text-web3-warning'}`}>
                {Math.round((topic.sentiment + 1) / 2 * 100)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicCard;

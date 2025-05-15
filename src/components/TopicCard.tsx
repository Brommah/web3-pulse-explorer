
import { Topic } from '@/utils/mockData';
import { TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';

interface TopicCardProps {
  topic: Topic;
  onClick?: (topicId: string) => void;
  isExpanded: boolean;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick, isExpanded }) => {
  const isTrendUp = topic.trend > 0;
  
  const handleClick = () => {
    if (onClick) onClick(topic.id);
  };
  
  return (
    <Card 
      className="bg-web3-card-bg hover:border-web3-accent-purple transition-all duration-300 cursor-pointer w-full"
      onClick={handleClick}
    >
      <CardContent className="pt-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-white">{topic.title}</h3>
          <div className="flex items-center">
            <div className={`flex items-center mr-2 ${isTrendUp ? 'text-web3-success' : 'text-web3-error'}`}>
              {isTrendUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="ml-1 text-sm">{Math.abs(topic.trend)}%</span>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicCard;

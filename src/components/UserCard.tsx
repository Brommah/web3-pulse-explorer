
import { User } from '@/utils/mockData';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserCardProps {
  user: User;
  onClick: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <Card 
      className="bg-web3-card-bg hover:border-web3-accent-purple transition-all duration-300 cursor-pointer"
      onClick={() => onClick(user.id)}
    >
      <CardContent className="pt-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-white">{user.username}</h3>
            <p className="text-xs text-web3-text-secondary">{user.address}</p>
          </div>
          <Badge className="ml-auto bg-web3-accent-purple">
            {user.reputation}
          </Badge>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col items-center p-1 rounded bg-web3-bg-dark">
            <span className="text-xs text-web3-text-secondary">Topics</span>
            <span className="font-medium">{user.topics}</span>
          </div>
          <div className="flex flex-col items-center p-1 rounded bg-web3-bg-dark">
            <span className="text-xs text-web3-text-secondary">Contrib.</span>
            <span className="font-medium">{user.contributions}</span>
          </div>
          <div className="flex flex-col items-center p-1 rounded bg-web3-bg-dark">
            <span className="text-xs text-web3-text-secondary">Sent.</span>
            <span className={`font-medium ${user.sentiment > 0.7 ? 'text-web3-success' : user.sentiment > 0.4 ? 'text-web3-warning' : 'text-web3-error'}`}>
              {Math.round(user.sentiment * 100)}%
            </span>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-xs text-web3-text-secondary mb-1">Top Topics</p>
          <div className="flex flex-wrap gap-1">
            {user.topTopics.map((topic, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-opacity-10">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;


import { User } from '@/utils/mockData';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";

interface UserCardProps {
  user: User;
  onClick: (userId: string) => void;
  isExpanded: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick, isExpanded }) => {
  return (
    <Card 
      className={`
        bg-web3-card-bg 
        hover:border-web3-accent-purple 
        transition-all 
        duration-300 
        cursor-pointer 
        w-full 
        ${isExpanded ? 'border-web3-accent-purple' : 'border-gray-800'}
      `}
      onClick={() => onClick(user.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-web3-accent-purple">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-white">{user.username}</h3>
              <p className="text-xs text-web3-text-secondary truncate max-w-[200px]">{user.address}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-web3-accent-purple">
              {user.reputation}
            </Badge>
            <ChevronDown className={`h-4 w-4 text-web3-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;

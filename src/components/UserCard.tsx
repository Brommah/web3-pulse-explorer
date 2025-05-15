
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
      className="bg-web3-card-bg hover:border-web3-accent-purple transition-all duration-300 cursor-pointer w-full"
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
          <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;

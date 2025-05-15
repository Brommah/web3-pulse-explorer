
import { getUserById, getConversationsByUserId, User, Conversation } from '@/utils/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ConversationHistory from './ConversationHistory';
import EngagementMetrics from './EngagementMetrics';
import { format } from 'date-fns';

interface UserProfileModalProps {
  userId: string | null;
  onClose: () => void;
  onTopicClick?: (topicId: string) => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ userId, onClose, onTopicClick }) => {
  if (!userId) return null;
  
  const user = getUserById(userId);
  if (!user) return null;
  
  const conversations = getConversationsByUserId(userId);

  const handleTopicClick = (topicId: string) => {
    console.log("Topic clicked in UserProfileModal:", topicId);
    if (onTopicClick) {
      onTopicClick(topicId);
      onClose(); // Close the user modal when navigating to a topic
    }
  };

  return (
    <Dialog open={!!userId} onOpenChange={() => onClose()}>
      <DialogContent className="bg-web3-bg-dark text-white border-gray-800 max-w-3xl">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{user.username}</h2>
              <p className="text-sm text-web3-text-secondary">{user.address}</p>
              <div className="flex items-center mt-1">
                <Badge className="bg-web3-accent-purple mr-2">Reputation {user.reputation}</Badge>
                <span className="text-xs text-web3-text-secondary">
                  Member since {format(user.joinedAt, 'MMM yyyy')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-6">
            <EngagementMetrics user={user} conversations={conversations} />
            <ConversationHistory 
              conversations={conversations} 
              onTopicClick={handleTopicClick} 
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;


import { Conversation } from '@/utils/mockData';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';

interface ConversationHistoryProps {
  conversations: Conversation[];
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({ conversations }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Conversation History</h3>
      
      {conversations.length === 0 ? (
        <p className="text-web3-text-secondary text-sm">No conversations found.</p>
      ) : (
        conversations.map(conversation => (
          <Card key={conversation.id} className="bg-web3-bg-dark border border-gray-800">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-white">{conversation.topicTitle}</h4>
                <span className="text-xs text-web3-text-secondary">
                  {formatDistanceToNow(conversation.timestamp, { addSuffix: true })}
                </span>
              </div>
              
              <p className="mt-2 text-sm text-gray-300">{conversation.content}</p>
              
              <div className="mt-3 flex items-center text-xs text-web3-text-secondary">
                <span className="mr-4">{conversation.reactions} Reactions</span>
                <span>{conversation.replies} Replies</span>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ConversationHistory;

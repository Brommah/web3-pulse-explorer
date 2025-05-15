
import React, { useState } from 'react';
import TrendingTopics from '@/components/TrendingTopics';
import { mockUsers } from '@/utils/mockData';
import UserCard from '@/components/UserCard';
import UserProfileModal from '@/components/UserProfileModal';
import TopicDetailModal from '@/components/TopicDetailModal';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Index: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [topicsOpen, setTopicsOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(true);
  
  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    setSelectedTopicId(null);  // Close topic modal if open
  };
  
  const handleTopicClick = (topicId: string) => {
    setSelectedTopicId(topicId);
    setSelectedUserId(null);  // Close user modal if open
  };
  
  return (
    <div className="min-h-screen bg-web3-bg-dark">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Web3 Community Intelligence</h1>
          <p className="text-web3-text-secondary mt-1">Track community discussions and user engagement</p>
        </header>
        
        <main>
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Trending Topics Column */}
            <Collapsible 
              open={topicsOpen} 
              onOpenChange={setTopicsOpen}
              className="bg-web3-card-bg rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Trending Topics</h2>
                <CollapsibleTrigger className="p-2 hover:bg-web3-bg-dark rounded-full transition-colors">
                  {topicsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent>
                <TrendingTopics onTopicClick={handleTopicClick} />
              </CollapsibleContent>
            </Collapsible>
            
            {/* Top Community Members Column */}
            <Collapsible 
              open={usersOpen} 
              onOpenChange={setUsersOpen}
              className="bg-web3-card-bg rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Top Community Members</h2>
                <CollapsibleTrigger className="p-2 hover:bg-web3-bg-dark rounded-full transition-colors">
                  {usersOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockUsers.map(user => (
                    <UserCard key={user.id} user={user} onClick={handleUserClick} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </main>
        
        <UserProfileModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
          onTopicClick={handleTopicClick}
        />
        
        <TopicDetailModal
          topicId={selectedTopicId}
          onClose={() => setSelectedTopicId(null)}
          onUserClick={handleUserClick}
        />
      </div>
    </div>
  );
};

export default Index;


import React, { useState } from 'react';
import TrendingTopics from '@/components/TrendingTopics';
import { mockUsers, getTopic } from '@/utils/mockData';
import UserCard from '@/components/UserCard';
import TopicDetailModal from '@/components/TopicDetailModal';
import UserProfileModal from '@/components/UserProfileModal';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Index: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [topicsOpen, setTopicsOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(true);
  const { toast } = useToast();
  
  // Updated to handle both direct user clicks and topic-to-user navigation
  const handleUserClick = (userId: string) => {
    console.log("User click handler called with:", userId);
    setSelectedUserId(userId);
    setSelectedTopicId(null);  // Close topic modal if open
    
    toast({
      title: "User Profile",
      description: "Viewing details for this community member",
    });
  };
  
  // Updated to handle both direct topic clicks and user-to-topic navigation
  const handleTopicClick = (topicId: string) => {
    console.log("Topic click handler called with:", topicId);
    setSelectedTopicId(topicId);
    setSelectedUserId(null);  // Close user modal if open
    
    toast({
      title: "Topic Details",
      description: "Viewing information about this topic",
    });
  };
  
  return (
    <div className="min-h-screen bg-web3-bg-dark">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Web3 Community Intelligence</h1>
          <p className="text-web3-text-secondary mt-1">Track community discussions and user engagement</p>
        </header>
        
        <main>
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Trending Topics Column */}
            <Collapsible 
              open={topicsOpen} 
              onOpenChange={setTopicsOpen}
              className="bg-web3-card-bg rounded-lg p-6 shadow-lg border border-gray-800"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold text-white">Trending Topics</h2>
                <CollapsibleTrigger className="p-2 hover:bg-web3-bg-dark rounded-full transition-colors">
                  {topicsOpen ? <ChevronUp className="h-5 w-5 text-web3-text-secondary" /> : <ChevronDown className="h-5 w-5 text-web3-text-secondary" />}
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent>
                <div className="space-y-3">
                  <TrendingTopics 
                    onTopicClick={handleTopicClick}
                    expandedTopicId={selectedTopicId}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            {/* Top Community Members Column */}
            <Collapsible 
              open={usersOpen} 
              onOpenChange={setUsersOpen}
              className="bg-web3-card-bg rounded-lg p-6 shadow-lg border border-gray-800"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold text-white">Top Community Members</h2>
                <CollapsibleTrigger className="p-2 hover:bg-web3-bg-dark rounded-full transition-colors">
                  {usersOpen ? <ChevronUp className="h-5 w-5 text-web3-text-secondary" /> : <ChevronDown className="h-5 w-5 text-web3-text-secondary" />}
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent>
                <div className="space-y-3">
                  {mockUsers.map(user => (
                    <UserCard 
                      key={user.id}
                      user={user} 
                      onClick={handleUserClick} 
                      isExpanded={selectedUserId === user.id} 
                    />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </main>

        {/* Modals for detailed views */}
        <TopicDetailModal 
          topicId={selectedTopicId} 
          onClose={() => setSelectedTopicId(null)}
          onUserClick={handleUserClick} 
        />
        
        <UserProfileModal 
          userId={selectedUserId} 
          onClose={() => setSelectedUserId(null)}
          onTopicClick={handleTopicClick}
        />
      </div>
    </div>
  );
};

export default Index;

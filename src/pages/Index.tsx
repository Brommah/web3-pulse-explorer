
import React, { useState } from 'react';
import TrendingTopics from '@/components/TrendingTopics';
import { mockUsers } from '@/utils/mockData';
import UserCard from '@/components/UserCard';
import UserDetailPanel from '@/components/UserDetailPanel';
import TopicDetailPanel from '@/components/TopicDetailPanel';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Index: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [topicsOpen, setTopicsOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(true);
  const { toast } = useToast();
  
  const handleUserClick = (userId: string) => {
    setSelectedUserId(prevId => prevId === userId ? null : userId);
    setSelectedTopicId(null);  // Close topic if open
    if (selectedUserId !== userId) {
      toast({
        title: "User Profile",
        description: "Viewing details for this community member",
      });
    }
  };
  
  const handleTopicClick = (topicId: string) => {
    setSelectedTopicId(prevId => prevId === topicId ? null : topicId);
    setSelectedUserId(null);  // Close user if open
    if (selectedTopicId !== topicId) {
      toast({
        title: "Topic Details",
        description: "Viewing information about this topic",
      });
    }
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
                  {TrendingTopics({
                    onTopicClick: handleTopicClick,
                    expandedTopicId: selectedTopicId,
                  })}
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
                    <div key={user.id} className="w-full">
                      <UserCard 
                        user={user} 
                        onClick={handleUserClick} 
                        isExpanded={selectedUserId === user.id} 
                      />
                      {selectedUserId === user.id && (
                        <UserDetailPanel 
                          userId={user.id} 
                          onTopicClick={handleTopicClick} 
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

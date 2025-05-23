
import React, { useState, useEffect } from 'react';
import TrendingTopics from '@/components/TrendingTopics';
import { mockUsers, getTopic } from '@/utils/mockData';
import UserCard from '@/components/UserCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Sparkle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Index: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [topicsOpen, setTopicsOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(true);
  const { toast } = useToast();
  
  // Handle user clicks - toggle selection
  const handleUserClick = (userId: string) => {
    console.log("User click handler called with:", userId);
    // Toggle user selection - if already selected, deselect it
    setSelectedUserId(prevId => prevId === userId ? null : userId);
    setUsersOpen(true); // Ensure the users panel is open
    
    toast({
      title: "Viewing User",
      description: "Showing details for this community member",
    });
  };
  
  // Handle topic clicks - toggle selection
  const handleTopicClick = (topicId: string) => {
    console.log("Topic click handler called with:", topicId);
    // Toggle topic selection - if already selected, deselect it
    setSelectedTopicId(prevId => prevId === topicId ? null : topicId);
    setTopicsOpen(true); // Ensure the topics panel is open
    
    toast({
      title: "Viewing Topic",
      description: "Showing information about this topic",
    });
  };

  // Set up event listeners for custom events
  useEffect(() => {
    const handleCustomTopicClick = (event: any) => {
      const { topicId } = event.detail;
      console.log("Received custom topic click event in Index:", topicId);
      setSelectedTopicId(topicId);
      setTopicsOpen(true);
    };

    const handleCustomUserClick = (event: any) => {
      const { userId } = event.detail;
      console.log("Received custom user click event in Index:", userId);
      setSelectedUserId(userId);
      setUsersOpen(true);
    };

    document.addEventListener('topic-click', handleCustomTopicClick);
    document.addEventListener('user-click', handleCustomUserClick);

    return () => {
      document.removeEventListener('topic-click', handleCustomTopicClick);
      document.removeEventListener('user-click', handleCustomUserClick);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-web3-bg-dark">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-web3-card-bg border border-web3-accent-purple/30 mb-3 animated-gradient bg-gradient-to-r from-web3-accent-purple/10 to-web3-accent-blue/10">
            <Sparkle size={16} className="text-web3-accent-purple animate-pulse-soft" />
            <span className="text-sm font-medium">Web3 Intelligence Dashboard</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Community Intelligence</h1>
          <p className="text-web3-text-secondary text-lg max-w-2xl mx-auto">Real-time insights into community discussions, topics, and user engagement</p>
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
                    <div key={user.id} data-user-id={user.id}>
                      <UserCard 
                        user={user} 
                        onClick={handleUserClick} 
                        isExpanded={selectedUserId === user.id} 
                      />
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

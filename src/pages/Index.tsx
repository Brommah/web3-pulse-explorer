
import React, { useState } from 'react';
import TrendingTopics from '@/components/TrendingTopics';
import { mockUsers } from '@/utils/mockData';
import UserCard from '@/components/UserCard';
import UserProfileModal from '@/components/UserProfileModal';

const Index: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
  };
  
  return (
    <div className="min-h-screen bg-web3-bg-dark">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Web3 Community Intelligence</h1>
          <p className="text-web3-text-secondary mt-1">Track community discussions and user engagement</p>
        </header>
        
        <main className="space-y-10">
          <section>
            <TrendingTopics />
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6">Active Community Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockUsers.map(user => (
                <UserCard key={user.id} user={user} onClick={handleUserClick} />
              ))}
            </div>
          </section>
        </main>
        
        <UserProfileModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      </div>
    </div>
  );
};

export default Index;

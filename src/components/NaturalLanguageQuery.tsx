
import React, { useState } from 'react';
import { Search, BarChart3, PieChart, Sparkles } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateQueryResults } from '@/utils/queryUtils';
import DataVisualization from './DataVisualization';

interface NaturalLanguageQueryProps {
  className?: string;
}

const NaturalLanguageQuery: React.FC<NaturalLanguageQueryProps> = ({ className }) => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsProcessing(true);
    try {
      const data = await generateQueryResults(query);
      setResults(data);
      toast({
        title: "Query Processed",
        description: "Check out the visualization of your query results",
      });
    } catch (error) {
      toast({
        title: "Query Error",
        description: "Could not process your query. Please try again.",
        variant: "destructive",
      });
      console.error("Query error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className={`bg-web3-card-bg border-gray-800 ${className}`}>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <Sparkles className="mr-2 h-6 w-6 text-web3-accent-purple" />
          Community Intelligence Query
        </h2>
        <p className="text-web3-text-secondary mb-4">
          Ask questions about your community in natural language and get insights
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-web3-text-secondary" />
            <Input
              type="text"
              placeholder="E.g., What are the top topics in the last week?"
              className="pl-9 bg-web3-bg-dark border-gray-700 text-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isProcessing || !query.trim()} 
            className="bg-web3-accent-purple hover:bg-web3-accent-purple/80"
          >
            {isProcessing ? "Processing..." : "Query"}
          </Button>
        </form>

        {results && (
          <div className="mt-4 animate-fade-in">
            <DataVisualization data={results} />
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="text-xs border-gray-700 text-web3-text-secondary">
            <BarChart3 className="mr-1 h-3 w-3" />
            Topic trends
          </Button>
          <Button variant="outline" size="sm" className="text-xs border-gray-700 text-web3-text-secondary">
            <PieChart className="mr-1 h-3 w-3" />
            User distribution
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NaturalLanguageQuery;


import React from 'react';
import { Button } from "@/components/ui/button";
import { TimeFrame } from '@/utils/mockData';

interface TimeframeSelectorProps {
  activeTimeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  className?: string;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  activeTimeframe,
  onTimeframeChange,
  className = ''
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        variant={activeTimeframe === '24h' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onTimeframeChange('24h')}
        className={`px-8 py-2 ${activeTimeframe === '24h' ? 'bg-web3-accent-purple hover:bg-web3-accent-purple/90' : 'text-white'}`}
      >
        24h
      </Button>
      <Button
        variant={activeTimeframe === 'week' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onTimeframeChange('week')}
        className={`px-8 py-2 ${activeTimeframe === 'week' ? 'bg-web3-accent-purple hover:bg-web3-accent-purple/90' : 'text-white'}`}
      >
        Week
      </Button>
      <Button
        variant={activeTimeframe === 'month' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onTimeframeChange('month')}
        className={`px-8 py-2 ${activeTimeframe === 'month' ? 'bg-web3-accent-purple hover:bg-web3-accent-purple/90' : 'text-white'}`}
      >
        Month
      </Button>
    </div>
  );
};

export default TimeframeSelector;

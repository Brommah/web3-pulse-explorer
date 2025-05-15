
import React from 'react';
import { Button } from "@/components/ui/button";
import { TimeFrame } from '@/utils/mockData';

interface TimeframeSelectorProps {
  activeTimeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  activeTimeframe,
  onTimeframeChange
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={activeTimeframe === '24h' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onTimeframeChange('24h')}
        className={activeTimeframe === '24h' ? 'bg-web3-accent-purple' : ''}
      >
        24h
      </Button>
      <Button
        variant={activeTimeframe === 'week' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onTimeframeChange('week')}
        className={activeTimeframe === 'week' ? 'bg-web3-accent-purple' : ''}
      >
        Week
      </Button>
      <Button
        variant={activeTimeframe === 'month' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onTimeframeChange('month')}
        className={activeTimeframe === 'month' ? 'bg-web3-accent-purple' : ''}
      >
        Month
      </Button>
    </div>
  );
};

export default TimeframeSelector;

import React from 'react';

interface TrackProgressProps {
  progress: number;
  currentTime: string;
  duration: string;
}

export function TrackProgress({ progress, currentTime, duration }: TrackProgressProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span>{currentTime}</span>
      <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span>{duration}</span>
    </div>
  );
}
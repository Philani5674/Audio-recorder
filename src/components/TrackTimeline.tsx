import React from 'react';
import { TIMELINE_PIXELS_PER_SECOND } from '../constants/audio';

interface TrackTimelineProps {
  duration: number;
  currentTime: number;
  isRecording: boolean;
}

export function TrackTimeline({ duration, currentTime, isRecording }: TrackTimelineProps) {
  const width = duration * TIMELINE_PIXELS_PER_SECOND;
  const position = currentTime * TIMELINE_PIXELS_PER_SECOND;

  return (
    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`absolute h-full transition-all duration-100 ${
          isRecording ? 'bg-red-500' : 'bg-indigo-600'
        }`}
        style={{ width: `${width}px` }}
      />
      {!isRecording && (
        <div
          className="absolute w-0.5 h-full bg-white shadow-sm"
          style={{ left: `${position}px` }}
        />
      )}
    </div>
  );
}
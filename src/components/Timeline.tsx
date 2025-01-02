import React from 'react';
import { MAX_RECORDING_DURATION, TIMELINE_PIXELS_PER_SECOND } from '../constants/audio';

export function Timeline() {
  const totalWidth = MAX_RECORDING_DURATION * TIMELINE_PIXELS_PER_SECOND;
  const markers = [];
  
  // Create minute markers
  for (let i = 0; i <= MAX_RECORDING_DURATION; i += 60) {
    const minutes = Math.floor(i / 60);
    markers.push(
      <div
        key={i}
        className="absolute top-0 h-4 border-l border-gray-300"
        style={{ left: `${i * TIMELINE_PIXELS_PER_SECOND}px` }}
      >
        <span className="absolute -left-3 top-4 text-xs text-gray-500">
          {minutes}m
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-8 mb-4 overflow-x-auto">
      <div className="absolute top-0 h-full" style={{ width: `${totalWidth}px` }}>
        {markers}
        <div className="absolute bottom-0 w-full border-b border-gray-300" />
      </div>
    </div>
  );
}
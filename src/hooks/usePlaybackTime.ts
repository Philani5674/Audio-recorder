import { useState, useEffect } from 'react';
import { useAudioContext } from './useAudioContext';

export function usePlaybackTime(isPlaying: boolean, duration: number = 0) {
  const [currentTime, setCurrentTime] = useState(0);
  const audioContext = useAudioContext();

  useEffect(() => {
    if (!isPlaying) {
      setCurrentTime(0);
      return;
    }

    const startTime = audioContext.currentTime;
    const interval = setInterval(() => {
      const elapsed = audioContext.currentTime - startTime;
      setCurrentTime(elapsed);
      
      if (elapsed >= duration) {
        setCurrentTime(duration);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, duration, audioContext]);

  return currentTime;
}
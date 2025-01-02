import { useState, useEffect, useCallback } from 'react';
import { MAX_RECORDING_DURATION } from '../constants/audio';

export function useRecordingTimer() {
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setRecordingTime(0);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= MAX_RECORDING_DURATION) {
          setIsRunning(false);
          return prev;
        }
        return prev + 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    recordingTime,
    startTimer,
    stopTimer,
    isRunning
  };
}
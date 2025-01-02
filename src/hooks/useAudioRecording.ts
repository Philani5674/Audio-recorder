import { useCallback, useRef } from 'react';
import { useAudioContext } from './useAudioContext';
import { useRecordingTimer } from './useRecordingTimer';
import { MAX_RECORDING_DURATION } from '../constants/audio';

export function useAudioRecording() {
  const audioContext = useAudioContext();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { recordingTime, startTimer, stopTimer } = useRecordingTimer();

  const startRecording = useCallback(async (onDataAvailable: (data: Blob) => void) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm; codecs=opus' });
        onDataAvailable(blob);
      };

      // Auto-stop after MAX_RECORDING_DURATION
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopRecording();
        }
      }, MAX_RECORDING_DURATION * 1000);

      mediaRecorder.start(100);
      startTimer();
      return mediaRecorder;
    } catch (error) {
      console.error('Error setting up media recorder:', error);
      throw error;
    }
  }, [startTimer]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      stopTimer();
    }
  }, [stopTimer]);

  return {
    startRecording,
    stopRecording,
    recordingTime
  };
}
import { useCallback, useRef } from 'react';
import { AudioTrackData } from '../types/audio';
import { useAudioContext } from './useAudioContext';

export function useAudioPlayback() {
  const audioContext = useAudioContext();
  const audioSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const playbackStartTimeRef = useRef<number>(0);

  const stopAllSources = useCallback(() => {
    audioSourcesRef.current.forEach(source => source.stop());
    audioSourcesRef.current = [];
  }, []);

  const playTracks = useCallback((tracksToPlay: AudioTrackData[]) => {
    stopAllSources();

    if (tracksToPlay.length === 0) return;

    tracksToPlay.forEach(track => {
      if (!track.audioBuffer) return;

      const source = audioContext.createBufferSource();
      source.buffer = track.audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      audioSourcesRef.current.push(source);
    });

    playbackStartTimeRef.current = audioContext.currentTime;
  }, [audioContext, stopAllSources]);

  return {
    playTracks,
    stopAllSources,
    audioContext
  };
}
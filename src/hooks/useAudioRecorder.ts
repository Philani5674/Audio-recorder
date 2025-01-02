import { useState, useCallback } from 'react';
import { AudioTrackData } from '../types/audio';
import { useAudioPlayback } from './useAudioPlayback';
import { useAudioRecording } from './useAudioRecording';

export function useAudioRecorder() {
  const [tracks, setTracks] = useState<AudioTrackData[]>([]);
  const { playTracks, stopAllSources, audioContext } = useAudioPlayback();
  const { startRecording, stopRecording } = useAudioRecording();

  const addTrack = useCallback(() => {
    setTracks(prev => [
      ...prev,
      { id: Date.now(), audioBuffer: null, isRecording: false, isPlaying: false }
    ]);
  }, []);

  const handleStartRecording = useCallback(async (trackId: number) => {
    try {
      // Play existing tracks while recording
      const existingTracks = tracks.filter(track => track.audioBuffer);
      playTracks(existingTracks);

      await startRecording(async (blob) => {
        try {
          const arrayBuffer = await blob.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          
          setTracks(prev =>
            prev.map(track =>
              track.id === trackId
                ? { ...track, audioBuffer, isRecording: false }
                : track
            )
          );
        } catch (error) {
          console.error('Error decoding audio:', error);
          setTracks(prev =>
            prev.map(track =>
              track.id === trackId
                ? { ...track, isRecording: false }
                : track
            )
          );
        }
      });

      setTracks(prev =>
        prev.map(track =>
          track.id === trackId ? { ...track, isRecording: true } : track
        )
      );
    } catch (error) {
      console.error('Error starting recording:', error);
      setTracks(prev =>
        prev.map(track =>
          track.id === trackId ? { ...track, isRecording: false } : track
        )
      );
    }
  }, [tracks, startRecording, playTracks, audioContext]);

  const handleStopRecording = useCallback((trackId: number) => {
    stopRecording();
    stopAllSources();
    
    setTracks(prev =>
      prev.map(track =>
        track.id === trackId ? { ...track, isRecording: false } : track
      )
    );
  }, [stopRecording, stopAllSources]);

  const playAllTracks = useCallback(() => {
    const tracksToPlay = tracks.filter(track => track.audioBuffer);
    playTracks(tracksToPlay);

    setTracks(prev =>
      prev.map(track => ({
        ...track,
        isPlaying: !!track.audioBuffer
      }))
    );
  }, [tracks, playTracks]);

  const stopAllTracks = useCallback(() => {
    stopAllSources();

    setTracks(prev =>
      prev.map(track => ({
        ...track,
        isPlaying: false
      }))
    );
  }, [stopAllSources]);

  const deleteTrack = useCallback((trackId: number) => {
    setTracks(prev => prev.filter(track => track.id !== trackId));
  }, []);

  return {
    tracks,
    addTrack,
    startRecording: handleStartRecording,
    stopRecording: handleStopRecording,
    playAllTracks,
    stopAllTracks,
    deleteTrack,
  };
}
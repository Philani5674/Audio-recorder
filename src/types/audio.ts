export interface AudioTrackData {
  id: number;
  audioBuffer: AudioBuffer | null;
  isRecording: boolean;
  isPlaying: boolean;
}
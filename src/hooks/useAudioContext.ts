import { useState } from 'react';

export function useAudioContext() {
  const [audioContext] = useState(() => new AudioContext());
  return audioContext;
}
import { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  audioBuffer: AudioBuffer | null;
  isPlaying: boolean;
}

export function WaveformVisualizer({ audioBuffer, isPlaying }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !audioBuffer) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const audioData = audioBuffer.getChannelData(0);
    const step = Math.ceil(audioData.length / canvas.width);
    

    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    ctx.lineWidth = 2;
    ctx.strokeStyle = isPlaying ? '#4F46E5' : '#6B7280';
    
    ctx.beginPath();
    for (let i = 0; i < canvas.width; i++) {
      const audioIndex = i * step;
      let min = 1.0;
      let max = -1.0;
      
      for (let j = 0; j < step && audioIndex + j < audioData.length; j++) {
        const datum = audioData[audioIndex + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }
      
      const y = ((min + max) / 2 * 0.5 + 0.5) * canvas.height;
      
      if (i === 0) {
        ctx.moveTo(i, y);
      } else {
        ctx.lineTo(i, y);
      }
    }
    ctx.stroke();
  }, [audioBuffer, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      width={800}
      height={100}
    />
  );
}
import React from 'react';
import { Play, Pause, Trash2, Mic, MicOff } from 'lucide-react';
import { TrackTimeline } from './TrackTimeline';
import { formatTime } from '../utils/timeFormat';
import { usePlaybackTime } from '../hooks/usePlaybackTime';

interface AudioTrackProps {
  trackNumber: number;
  isRecording: boolean;
  isPlaying: boolean;
  hasRecording: boolean;
  audioBuffer: AudioBuffer | null;
  onRecord: () => void;
  onPlay: () => void;
  onDelete: () => void;
}

export function AudioTrack({
  trackNumber,
  isRecording,
  isPlaying,
  hasRecording,
  audioBuffer,
  onRecord,
  onPlay,
  onDelete,
}: AudioTrackProps) {
  const duration = audioBuffer?.duration || 0;
  const currentTime = usePlaybackTime(isPlaying, duration);

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <span className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full font-medium">
          {trackNumber}
        </span>
        
        <div className="flex-1">
          <TrackTimeline
            duration={duration}
            currentTime={currentTime}
            isRecording={isRecording}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onRecord}
            className={`p-2 rounded-full ${
              isRecording
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          {hasRecording && (
            <>
              <button
                onClick={onPlay}
                className={`p-2 rounded-full ${
                  isPlaying
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button
                onClick={onDelete}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <Trash2 size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      {hasRecording && (
        <div className="text-sm text-gray-500">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      )}
    </div>
  );
}
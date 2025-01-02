import React from 'react';
import { Plus, PlayCircle, StopCircle } from 'lucide-react';
import { AudioTrack } from './components/AudioTrack';
import { useAudioRecorder } from './hooks/useAudioRecorder';

function App() {
  const {
    tracks,
    addTrack,
    startRecording,
    stopRecording,
    playAllTracks,
    stopAllTracks,
    deleteTrack,
  } = useAudioRecorder();

  const handleTrackAction = (trackId: number, isRecording: boolean) => {
    if (isRecording) {
      stopRecording(trackId);
    } else {
      startRecording(trackId);
    }
  };

  const isAnyTrackPlaying = tracks.some(track => track.isPlaying);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Multi-track Recorder</h1>
          <p className="text-gray-600">
            Record multiple audio tracks and play them simultaneously
          </p>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            onClick={isAnyTrackPlaying ? stopAllTracks : playAllTracks}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isAnyTrackPlaying
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isAnyTrackPlaying ? (
              <>
                <StopCircle size={20} />
                Stop All
              </>
            ) : (
              <>
                <PlayCircle size={20} />
                Play All
              </>
            )}
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {tracks.map((track, index) => (
            <AudioTrack
              key={track.id}
              trackNumber={index + 1}
              isRecording={track.isRecording}
              isPlaying={track.isPlaying}
              hasRecording={!!track.audioBuffer}
              audioBuffer={track.audioBuffer}
              onRecord={() => handleTrackAction(track.id, track.isRecording)}
              onPlay={() => playAllTracks()}
              onDelete={() => deleteTrack(track.id)}
            />
          ))}
        </div>

        <button
          onClick={addTrack}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          Add Track
        </button>
      </div>
    </div>
  );
}

export default App;
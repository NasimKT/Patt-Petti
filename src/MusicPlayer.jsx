import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const MusicPlayer = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio(song.downloadUrl.url);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player" style={{
      backgroundColor: '#282828',
      color: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}>
      <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Now Playing</h3>
      <p style={{ marginBottom: '20px', fontSize: '1rem' }}>{song.name} - {song.artists.primary[0].name}</p>
      <Button
        onClick={togglePlay}
        style={{
          backgroundColor: '#1db954',
          borderColor: '#1db954',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
    </div>
  );
};

export default MusicPlayer;

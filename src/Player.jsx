import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import './Player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPlay, faPause, faForward } from '@fortawesome/free-solid-svg-icons';

const Player = () => {
  const { songId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetch(`https://saavn.dev/api/songs/${songId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch song details');
        }
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching song details:', error);
        setLoading(false);
      }
    };

    fetchSong();
  }, [songId]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    if (progressRef.current) {
      progressRef.current.value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
    if (progressRef.current) {
      progressRef.current.value = 0;
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: '#232323', borderRadius: '20px', padding: '20px', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Now Playing</h2>
      {data.map((song) => (
        <div key={song.id} style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '20px' }}>
            <img src={song.image[2].url} alt={song.name} style={{ width: '100%', borderRadius: '10px' }} />
          </div>
          <div>
            <h5 style={{ marginBottom: '10px' }}>{song.name}</h5>
            <p style={{ marginBottom: '5px' }}>Artist: {song.artists.primary[0].name}</p>
            <p style={{ marginBottom: '5px' }}>Album: {song.album.name}</p>
            <p style={{ marginBottom: '5px' }}>Language: {song.language}</p>
            <div>
              <h4 style={{ marginBottom: '10px' }}>{song.name} - {song.artists.primary[0].name}</h4>
              <audio 
                ref={audioRef} 
                onTimeUpdate={handleTimeUpdate} 
                onLoadedMetadata={handleLoadedMetadata} 
                onEnded={handleEnded} 
                style={{ width: '100%' }}
              >
                <source src={song.downloadUrl[2].url} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>

              <div className="progress-container" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ color: '#fff', fontSize: '12px' }}>{formatTime(currentTime)}</span>
                <input
                  type="range"
                  className='progress'
                  id='progress'
                  ref={progressRef}
                  onChange={handleProgressChange}
                  defaultValue="0"
                  style={{ flex: 1, margin: '0 10px' }}
                />
                <span style={{ color: '#fff', fontSize: '12px' }}>{formatTime(duration)}</span>
              </div>

              <div className="controls">
                <div onClick={handleBackward}>
                  <FontAwesomeIcon icon={faBackward} />
                </div>
                <div onClick={togglePlayPause}>
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </div>
                <div onClick={handleForward}>
                  <FontAwesomeIcon icon={faForward} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Player;

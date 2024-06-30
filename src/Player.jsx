import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

const Player = () => {
  const { songId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);

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
                <audio controls autoPlay style={{ width: '100%' }}>
                  <source src={song.downloadUrl[2].url} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Player;

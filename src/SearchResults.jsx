import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css'; // Custom CSS for styling

const SearchResults = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`https://saavn.dev/api/search/songs?query=${query}`);
        const data = await response.json();
        if (data.success) {
          setSongs(data.data.results);
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    if (query) {
      fetchSongs();
    }
  }, [query]);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const stopSong = () => {
    setCurrentSong(null);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Search Results for "{query}"</h2>
      <div className="song-list">
        {songs.map((song) => (
          <div key={song.id} className="song-item">
            <img src={song.image[2].url} alt={song.name} className="song-image" />
            <div className="song-details">
              <h5>{song.name}</h5>
              <p className="mb-1">Artist: {song.artists.primary[0].name}</p>
              <p className="mb-1">Album: {song.album.name}</p>
              <p className="mb-1">Language: {song.language}</p>
              <button className="btn btn-primary" onClick={() => playSong(song)}>Play</button>
              {currentSong && currentSong.id === song.id && (
                <div className="audio-player mt-3">
                  <h3 className="mb-2">Now Playing:</h3>
                  <h4 className="mb-3">{currentSong.name} - {currentSong.artists.primary[0].name}</h4>
                  <audio controls autoPlay>
                    <source src={song.downloadUrl[2].url} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                  <button className="btn btn-danger mt-2" onClick={stopSong}>Stop</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

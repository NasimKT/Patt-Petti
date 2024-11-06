import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResults.css';  

const SearchResults = () => {
  const [songs, setSongs] = useState([]);
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

  const handleSongClick = (song) => {
    // Update previously played songs in localStorage
    const previouslyPlayed = JSON.parse(localStorage.getItem('previouslyPlayed')) || [];
    const updatedPlayed = [...previouslyPlayed.filter(item => item.id !== song.id), song];
    localStorage.setItem('previouslyPlayed', JSON.stringify(updatedPlayed));
  };

  const playSong = (song) => {
    handleSongClick(song);  // Save the song to localStorage as previously played
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Search Results for "{query}"</h2>
      <div className="song-list">
        {songs.map((song) => (
          <Link 
            key={song.id} 
            to={`/player/${song.id}`} 
            style={{ textDecoration: 'none' }}
            onClick={() => playSong(song)}  // Trigger playSong on click
          >
            <div key={song.id} className="song-item">
              <img src={song.image[2].url} alt={song.name} className="song-image" />
              <div className="song-details">
                <h5>{song.name}</h5>
                <p className="mb-1">Artist: {song.artists.primary[0].name}</p>
                <p className="mb-1">Album: {song.album.name}</p>
                <p className="mb-1">Language: {song.language}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

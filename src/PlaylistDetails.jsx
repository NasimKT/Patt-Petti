import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SearchResults.css'; // Assuming you are using the same styles as SearchResults

const PlaylistDetails = () => {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await fetch(`https://saavn.dev/api/playlists?id=${id}`);
        const data = await response.json();
        if (data.success) {
          setPlaylistName(data.data.name);
          setSongs(data.data.songs);
        }
      } catch (error) {
        console.error('Error fetching playlist details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [id]);

  const handleSongClick = (song) => {
    const previouslyPlayed = JSON.parse(localStorage.getItem('previouslyPlayed')) || [];
    const updatedPlayed = [...previouslyPlayed.filter(item => item.id !== song.id), song];
    localStorage.setItem('previouslyPlayed', JSON.stringify(updatedPlayed));
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">{loading ? 'Loading...' : playlistName}</h2>
      <div className="song-list">
        {songs.map((song) => (
          <Link
            key={song.id}
            to={`/player/${song.id}`}
            style={{ textDecoration: 'none' }}
            onClick={() => handleSongClick(song)}
          >
            <div className="song-item">
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

export default PlaylistDetails;

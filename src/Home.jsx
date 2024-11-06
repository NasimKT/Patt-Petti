import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [playlist, setPlaylist] = useState([]);
  const [previouslyPlayed, setPreviouslyPlayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const ids = [1080335349, 951898142, 550788862, 945969391, 1026391929, 829477391];

  useEffect(() => {
    const loadPreviouslyPlayed = () => {
      const storedSongs = JSON.parse(localStorage.getItem('previouslyPlayed')) || [];
      setPreviouslyPlayed(storedSongs);
    };

    loadPreviouslyPlayed();
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        let allPlaylists = [];
        for (const id of ids) {
          const response = await fetch(`https://saavn.dev/api/playlists?id=${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch playlists');
          }
          const result = await response.json();
          allPlaylists = allPlaylists.concat(result.data);
        }
        const limitedData = allPlaylists.slice(0, 6);
        setPlaylist(limitedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="container py-4" style={{ maxWidth: '70vw' }}>
      <h2 className="mb-4">Welcome to Patt Petti</h2>
      <p className="lead">Your personalized music experience awaits!</p>
      <div className="home-sections">
        <div className="previously-played">
          <h3 className="mb-4">Previously Played Songs</h3>
          <div className="quick-picks-scroll" style={{ overflowX: 'auto', whiteSpace: 'nowrap', WebkitOverflowScrolling: 'touch' }}>
            {previouslyPlayed.map((song) => (
              <Link key={song.id} to={`/player/${song.id}`} className="quick-pick-link" onClick={() => handleSongClick(song)}>
                <div className="quick-pick-item" style={{ display: 'inline-block', width: '200px', margin: '0 10px', textAlign: 'center', padding: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <img src={song.image[2].url} alt={song.name} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
                  <div className="quick-pick-info" style={{ marginTop: '10px', textAlign: 'center' }}>
                    <h5 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0', marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{song.name}</h5>
                    <p style={{ fontSize: '12px', margin: '0' }}>{song.artists.primary[0].name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="playlists">
          <h3 className="mb-4">Playlists</h3>
          <div className="quick-picks-scroll" style={{ overflowX: 'auto', whiteSpace: 'nowrap', WebkitOverflowScrolling: 'touch' }}>
            {playlist.map((list) => (
              <Link key={list.id} to={`/playlist/${list.id}`} className="quick-pick-link">
                <div className="quick-pick-item" style={{ display: 'inline-block', width: '200px', margin: '0 10px', textAlign: 'center', padding: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <img src={list.image[2].url} alt={list.name} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
                  <div className="quick-pick-info" style={{ marginTop: '10px', textAlign: 'center' }}>
                    <h5 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0', marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{list.name}</h5>
                    <p style={{ fontSize: '12px', margin: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{list.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

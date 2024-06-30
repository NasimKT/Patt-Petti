import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`https://saavn.dev/api/songs/wBgCQQ_6/suggestions`);
        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }
        const result = await response.json();
        const limitedData = result.data.slice(0, 6); // Slice to include only the first 6 items
        setData(limitedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <div className="container py-4" style={{ maxWidth: '70vw' }}>
      <h2 className="mb-4">Welcome to Patt Petti</h2>
      <p className="lead">Your personalized music experience awaits!</p>
      <div className="home-sections">
        <div className="quick-picks">
          <h3>Quick Picks</h3>
          <div className="quick-picks-scroll" style={{ overflowX: 'auto', whiteSpace: 'nowrap', WebkitOverflowScrolling: 'touch' }}>
            {data.map((song) => (
              <Link key={song.id} to={`/player/${song.id}`} className="quick-pick-link">
                <div className="quick-pick-item" style={{ display: 'inline-block', width: '200px', margin: '0 10px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
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
        <div className="artists">
          <h3>Artists</h3>
          <ul>
            <li>Artist 1</li>
            <li>Artist 2</li>
            <li>Artist 3</li>
            <li>Artist 4</li>
            <li>Artist 5</li>
          </ul>
        </div>
        <div className="playlists">
          <h3>Playlists</h3>
          <ul>
            <li>Playlist 1</li>
            <li>Playlist 2</li>
            <li>Playlist 3</li>
            <li>Playlist 4</li>
            <li>Playlist 5</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;

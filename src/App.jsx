import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import SearchResults from './SearchResults';
import Player from './Player';
import PlaylistDetails from './PlaylistDetails';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault(); // Disable the context menu
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div className="app">
      <header className="navbar spotify-navbar">
        <Container>
          <center>
            <h1 className="brand-name">Patt Petti</h1>
          </center>
        </Container>
      </header>
      <div className="content spotify-content">
        <aside className="sidebar">
          <ul>
            <li><Link to="/" className="sidebar-link">Home</Link></li>
            <div style={{ paddingBottom: '20px' }}></div>
            <li><Link to="/search" className="sidebar-link">Search</Link></li>
          </ul>
        </aside>
        <main className="main-content">
          <Container className="mt-4" style={{ maxWidth: '100%' }}>
            {location.pathname === '/search' && (
              <form onSubmit={handleSearchSubmit} className="spotify-search-bar">
                <input
                  type="text"
                  placeholder="Search for songs..."
                  className="spotify-search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button type="submit" className="btn btn-success" style={{ height: '40px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
              </form>
            )}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/player/:songId" element={<Player />} />
              <Route path="/playlist/:id" element={<PlaylistDetails />} /> {/* Corrected to use element */}
            </Routes>
          </Container>
        </main>
      </div>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;

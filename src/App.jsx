import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import SearchResults from './SearchResults';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <BrowserRouter>
      <div className="app">
        <header className="navbar spotify-navbar">
          <Container><center>
             <h1 className="brand-name">Patt Petti</h1>
          </center>
          </Container>
        </header>
        <div className="content spotify-content">
          <aside className="sidebar">
            <ul>
              <li><Link to="/" className="sidebar-link">Home</Link></li><div style={{paddingBottom: '20px'}}></div>
              <li><Link to="/search" className="sidebar-link">Search</Link></li>
            </ul>
          </aside>
          <main className="main-content">
            <Container className="mt-4">
              <form onSubmit={handleSearchSubmit} className="spotify-search-bar">
                <input
                  type="text"
                  placeholder="Search for songs..."
                  className="spotify-search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button type="submit" className="btn btn-success">Search</button>
              </form>

              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
              </Routes>
            </Container>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

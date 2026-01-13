"use client"
import React from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" style={{ background: 'linear-gradient(to right, #90cea1, #01b4e4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer' }} onClick={() => { setQuery(""); onSearch(""); }}>
          THE MOVIE DB
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); onSearch(""); setQuery(""); }}>Home</a></li>
            <li><a href="#">Movies</a></li>
            <li><a href="#">TV Shows</a></li>
          </ul>
        </nav>
        <form className="search-container" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Search for a movie..." 
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
};

export default Header;

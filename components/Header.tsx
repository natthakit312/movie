"use client"
import React from 'react';
import Link from 'next/link';

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
        <Link href="/" className="logo" style={{ background: 'linear-gradient(to right, #90cea1, #01b4e4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer', textDecoration: 'none' }} onClick={() => { setQuery(""); onSearch(""); }}>
          THE MOVIE DB
        </Link>
        <nav>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/movies">Movies</Link></li>
            <li><Link href="/tv">TV Shows</Link></li>
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

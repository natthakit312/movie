"use client"
import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" style={{ background: 'linear-gradient(to right, #90cea1, #01b4e4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          THE MOVIE DB
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Movies</a></li>
            <li><a href="#">TV Shows</a></li>
            <li><a href="#">Trending</a></li>
            <li><a href="#">My List</a></li>
          </ul>
        </nav>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="search-input" 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

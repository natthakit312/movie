import React from 'react';

interface MovieCardProps {
  title: string;
  posterPath: string;
  rating: number;
  releaseDate: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterPath, rating, releaseDate }) => {
  const imageUrl = posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  // Calculate percentage for circular progress
  const ratingPercentage = Math.round(rating * 10);
  const strokeDashoffset = 100 - ratingPercentage;

  return (
    <div className="movie-card animate-fade-in">
      <div className="poster-wrapper">
        <img src={imageUrl} alt={title} className="movie-poster" loading="lazy" />
        
        {/* Rating Circle - Inspired by Image 1 */}
        <div className="rating-circle-container">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path className="circle"
              strokeDasharray={`${ratingPercentage}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="rating-text">{ratingPercentage}%</span>
        </div>
      </div>
      
      <div className="movie-content">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-date">{releaseDate ? new Date(releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Release'}</p>
      </div>
    </div>
  );
};

export default MovieCard;

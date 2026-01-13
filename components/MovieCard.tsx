import Link from 'next/link';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  releaseDate: string;
  type?: 'movie' | 'tv';
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterPath, rating, releaseDate, type = 'movie' }) => {
  const imageUrl = posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  // Calculate percentage for circular progress
  const ratingPercentage = Math.round(rating * 10);
  
  // Dynamic color based on rating (TMDb style)
  const getRatingColor = (score: number) => {
    if (score >= 70) return "#21d07a"; // Green
    if (score >= 40) return "#d2d531"; // Yellow/Lime
    return "#db2360"; // Red
  };

  const color = getRatingColor(ratingPercentage);

  return (
    <Link href={`/${type}/${id}`} className="movie-card animate-fade-in" style={{ textDecoration: 'none' }}>
      <div className="poster-wrapper">
        <img src={imageUrl} alt={title} className="movie-poster" loading="lazy" />
        
        {/* Rating Circle - Enhanced Visibility */}
        <div className="rating-circle-container">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path className="circle"
              stroke={color}
              strokeDasharray={`${ratingPercentage}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="rating-text-wrapper">
            <span className="rating-text">{ratingPercentage}</span>
            <span className="rating-percent">%</span>
          </div>
        </div>
      </div>
      
      <div className="movie-content">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-date">
          {releaseDate ? new Date(releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Jan 01, 2024'}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;

"use client"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";

// Mock data in case API key is missing or fails
const MOCK_MOVIES = [
  { id: 1, title: "Perfect Days", poster_path: "/6v65vK6tGzIDxNRd9yQ5zW5Z4jN.jpg", vote_average: 8.2, release_date: "2023-11-10" },
  { id: 2, title: "Close", poster_path: "/6m6p6oBvG6M6O5yN4p6m7k8jL9i.jpg", vote_average: 7.9, release_date: "2022-11-01" },
  { id: 3, title: "Portrait of a Lady on Fire", poster_path: "/2L6965vK6tGzIDxNRd9yQ5zW5Z4jN.jpg", vote_average: 8.3, release_date: "2019-09-18" },
  { id: 4, title: "Aftersun", poster_path: "/7v65vK6tGzIDxNRd9yQ5zW5Z4jN.jpg", vote_average: 7.9, release_date: "2022-10-21" },
  { id: 5, title: "In the Mood for Love", poster_path: "/8v65vK6tGzIDxNRd9yQ5zW5Z4jN.jpg", vote_average: 8.1, release_date: "2000-09-29" },
  { id: 6, title: "Stranger Things", poster_path: "/49WJfev0mUIPxw9PBv9j69YgI3S.jpg", vote_average: 8.6, release_date: "2016-07-15" },
];

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [category, setCategory] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Replace with your TMDb API Key
  const API_KEY = "233f3a5d8f8cb3c344512e12e10a9be0"; 

  const fetchMovies = async (cat: string, query: string, pageNum: number, append: boolean = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);

    try {
      if (!API_KEY || API_KEY.length < 10) {
        setMovies(MOCK_MOVIES);
        setLoading(false);
        setHasMore(false);
        return;
      }

      let url = `https://api.themoviedb.org/3/movie/${cat}?api_key=${API_KEY}&language=en-US&page=${pageNum}`;
      
      if (query) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${pageNum}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.results) {
        if (append) {
          setMovies(prev => [...prev, ...data.results]);
        } else {
          setMovies(data.results);
        }
        setHasMore(data.page < data.total_pages);
      } else {
        if (!append) setMovies(MOCK_MOVIES);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      if (!append) setMovies(MOCK_MOVIES);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchMovies(category, searchQuery, 1, false);
  }, [category, searchQuery]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(category, searchQuery, nextPage, true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) setCategory("");
    else if (!category) setCategory("popular");
  };

  return (
    <div className="min-h-screen">
      <Header onSearch={handleSearch} />
      
      <main className="movie-section">
        <div className="section-header">
          <h2 className="section-title">
            {searchQuery ? `Results for "${searchQuery}"` : category.replace('_', ' ').toUpperCase()}
          </h2>
          
          {!searchQuery && (
            <div className="category-filters">
              {['popular', 'top_rated', 'upcoming'].map((cat) => (
                <button 
                  key={cat}
                  className={`filter-btn ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat.replace('_', ' ').charAt(0).toUpperCase() + cat.replace('_', ' ').slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="movie-grid">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : (
          <>
            <div className="movie-grid">
              {movies.length > 0 ? (
                movies.map((movie, index) => (
                  <MovieCard
                    key={`${movie.id}-${index}`}
                    title={movie.title || movie.name}
                    posterPath={movie.poster_path}
                    rating={movie.vote_average}
                    releaseDate={movie.release_date || movie.first_air_date}
                  />
                ))
              ) : (
                <p className="no-results">No movies found. Try another search.</p>
              )}
            </div>
            
            {hasMore && movies.length > 0 && (
              <div className="load-more-container">
                <button 
                  className="load-more-btn" 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

"use client"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";

export default function MoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [category, setCategory] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const API_KEY = "233f3a5d8f8cb3c344512e12e10a9be0"; 

  const fetchMovies = async (cat: string, query: string, pageNum: number, append: boolean = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);

    try {
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
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
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
            {searchQuery ? `Searching Movies: "${searchQuery}"` : `MOVIES: ${category.replace('_', ' ').toUpperCase()}`}
          </h2>
          
          {!searchQuery && (
            <div className="category-filters">
              {['popular', 'top_rated', 'upcoming', 'now_playing'].map((cat) => (
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
              {movies.map((movie, index) => (
                <MovieCard
                  key={`${movie.id}-${index}`}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  rating={movie.vote_average}
                  releaseDate={movie.release_date}
                  type="movie"
                />
              ))}
            </div>
            
            {hasMore && movies.length > 0 && (
              <div className="load-more-container">
                <button 
                  className="load-more-btn" 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Loading...' : 'Explore More Movies'}
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

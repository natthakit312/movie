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
  
  // Replace with your TMDb API Key
  const API_KEY = "PLEASE_REPLACE_WITH_YOUR_TMDB_API_KEY"; 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (API_KEY === "PLEASE_REPLACE_WITH_YOUR_TMDB_API_KEY") {
          console.warn("Using mock data. Please provide a real TMDb API key.");
          setMovies(MOCK_MOVIES);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        
        if (data.results) {
          setMovies(data.results);
        } else {
          setMovies(MOCK_MOVIES);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies(MOCK_MOVIES);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="movie-section">
        <h2 className="section-title">Trending Now</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading amazing movies...</p>
          </div>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title || movie.name}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
                releaseDate={movie.release_date || movie.first_air_date}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

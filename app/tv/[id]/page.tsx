"use client"
import { useEffect, useState, use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TVDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [show, setShow] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const API_KEY = "233f3a5d8f8cb3c344512e12e10a9be0";

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [showRes, creditsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`)
        ]);
        
        const showData = await showRes.json();
        const creditsData = await creditsRes.json();
        
        setShow(showData);
        setCredits(creditsData);
      } catch (error) {
        console.error("Error details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="loading-screen">Loading details...</div>;
  if (!show) return <div className="error-screen">TV Show not found</div>;

  const backdropUrl = `https://image.tmdb.org/t/p/original${show.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${show.poster_path}`;

  return (
    <div className="min-h-screen">
      <Header onSearch={() => {}} />
      
      <div className="detail-hero" style={{ backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 1) 150px, rgba(3, 37, 65, 0.84) 100%), url(${backdropUrl})` }}>
        <div className="detail-container">
          <div className="detail-poster">
            <img src={posterUrl} alt={show.name} />
          </div>
          <div className="detail-info">
            <h1 className="detail-title">
              {show.name} <span className="title-year">({show.first_air_date?.split('-')[0]})</span>
            </h1>
            <div className="detail-meta">
              <span>{show.first_air_date}</span>
              <span className="dot">•</span>
              <span>{show.genres?.map((g: any) => g.name).join(', ')}</span>
              <span className="dot">•</span>
              <span>{show.number_of_seasons} Seasons</span>
            </div>
            
            <div className="detail-actions">
              <div className="detail-rating">
                <div className="rating-circle-large">
                  <span className="rating-val">{Math.round(show.vote_average * 10)}</span>
                  <span className="rating-perc">%</span>
                </div>
                <span className="rating-label">User<br/>Score</span>
              </div>
              <button className="play-trailer">▶ Play Trailer</button>
            </div>

            <div className="tagline"><i>{show.tagline}</i></div>

            <div className="detail-overview">
              <h3>Overview</h3>
              <p>{show.overview}</p>
            </div>

            <div className="detail-cast-preview">
              <h3>Series Cast</h3>
              <div className="cast-grid">
                {credits?.cast?.slice(0, 5).map((person: any) => (
                  <div key={person.id} className="cast-item">
                    <img 
                      src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Image'} 
                      alt={person.name} 
                    />
                    <p className="cast-name">{person.name}</p>
                    <p className="cast-role">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .detail-hero {
          padding: 40px 0;
          background-size: cover;
          background-position: center;
          min-height: 500px;
          display: flex;
          align-items: center;
          margin-top: 70px;
        }
        .detail-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          gap: 40px;
        }
        .detail-poster img {
          width: 300px;
          border-radius: 8px;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        .detail-info {
          color: white;
          max-width: 900px;
        }
        .detail-title {
          font-size: 2.5rem;
          margin-bottom: 5px;
        }
        .title-year {
          opacity: 0.7;
          font-weight: 400;
        }
        .detail-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          margin-bottom: 25px;
        }
        .dot { font-weight: bold; }
        .detail-actions {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 15px;
        }
        .tagline {
          margin-bottom: 20px;
          opacity: 0.8;
          font-size: 1.1rem;
        }
        .detail-rating {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .rating-circle-large {
          width: 60px;
          height: 60px;
          background: #081c22;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #21d07a;
        }
        .rating-val { font-size: 1.2rem; font-weight: 700; }
        .rating-perc { font-size: 0.6rem; margin-top: 2px; }
        .rating-label { font-size: 0.9rem; font-weight: 700; line-height: 1.1; }
        .play-trailer {
          background: transparent;
          border: none;
          color: white;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
        }
        .play-trailer:hover { opacity: 0.8; }
        .detail-overview h3 { margin-bottom: 10px; font-size: 1.3rem; }
        .detail-overview p { line-height: 1.6; font-size: 1.05rem; margin-bottom: 30px; }
        .cast-grid {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 15px;
        }
        .cast-item {
          flex: 0 0 120px;
          text-align: center;
        }
        .cast-item img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 8px;
        }
        .cast-name { font-weight: 700; font-size: 0.85rem; margin: 0; }
        .cast-role { font-size: 0.75rem; opacity: 0.7; margin: 0; }
        .loading-screen, .error-screen {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #032541;
          color: white;
          font-size: 1.5rem;
        }
        @media (max-width: 900px) {
          .detail-container { flex-direction: column; align-items: center; }
          .detail-info { text-align: center; }
          .detail-meta, .detail-actions { justify-content: center; }
          .cast-grid { justify-content: flex-start; }
        }
      `}</style>
    </div>
  );
}

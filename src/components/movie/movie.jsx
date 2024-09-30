import { useState, useRef, useEffect } from "react";
import "./movie.css";
import Harry from "./imgs/harry-povar.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import { useLocation } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';

const fetchMovieTrailer = async (movieName) => {
  const apiKey = 'AIzaSyDpbOG6jX8DH_ypGVgiia3ObMR0C__8uJo';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(movieName)}+trailer&key=${apiKey}&type=video&maxResults=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0]; // Вернуть первый результат
    } else {
      return null; // Нет трейлера
    }
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};


function Watch() {
  const location = useLocation();
  const movie = location.state?.movie; // Use optional chaining to prevent errors
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);
  const castRef = useRef(null);
  
  useEffect(() => {
    
      window.scrollTo(0, 0)
    }, [])
  

  useEffect(() => {
    const getTrailer = async () => {
      if (movie) {
        const trailerData = await fetchMovieTrailer(movie.name);
        setTrailer(trailerData);
      }
      setLoading(false); // Set loading to false after fetching
    };
    getTrailer();
  }, [movie]);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const scrollCast = (direction) => {
    if (castRef.current) {
      castRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    } 
  };
  
  const fullText = movie?.description || "";
  const shortText = fullText.slice(0, 200) + "...";

  if (!movie) {
    return <div>Movie not found</div>; // Handle case where movie is not found
  }

  return (
    <div className="wrapper">
      <div className="movie__about">
        <div className="movie__poster">
          <img src={movie.poster.url} alt="Постер с Поваром" className="poster" />
          <button type="button" className="poster__button">Watch Now</button>
        </div>
        <div className="movie__text">
          <h1 className="movie__name">{movie.name}</h1>
          <div className="movie__info">
            <div className="rate">
              <span className="rate__header">Rate</span>
              <span className="rate__number">⭐{movie.rating.imdb}</span>
            </div>
            <div className="genre">
              <span className="genre__header">Genre</span>
              <span className="genre__name">Fantasy</span>
            </div>
            <div className="genre">
              <span className="genre__header">Countries</span>
              <span className="genre__name">{movie.countries[0].name}</span>
            </div>
            <div className="duration">
              <span className="duration__header">Duration</span>
              <span className="duration__time">{movie.movieLength}m</span>
            </div>
          </div>
          <div className="text">
            {isExpanded ? fullText : shortText}{" "}
            <button onClick={toggleText} className="read-more-btn">
              {isExpanded ? "Show less" : "Read more"}
            </button>
          </div>
          <div className="cast__about">
            <h3>Cast</h3>
            <button onClick={() => scrollCast("left")} className="scroll-btn__left">&lt;</button>
            <div className="movie__cast" ref={castRef}>
              {Array(5).fill().map((_, index) => (
                <div className="acter" key={index}>
                  <img src={Harry} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">movies</span>
                    <span className="character">{movie.enName}</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => scrollCast("right")} className="scroll-btn__right">&gt;</button>
          </div>
        </div>
      </div>
      <div className="player">
        <h1 className="player__header">Trailer</h1>
        {loading ? (
  <div>Loading...</div> // Loading state
) : trailer && trailer.id && trailer.id.videoId ? (
<iframe
  className="video"
  src={`https://www.youtube.com/embed/${trailer.id.videoId}`}
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>

) : (
  <div>Ошибка природы</div> // Error handling
)}

      </div>
      <div className="similar">
        <div className="similar__header">
          <h1>Similar</h1>
          <a href="">View all</a>
        </div>
        <div className="similar__cards">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            slidesPerView={4.5}
            spaceBetween={-50}
            centeredSlides={true}
            centeredSlidesBounds={true}
            setWrapperSize={true}
          >
            {Array(8).fill().map((_, index) => (
              <SwiperSlide key={index}><img src={Harry} alt="" /></SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Watch;

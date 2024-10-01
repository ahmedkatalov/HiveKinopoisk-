import { useState, useRef, useEffect } from "react";
import "./movie.css";
import Harry from "./imgs/harry-povar.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useLocation } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteMovie } from "../../redux/favoriteMovies";

const fetchMovieTrailer = async (movieName) => {
  const apiKey = 'AIzaSyCrDezbsl4uDCFubpFq0LYdbDlySbjpUxw';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(movieName)}+trailer&key=${apiKey}&type=video&maxResults=1`;


 
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].id.videoId; // Return the video ID for the trailer
    } else {
      return null; // No trailer found
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
  const [trailerId, setTrailerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const castRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  // Fetch favorite movies from Redux store
  const favoriteMovies = useSelector((state) => state.favorite.favoriteMovie);
  const isFav = favoriteMovies.find((item) => movie.id === item.id);

  // Function to add movie to favorites
  const addToFavMovie = (movie) => {
    dispatch(addFavoriteMovie(movie));
  };

  // Fetch trailer when the component mounts
  useEffect(() => {
    const fetchTrailer = async () => {
      setLoading(true);
      const trailerId = await fetchMovieTrailer(movie.name);
      setTrailerId(trailerId);
      setLoading(false);
    };

    fetchTrailer();
  }, [movie.name]);

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

  const fullText = movie.description;
  const shortText = fullText.slice(0, 200) + "...";

  return (
    <div className="wrapper">
      <div className="movie__about">
        <div className="movie__poster">
          <img src={movie.poster.url} alt="Постер с Поваром" className="poster" />
          <button type="button" className="poster__button">
            Watch Now
          </button>
        </div>
        <div className="movie__text">
          <div className="movie__name">
            <h1>{movie.name}</h1>
            <button className="addToFav" onClick={() => addToFavMovie(movie)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill={isFav ? "orange" : "transparent"}
                viewBox="0 0 17 15"
                stroke="white"
              >
                <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
              </svg>
            </button>
          </div>
          <div className="movie__info">
            <div className="rate">
              <span className="rate__header">Rate</span>
              <span className="rate__number">⭐{movie.rating.imdb}</span>
            </div>
            <div className="genre">
              <span className="genre__header">Genre</span>
              <span className="genre__name">Fantasy</span>
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
            <button onClick={() => scrollCast("left")} className="scroll-btn__left">
              &lt;
            </button>
            <div className="movie__cast" ref={castRef}>
              {Array(5).fill().map((_, index) => (
                <div className="acter" key={index}>
                  <img src={Harry} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">Дэниэл Редклифф</span>
                    <span className="character">Гарри Повар</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => scrollCast("right")} className="scroll-btn__right">
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      <div className="player">
        <h1 className="player__header">Trailer</h1>
        {loading ? (
          <div>Loading...</div> // Loading state
        ) : trailerId ? (
          <iframe
            className="video"
            src={`https://www.youtube.com/embed/${trailerId}`} // Use the trailer ID from the fetch
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <div>Trailer not found</div> // Error handling
        )}
      </div>

      {/* Similar Movies Section */}
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
            slidesPerView={4}
            spaceBetween={10}
            centeredSlides={true}
            centeredSlidesBounds={true}
            setWrapperSize={true}
          >
            {Array(8).fill().map((_, index) => (
              <SwiperSlide key={index}>
                <img src={Harry} alt={`Similar Movie ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Watch;

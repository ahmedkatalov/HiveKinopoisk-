import { useState, useRef, useEffect } from "react";
import "./movie.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useLocation, useParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import { useDispatch, useSelector } from "react-redux";
import { addFavoriteMovie } from "../../redux/favoriteMovies";
import { getMovieById } from "../../redux/currentMovie";



function Watch() {
  const { id } = useParams();
  // const [movie, setMovie] = useState({});
  const location = useLocation()
  const posters = location.state.movie;
  console.log(posters)

  const movie = useSelector((state) => state.currentMovie.currentMovie);
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(movie);
  const favoriteMovies = useSelector((state) => state.favorite.favoriteMovie);
  const isFav = favoriteMovies.find((item) => movie?.id === item.id);
  // const [isFav, setIsFav] = useState(false);
  const castRef = useRef(null);
  const dispatch = useDispatch();

  const addToFavMovie = (movie) => {
    // setIsFav(!isFav);
    dispatch(addFavoriteMovie(movie));
  };

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
  const shortText = fullText.length > 200 ? fullText.slice(0, 200) + "..." : fullText;
  console.log(movie)

  useEffect(() => {
    if (id) {
      dispatch(getMovieById(id));
    }
  }, [dispatch, id]);

  if(!movie?.name){
    return null;
  }

  const handleNavigateToShow = () => {
    window.open(movie.watchability.items[0].url)

  }

  return (
    <>
      <div className="wrapper">
        <div className="movie__about">
          <div className="movie__poster">
            <img
              src={movie?.poster?.url}
              alt="Постер с Поваром"
              className="poster"
            />
            <button type="button" className="poster__button" onClick={handleNavigateToShow}>
              Watch Now
            </button>
          </div>
          <div className="movie__text">
            <div className="movie__name">
              <h1>{movie?.name + ` - ` + `(` + movie?.alternativeName + `)`}</h1>
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
                <span className="rate__number">⭐{movie?.rating.imdb}</span>
              </div>
              <div className="genre">
                <span className="genre__header">Genre</span>
                <span className="genre__name">{movie?.genres?.[0]?.name}</span>
              </div>
              <div className="duration">
                <span className="duration__header">Duration</span>
                <span className="duration__time">
                  {movie?.movieLength + ` m`}
                </span>
              </div>
            </div>
            <div className="text">
              {isExpanded ? fullText : shortText}{" "}
              <button onClick={toggleText} className="read-more-btn">
                {isExpanded ? "Show less" : "Read more"}{" "}
              </button>
            </div>
            <div className="cast__about">
              <h3>Cast</h3>
              <button
                onClick={() => scrollCast("left")}
                className="scroll-btn__left"
              >
                &lt;
              </button>
              <div className="movie__cast" ref={castRef}>
                <div className="acter">
                  <img src={movie.persons[0].photo} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">{movie.persons[0].name}</span>
                    <span className="character">{movie.persons[0].description}</span>
                  </div>
                </div>
                <div className="acter">
                  <img src={movie.persons[1].photo} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">{movie.persons[1].name}</span>
                    <span className="character">{movie.persons[1].description}</span>
                  </div>
                </div>
                <div className="acter">
                  <img src={movie.persons[2].photo} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">{movie.persons[2].name}</span>
                    <span className="character">{movie.persons[2].description}</span>
                  </div>
                </div>
                <div className="acter">
                  <img src={movie.persons[3].photo} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">{movie.persons[3].name}</span>
                    <span className="character">{movie.persons[3].description}</span>
                  </div>
                </div>
                <div className="acter">
                  <img src={movie.persons[4].photo} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">{movie.persons[4].name}</span>
                    <span className="character">{movie.persons[4].description}</span>
                  </div>
                </div>
                <div className="acter">
                  <img src={movie.persons[5].photo} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">{movie.persons[5].name}</span>
                    <span className="character">{movie.persons[5].description}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => scrollCast("right")}
                className="scroll-btn__right"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        <div className="player">
          <h1 className="player__header">Trailer</h1>
          <iframe
            className="video"
            src={movie?.url}
            sandbox="allow-scripts allow-downloads"
            title="YouTube video player"
            frameBorder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen="allowFullScreen" 
          ></iframe>
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
              slidesPerView={4}
              spaceBetween={10}
              centeredSlides={true}
              centeredSlidesBounds={true}
              setWrapperSize={true}
            >
              {Array(8)
                .fill()
                .map((_, index) => {
                  console.log(movie) 
                  return (
                  <SwiperSlide key={index}>
                    <img src={movie?.poster?.url} alt={`Similar Movie ${index + 1}`} />
                  </SwiperSlide>
                )})}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default Watch;

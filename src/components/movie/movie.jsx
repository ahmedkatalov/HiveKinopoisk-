import { useState, useRef } from "react";
import "./movie.css";
import Harry from "./imgs/harry-povar.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useLocation } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import { useDispatch, useSelector } from "react-redux";
import { addFavoriteMovie } from "../../redux/favoriteMovies";

function Watch() {
  const location = useLocation();
  const movie = location.state.movie;
  const [isExpanded, setIsExpanded] = useState(false);
  const favoriteMovies = useSelector(state => state.favorite.favoriteMovie)
  const isFav = favoriteMovies.find(item => movie.id === item.id)
  console.log(isFav)
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

  const fullText = movie.description;
  const shortText = fullText.slice(0, 200) + "...";

  return (
    <>
      <div className="wrapper">
        <div className="movie__about">
          <div className="movie__poster">
            <img
              src={movie.poster.url}
              alt="Постер с Поваром"
              className="poster"
            />
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
            <button type="button"></button>
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
                <span className="duration__time">{movie.movieLength}</span>
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
                  <img src={Harry} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">Дэниэл Редклифф</span>
                    <span className="character">Гарри Повар</span>
                  </div>
                </div>
                <div className="acter">
                  <img src={Harry} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">Дэниэл Редклифф</span>
                    <span className="character">Гарри Повар</span>
                  </div>
                </div>
                <div className="acter">
                  <img src={Harry} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">Дэниэл Редклифф</span>
                    <span className="character">Гарри Повар</span>
                  </div>
                </div>
                <div className="acter">
                  <img src={Harry} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">Дэниэл Редклифф</span>
                    <span className="character">Гарри Повар</span>
                  </div>
                </div>
                <div className="acter">
                  <img src={Harry} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">Дэниэл Редклифф</span>
                    <span className="character">Гарри Повар</span>
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
            src={movie.url}
            sandbox="allow-scripts allow-downloads"
            title="YouTube video player"
            frameBorder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen="allowFullScreen" // Corrected here
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
              slidesPerView={4.5}
              spaceBetween={-50}
              centeredSlides={true}
              centeredSlidesBounds={true}
              setWrapperSize={true}
            >
              <SwiperSlide>
                <img src={Harry} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Harry} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Harry} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Harry} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Harry} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Harry} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Harry} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Harry} alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default Watch;

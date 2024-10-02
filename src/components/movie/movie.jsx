import { useState, useRef, useEffect } from "react";
import "./movie.css";

import {  useParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import { useDispatch, useSelector } from "react-redux";
import { addFavoriteMovie } from "../../redux/favoriteMovies";
import { getMovieById } from "../../redux/currentMovie";

function Watch() {
  const [trailerUrl, setTrailerUrl] = useState(""); // Для хранения ссылки на трейлер
  const { id } = useParams();

 
  const movie = useSelector((state) => state.currentMovie.currentMovie);
  const favoriteMovies = useSelector((state) => state.favorite.favoriteMovie);
  const isFav = favoriteMovies.find((item) => movie?.id === item.id);
  const [isExpanded, setIsExpanded] = useState(false);
  const castRef = useRef(null);
  const dispatch = useDispatch();

  const addToFavMovie = (movie) => {
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

  useEffect(() => {
    if (movie?.name) {
      const fetchTrailer = async () => {
        try {
          const apiKey = "AIzaSyDpbOG6jX8DH_ypGVgiia3ObMR0C__8uJo"; // API-ключ
          const query = `${movie.name} trailer`;
          const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}&type=video&maxResults=1`;

          const response = await fetch(url);
          const data = await response.json();

          if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);
          }
        } catch (error) {
          console.error("Error fetching the trailer:", error);
        }
      };

      fetchTrailer();
    }
  }, [movie]);

  useEffect(() => {
    if (id) {
      dispatch(getMovieById(id));
    }
  }, [dispatch, id]);

  if (!movie?.name) {
    return null; // Если данных о фильме нет, ничего не отображаем
  }

  const handleNavigateToShow = () => {
    if (movie.watchability?.items?.[0]?.url) {
      window.open(movie.watchability.items[0].url);
    }
  };

  const fullText = movie?.description || "";
  const shortText = fullText.length > 200 ? fullText.slice(0, 200) + "..." : fullText;

  return (
    <>
      <div className="wrapper">
        <div className="movie__about">
          <div className="movie__poster">
            <img
              src={movie?.poster?.url}
              alt={movie?.name}
              className="poster"
            />
            <button type="button" className="poster__button" onClick={handleNavigateToShow}>
              Watch Now
            </button>
          </div>
          <div className="movie__text">
            <div className="movie__name">
              <h1>{`${movie?.name} - (${movie?.alternativeName})`}</h1>
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
                <span className="rate__number">⭐{movie?.rating?.imdb}</span>
              </div>
              <div className="genre">
                <span className="genre__header">Genre</span>
                <span className="genre__name">{movie?.genres?.[0]?.name}</span>
              </div>
              <div className="duration">
                <span className="duration__header">Duration</span>
                <span className="duration__time">{`${movie?.movieLength} m`}</span>
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
                {movie?.persons?.map((person, index) => (
                  <div className="acter" key={index}>
                    <img src={person.photo} alt={person.name} />
                    <div className="acter__about">
                      <span className="name">{person.name}</span>
                      <span className="character">{person.description}</span>
                    </div>
                  </div>
                ))}
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
          {trailerUrl ? (
            <iframe
              className="video"
              src={trailerUrl}
  
              title="YouTube video player"
              frameBorder="1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <p>No trailer available</p>
          )}
        </div>

      </div>
    </>
  );
}

export default Watch;

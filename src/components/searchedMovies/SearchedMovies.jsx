import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';
import { searchMoviesByName } from "../../redux/searchMovies";

import './SearchedMovies.css';

const SearchedMovies = () => {
    const { query } = useParams();
    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector((state) => state.movies);
    const [moviesToShow, setMoviesToShow] = useState(20);

    useEffect(() => {
        if (query) {
            dispatch(searchMoviesByName(query));
        }
    }, [query, dispatch]);

    if (loading) {
        return <p className='result'>Loading...</p>;
    }

    if (error) {
        return <p className='result'>{error}</p>;
    }

    const loadMoreMovies = () => {
        setMoviesToShow(moviesToShow + 10);
    };

    return (
        <div className='moviesList-container'>
            <h3 className='search-res'>Search Results for: {query}</h3>
            <div className="moviesList">
                {movies.length > 0 ? (
                    movies.slice(0, moviesToShow).map((movie) => (
                        <div key={movie.id} className="movie-item">
                            <NavLink to={`/movies/${movie.id}`} state={{movie: movie}}>
                                {movie.poster && (
                                    <img
                                        src={movie.poster.previewUrl}
                                        alt={movie.name}
                                        style={{ width: '100%' }}
                                    />
                                )}
                            </NavLink>
                        </div>
                    ))
                ) : (
                    <p className="film-not-found">Movies not found</p>
                )}
            </div>
            {moviesToShow < movies.length && (
                <button onClick={loadMoreMovies} className="load-more-btn">
                    Load More
                </button>
            )}
        </div>
    );
};

export default SearchedMovies;
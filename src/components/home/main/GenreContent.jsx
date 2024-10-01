import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGenre, clearGenre, fetchMoviesBySelectedGenre } from "../../../redux/genreMovie";

import "./Genre.index.css";
import { NavLink } from "react-router-dom";

export const GenreMovies = () => {
    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector(state => state.genre);
    const [activeGenre, setActiveGenre] = useState('');
    const [moviesToShow, setMoviesToShow] = useState(20);

    useEffect(() => {
        dispatch(fetchMoviesBySelectedGenre(''));
    }, [dispatch]);

    const handleGenreChange = (genre) => {
        setActiveGenre(genre);
        setMoviesToShow(20);
        
        if (genre) {
            dispatch(setGenre(genre)); 
            dispatch(fetchMoviesBySelectedGenre(genre));
        } else {
            dispatch(clearGenre()); 
            dispatch(fetchMoviesBySelectedGenre(''));
        }
    };

    const loadMoreMovies = () => {
        setMoviesToShow(moviesToShow + 10);
    };

 
    return (
        <div className="genreContainer">
            <div className="genreButtons">
                <button 
                    className={activeGenre === '' ? 'tapped' : ''}
                    onClick={() => handleGenreChange('')}
                >
                    All genres
                </button>
                <button 
                    className={activeGenre === 'комедия' ? 'tapped' : ''} 
                    onClick={() => handleGenreChange('комедия')}
                >
                    Comedy
                </button>
                <button 
                    className={activeGenre === 'боевик' ? 'tapped' : ''} 
                    onClick={() => handleGenreChange('боевик')}
                >
                    Action
                </button>
                <button 
                    className={activeGenre === 'фантастика' ? 'tapped' : ''} 
                    onClick={() => handleGenreChange('фантастика')}
                >
                    Fantasy
                </button>
                <button 
                    className={activeGenre === 'ужасы' ? 'tapped' : ''} 
                    onClick={() => handleGenreChange('ужасы')}
                >
                    Horror
                </button>
                <button 
                    className={activeGenre === 'драма' ? 'tapped' : ''} 
                    onClick={() => handleGenreChange('драма')}
                >
                    Drama
                </button>
                <button 
                    className={activeGenre === 'приключения' ? 'tapped' : ''} 
                    onClick={() => handleGenreChange('приключения')}
                >
                    Adventure
                </button>
                <button 
                    className={activeGenre === 'семейное' ? 'tapped' : ''} 
                    onClick={() => handleGenreChange('семейное')}
                >
                    Family
                </button>
                <button 
                    className={activeGenre === 'триллер' ? 'tapped' : ''} 
                    onClick={() => handleGenreChange('триллер')}
                >
                    Triller
                </button>
            </div>
                <div className="state">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                </div>
            <div className="grid" id="moviesList">
                {movies.length > 0 ? (
                    movies.slice(0, moviesToShow).map((movie) => (
                        <div key={movie.id} className="movie-item">
                            <NavLink to={`movies/${movie.id}`} state={{movie: movie}}>
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
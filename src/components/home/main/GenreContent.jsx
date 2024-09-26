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
                    className={activeGenre === '' ? 'active' : ''}
                    onClick={() => handleGenreChange('')}
                >
                    All genres
                </button>
                <button 
                    className={activeGenre === 'комедия' ? 'active' : ''} 
                    onClick={() => handleGenreChange('комедия')}
                >
                    Comedy
                </button>
                <button 
                    className={activeGenre === 'боевик' ? 'active' : ''} 
                    onClick={() => handleGenreChange('боевик')}
                >
                    Action
                </button>
                <button 
                    className={activeGenre === 'фантастика' ? 'active' : ''} 
                    onClick={() => handleGenreChange('фантастика')}
                >
                    Fantasy
                </button>
                <button 
                    className={activeGenre === 'ужасы' ? 'active' : ''} 
                    onClick={() => handleGenreChange('ужасы')}
                >
                    Horror
                </button>
                <button 
                    className={activeGenre === 'драма' ? 'active' : ''} 
                    onClick={() => handleGenreChange('драма')}
                >
                    Drama
                </button>
                <button 
                    className={activeGenre === 'приключения' ? 'active' : ''} 
                    onClick={() => handleGenreChange('приключения')}
                >
                    Adventure
                </button>
                <button 
                    className={activeGenre === 'семейное' ? 'active' : ''} 
                    onClick={() => handleGenreChange('семейное')}
                >
                    Family
                </button>
                <button 
                    className={activeGenre === 'триллер' ? 'active' : ''} 
                    onClick={() => handleGenreChange('триллер')}
                >
                    Triller
                </button>
            </div>
                <div className="state">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                </div>
            <div className="grid" id="moviesList">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id}>
                            <NavLink to={`movies/${movie.id}`}>
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

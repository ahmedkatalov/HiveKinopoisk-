import { useState, useEffect } from "react"; // Добавляем useState и useEffect
import { useDispatch, useSelector } from "react-redux";
import { setGenre, clearGenre, fetchMoviesBySelectedGenre } from "../../../redux/genreMovie"; // Импортируем действия
import "./Genre.index.css";

export const GenreMovies = () => {
    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector(state => state.genre);
    const [activeGenre, setActiveGenre] = useState(''); // Добавляем состояние для активного жанра

    //me
    const [moviesToShow, setMoviesToShow] = useState(20);
    //me
    // Логика для загрузки всех фильмов при первом рендере
    useEffect(() => {
        dispatch(fetchMoviesBySelectedGenre('')); // Загрузка всех фильмов по умолчанию
    }, [dispatch]);

    const handleGenreChange = (genre) => {
        setActiveGenre(genre); // Устанавливаем активный жанр
        //me
        setMoviesToShow(20);
        //me
        if (genre) {
            dispatch(setGenre(genre)); 
            dispatch(fetchMoviesBySelectedGenre(genre)); // Используем fetchMoviesBySelectedGenre
        } else {
            dispatch(clearGenre()); 
            dispatch(fetchMoviesBySelectedGenre('')); // Получение всех фильмов, если жанр очищен
        }
    };
    //me
    const loadMoreMovies = () => {
        setMoviesToShow(moviesToShow + 10); // Увеличиваем количество отображаемых фильмов на 10
    };
    //me

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
                    movies.slice(0, moviesToShow).map((movie) => (
                        <div className="movie-item"
                        key={movie.id}>
                            {movie.poster && (
                                <img
                                    src={movie.poster.previewUrl}
                                    alt={movie.name}
                                    style={{ width: '100%' }}
                                />
                            )}
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

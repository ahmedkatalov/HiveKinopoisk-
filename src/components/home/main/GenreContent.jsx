import { useState, useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { setGenre, clearGenre, fetchMoviesBySelectedGenre } from "../../../redux/genreMovie"; 
import "./Genre.index.css";
import { NavLink } from "react-router-dom";

export const GenreMovies = () => {
    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector(state => state.genre);
    const [activeGenre, setActiveGenre] = useState(''); // Добавляем состояние для активного жанра

    // для загрузки всех фильмов при первом рендере
    useEffect(() => {
        dispatch(fetchMoviesBySelectedGenre('')); // Загрузка всех фильмов по умолчанию
    }, [dispatch]);

    const handleGenreChange = (genre) => {
        setActiveGenre(genre); // Устанавливаем активный жанр
        if (genre) {
            dispatch(setGenre(genre)); 
            dispatch(fetchMoviesBySelectedGenre(genre)); 
        } else {
            dispatch(clearGenre()); 
            dispatch(fetchMoviesBySelectedGenre('')); // Получение всех фильмов, если жанр очищен
        }
    };

    return (
        <div className="genreContainer">
            <div className="genreButtons">
                <button 
                    className={activeGenre === '' ? 'active' : ''} 
                    onClick={() => handleGenreChange('')}
                >
                    Все жанры
                </button>
                <button 
                    className={activeGenre === 'комедия' ? 'active' : ''} 
                    onClick={() => handleGenreChange('комедия')}
                >
                    Комедия
                </button>
                <button 
                    className={activeGenre === 'боевик' ? 'active' : ''} 
                    onClick={() => handleGenreChange('боевик')}
                >
                    Боевик
                </button>
                <button 
                    className={activeGenre === 'фантастика' ? 'active' : ''} 
                    onClick={() => handleGenreChange('фантастика')}
                >
                    Фантастика
                </button>
                <button 
                    className={activeGenre === 'ужасы' ? 'active' : ''} 
                    onClick={() => handleGenreChange('ужасы')}
                >
                    Ужасы
                </button>
                <button 
                    className={activeGenre === 'драма' ? 'active' : ''} 
                    onClick={() => handleGenreChange('драма')}
                >
                    Драма
                </button>
                <button 
                    className={activeGenre === 'приключения' ? 'active' : ''} 
                    onClick={() => handleGenreChange('приключения')}
                >
                    Приключения
                </button>
                <button 
                    className={activeGenre === 'семейное' ? 'active' : ''} 
                    onClick={() => handleGenreChange('семейное')}
                >
                    Семейное
                </button>
                <button 
                    className={activeGenre === 'триллер' ? 'active' : ''} 
                    onClick={() => handleGenreChange('триллер')}
                >
                    Триллер
                </button>
            </div>
                <div className="state">
                {loading && <p>Загрузка...</p>}
                {error && <p>Ошибка: {error}</p>}
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
                    <p>Фильмы не найдены</p>
                )}
            </div>
        </div>
    );
};

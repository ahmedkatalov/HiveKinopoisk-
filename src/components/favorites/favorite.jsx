import { useSelector } from 'react-redux';
import './favorite.css';
import { NavLink } from 'react-router-dom';


export function FavoriteList() {
  const movies = useSelector((state) => state.favorite.favoriteMovie || []);

  return (
    <div className="favorite__movies">
      <div className="favorite__grid" id="moviesList">
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <NavLink to={`/movies/${movie.id}`} state={{ movie: movie }}>
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
          <p className='NoFavs'>Здесь пусто... Даже слишком....</p>
        )}
      </div>

    </div>
  );
}

export default FavoriteList;

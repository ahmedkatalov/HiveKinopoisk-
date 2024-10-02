import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';  
import './Header.css';
import search from '../../assets/search.svg';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');  // Для поиска
    const [user, setUser] = useState(null);  
    const navigate = useNavigate();  

   
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

   
        return () => unsubscribe();
    }, []);

   
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Обработка поиска
    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');  // Очистка поля поиска после отправки
        }
    };

    // Обработка нажатия клавиши Enter для поиска
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Функция выхода из учетной записи


    return (
        <header className="header-box">
            <div className="header-content">
                <h2 className="headline">
                    <span className="letter">M</span>
                    <span className="h2-outstanding-letters">o</span>
                    <span className="h2-outstanding-letters">o</span>
                    <span className="letter">v</span>
                    <span className="letter">i</span>
                    <span className="letter">e</span>
                </h2>
                
                {/* Поисковая строка */}
                <div className="input-container">
                    <input
                        className="input-search"
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="search-svg" onClick={handleSearch}>
                        <img className="search-svg" src={search} alt="search" />
                    </button>
                </div>

                {/* Навигационные ссылки */}
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? 'h-link-on' : 'h-link')}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/favoriteList"
                    className={({ isActive }) => (isActive ? 'h-link-on' : 'h-link')}
                >
                    MyList
                </NavLink>
                {user ? (
                    <NavLink className="sign-in-btn" to="/profile">
                        {user.displayName || 'Sign out'} {/* Отображаем имя пользователя или текст 'Sign out' */}
                    </NavLink>
                ) : (
                    <NavLink to="/user-date-container/*" className="sign-in-btn">
                        Sign in
                    </NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import './Header.css';
import search from '../../assets/search.svg';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
 
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
                <div className="input-container">
                    <input className="input-search" 
                        type="text" 
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown} 
                    />
                    <button className='search-svg' onClick={handleSearch}>
                        <img className='search-svg' src={search} alt="search.svg" />
                    </button>
                </div>
                <NavLink to="/" 
                         className={({ isActive }) => 
                         isActive ? 'h-link-on' : 'h-link'}>
                         Home
                </NavLink>
                <NavLink to="/favoriteList" 
                         className={({ isActive }) => 
                         isActive ? 'h-link-on' : 'h-link'}>
                         MyList
                </NavLink>
               
                <NavLink to="user-date-container/*" className="sign-in-btn" type="button">
                        Sign in
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
import './Header.css';

const Header = () => {
    return (
        <header className="header-box">
            <div className="header-content">
                <h2 className="headline">M<span className="h2-outstanding-letters">oo</span>vie</h2>
                <input className="input-search" type="text" placeholder="Search" />
                <a href='' className="h-link">Home</a>
                <a className="h-link">My list</a>
                <button className="sign-in-btn" type="button">Sign in</button>
            </div>
        </header>
    );
};

//sending stuff again

export default Header;
// src/Home.jsx
import { NavLink } from 'react-router-dom';

const HomeAuth = () => {
  return (
    <div>
      <h2>Welcome</h2>
      <p>Do you already have an account?</p>
      <div>
        {/* Навигация на страницы логина и регистрации */}
        <NavLink to="/user-date-container/login"><button>Login</button></NavLink>
        <NavLink to="/user-date-container/register"><button>Register</button></NavLink>
      </div>
    </div>
  );
};

export default HomeAuth;
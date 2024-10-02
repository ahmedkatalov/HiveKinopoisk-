// src/ContainerForDate.jsx

import { NavLink } from 'react-router-dom';
// Компонент с выбором регистрации или логина

export const ContainerForDate = () => {
  return (
    <div className="container">
      <h3>User Authentication</h3>
      <NavLink to="/login"><button>Login</button></NavLink>
      <NavLink to="/register"><button>Register</button></NavLink>

    </div>
  );
};

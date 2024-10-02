// src/ContainerForDate.jsx

import { NavLink } from 'react-router-dom';
// Компонент с выбором регистрации или логина

import './Container.css';

export const ContainerForDate = () => {
  return (
    <div className="container-for-user-auth">
      <h3 className='user-a-style'>User Authentication</h3>
      <div className='log-reg-btns'>
        <NavLink to="/login"><button className='login-btn'>Login</button></NavLink>
        <NavLink to="/register"><button className='reg-btn'>Register</button></NavLink>
      </div>

    </div>
  );
};
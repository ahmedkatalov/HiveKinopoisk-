// src/Login.jsx
import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile'); // Перенаправление на страницу профиля
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='container-for-login-form'>
      <h2 className='log-in-title'>Login</h2>
      <form className='login-form'
        onSubmit={handleLogin}>
        <input  className='login-input-email' 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
        />
        <input  className='login-input-password' 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
        />
        <button className='login-form-btn'
                type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p className='login-have-an-acc-text'>Do you already have an account? <NavLink to="/register">Register</NavLink></p>
    </div>
  );
};

export default Login;

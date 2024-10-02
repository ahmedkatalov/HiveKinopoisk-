// src/Register.jsx
import { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate('/profile'); // Перенаправление на страницу профиля
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Account with this email already exists. Please log in.');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className='reg-form-container'>
      <h2 className='reg-form-title'>Register</h2>
      <form className='reg-form'
            onSubmit={handleRegister}>
        <input  className='reg-input-name'
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
        />
        <input  className='reg-input-email' 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
        />
        <input  className='reg-input-password' 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
        />
        <button className='reg-form-btn'
                type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p className='reg-have-an-acc-text'>Already have an account? <NavLink to="/login">Log in</NavLink></p>
    </div>
  );
};

export default Register;

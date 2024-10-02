// src/Profile.jsx
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/user-date-container'); // Перенаправление на user-date-container, который отобразит HomeAuth
    }).catch((error) => {
      console.error("Logout error: ", error);
    });
  };

  // Проверка на наличие пользователя
  if (!user) {
    navigate('/login'); // Если пользователя нет, перенаправляем на страницу логина
    return null; // Возвращаем null, чтобы предотвратить дальнейший рендер
  }

  return (
    <div className='got-profile-yey'>
      <h2 className='profile-title'>Profile</h2>
      <p className='profile-name'><strong>Name:</strong> {user.displayName}</p>
      <p className='profile-email'><strong>Email:</strong> {user.email}</p>
      <button className='profile-btn' onClick={handleLogout}>Logout</button> {/* Кнопка для выхода из аккаунта */}
    </div>
  );
};

export default Profile;
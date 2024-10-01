// src/Profile.jsx
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

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
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.displayName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleLogout}>Logout</button> {/* Кнопка для выхода из аккаунта */}
    </div>
  );
};

export default Profile;

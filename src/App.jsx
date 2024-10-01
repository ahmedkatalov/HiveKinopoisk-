// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from "./components/MainLayout";
import HomePage from "./pages/Home"; // Главная страница
import Watch from "./components/movie/movie";
import { ContainerForDate } from "./components/userDate/ContainerForDate";
import SearchedMovies from "./components/searchedMovies/SearchedMovies";
import Login from './components/userDate/Login';
import FavoriteList from './components/favorites/favorite';
import Register from './components/userDate/Register';
import Profile from './components/userDate/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="movies/:id" element={<Watch />} />
        {/* Вложенные маршруты для ContainerForDate */}
        <Route path="user-date-container/*" element={<ContainerForDate />} />
        <Route path="/favoriteList" element={<FavoriteList />} />
        <Route path="search/:query" element={<SearchedMovies />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;

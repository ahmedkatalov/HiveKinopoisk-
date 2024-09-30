import { createSlice } from "@reduxjs/toolkit";

// Функция для загрузки данных из localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("favoriteMovies"); // Поправил ключ для консистентности
    if (serializedState === null) {
      return []; // Если данных нет, вернуть пустой массив
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load favorite movies from localStorage", err);
    return [];
  }
};

// Функция для сохранения данных в localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("favoriteMovies", serializedState); // Поправил ключ
  } catch (err) {
    console.error("Could not save favorite movies to localStorage", err);
  }
};

// Инициализация состояния из localStorage
let initialState = {
  favoriteMovie: loadFromLocalStorage(), // Загружаем избранные фильмы из localStorage
};

const favoriteMovies = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavoriteMovie: (state, action) => {
      const exists = state.favoriteMovie.find((m) => m.id === action.payload.id);
      console.log(exists)
      if (exists) {
        // Если фильм уже есть, удаляем его
        state.favoriteMovie = state.favoriteMovie.filter((m) => m.id !== action.payload.id);
      } else {
        // Если фильма нет, добавляем его
        state.favoriteMovie.push(action.payload);
      }

      // Сохраняем обновленное состояние в localStorage после каждого изменения
      saveToLocalStorage(state.favoriteMovie);
    },
  },
});

// Экспортируем action и редьюсер
export const { addFavoriteMovie } = favoriteMovies.actions;
export default favoriteMovies.reducer;

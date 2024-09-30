import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import HomePage from "./pages/Home";
import Watch from "./components/movie/movie";
import SearchedMovies from "./components/searchedMovies/SearchedMovies";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="movies/:id" element={<Watch/>} />
        <Route path="search/:query" element={<SearchedMovies />} />
      </Route>
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import HomePage from "./pages/Home";
import Watch from "./components/movie/movie";
import { FavoriteList } from "./components/favorites/favorite";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="movies/:id" element={<Watch />} />
        <Route path="my-list" element={<FavoriteList />} />
      </Route>
    </Routes>
  );
}

export default App;

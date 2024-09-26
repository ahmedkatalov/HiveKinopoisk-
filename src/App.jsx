import { Routes, Route } from "react-router-dom";
import { MainLayout, } from "./components/MainLayout";
import HomePage from "./pages/Home";
import Watch from "./components/movie/movie";


function App() {
  return (
    <Routes>
      {/* <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} /> */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="movies/:id" element={<Watch/>} />
      </Route>
    </Routes>
  );
}

export default App;
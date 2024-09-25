import Watch from "./components/movie"


import Header from './components/pages/header/header';
import CustomCarousel from './components/pages/home/main/Carousel';
import { GenreMovies } from './components/pages/home/main/GenreContent';
import Footer from './components/pages/home/footer/Footer';

function App() {

  return (
    <div className='mainContainer'>
      <Watch />
      <Header/>
      <CustomCarousel/>
      <GenreMovies/>
      <Footer/>
    </div>
  )
}

export default App

import Header from './components/pages/header/header';
import CustomCarousel from './components/pages/home/main/Carousel';
import { GenreMovies } from './components/pages/home/main/GenreContent';
function App() {

  return (
    <div className='mainContainer'>
      <Header/>
      <CustomCarousel/>
      <GenreMovies/>
    </div>
  )
}

export default App

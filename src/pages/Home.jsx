

import CustomCarousel from '../components/home/main/Carousel';
import { GenreMovies } from '../components/home/main/GenreContent';


function HomePage() {

  return (
    <div className='mainContainer'>
      <CustomCarousel/>
      <GenreMovies/>
    </div>
  )
}

export default HomePage

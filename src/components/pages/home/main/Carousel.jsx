import { useState, useEffect } from 'react';
import './carousel.css';
import image from '../../../../assets/img.jpg';
import img1 from '../../../../assets/img1.jpg';
import img2 from '../../../../assets/img2.jpg';
import img3 from '../../../../assets/img3.jpg';
import star from '../../../../assets/star.svg';

const slides = [
  {
    image: image,
    title: "Maleficent: Mistress of Evil",
    rating: "6.6 2019 | Movie | 2.18hrs",
    description: "The story of Disney's most iconic villain continues in Maleficent: Mistress of Evil.",
  },
  {
    image: img1,
    title: "Deadpool & Wolverine",
    rating: "8.0 2024 | Movie | 2.7hrs",
    description: "Deadpool & Wolverine is a 2024 American superhero film based on Marvel Comics featuring the characters Deadpool and Wolverine.",
  },
  {
    image: img2,
    title: "Lalaland",
    rating: "8.0 2016 | Movie | 2.27hrs",
    description: "Career aspirations run up against bittersweet romance in modern-day Los Angeles, as two artists face a heartbreaking dilemma. ",
  },
  {
    image: img3,
    title: "Harry Potter and the Philosopher's Stone",
    rating: "7.6 2002 | Movie | 2.32hrs",
    description: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
  },
];

function CustomCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='main-container'>
        <div className="carousel">
            <div className="carousel-container">

                <button className="carousel-button prev" onClick={prevSlide}>
                    &#10094;
                </button>

                <div
                  className="carousel-slide"
                  style={{ backgroundImage: `url(${slides[currentIndex].image})` }}>
                  <div className="carousel-caption">
                    <h3>{slides[currentIndex].title}</h3>
                    <p className='rating'>
                        <img className='star' src= {star} alt="star-icon" />
                        {slides[currentIndex].rating}
                    </p>
                    <p className='description'>{slides[currentIndex].description}</p>
                    <div className='buttons'>
                        <button className='watch-btn'>Watch now</button>
                        <button className='watch-btn'>Add To Favourits</button>
                    </div>
                  </div>
                </div>

                <button className="carousel-button next" onClick={nextSlide}>
                    &#10095;
                </button>
            </div>
        </div>
        <div className="carousel-indicators">
            {slides.map((_, index) => (
            <span
                key={index}
                className={`indicator ${currentIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
            />
            ))}
        </div>
    </div>
  );
}

export default CustomCarousel;
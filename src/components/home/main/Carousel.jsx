import { useState, useEffect } from "react";

import "./Carousel.css";
import image from "../../../assets/img.jpg";
import img1 from "../../../assets/img1.jpg";
import img2 from "../../../assets/img2.jpg";
import img3 from "../../../assets/img3.jpg";
import star from "../../../assets/star.svg";

const slides = [
  {
    image: image,
    title: "Maleficent: Mistress of Evil",
    rating: "6.6 2019 | Movie | 2.18hrs",
    description:
      "The story of Disney's most iconic villain continues in Maleficent: Mistress of Evil.",
    link: "https://inoriginal.net/films/292-maleficent-mistress-of-evil-2019.html",
  },
  {
    image: img1,
    title: "Avengers: Endgame",
    rating: "8.4 2019 | Movie | 3.1hrs",
    description:
      "The surviving members of the Avengers team and their allies must devise a new plan to counter the destructive actions of the powerful titan Thanos.",
    link: "https://inoriginal.net/films/78-avengers-endgame-2019.html",
  },
  {
    image: img2,
    title: "Despicable Me 4",
    rating: "6.3 2024 | Movie | 1.34hrs",
    description:
      "In the fourth installment, Gru and the minions face a new villain. Continuation of the adventures of the funny yellow creatures.",
    link: "https://inoriginal.net/films/4626-despicable-me-4-2024.html",
  },
  {
    image: img3,
    title: "Harry Potter and the Philosopher's Stone",
    rating: "7.6 2001 | Movie | 2.32hrs",
    description:
      "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
    link: "https://inoriginal.net/films/189-harry-potter-and-the-sorcerer-s-stone-2001.html",
  },
];

const CustomCarousel = () => {
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
    <div className="main-container">
      <div className="carousel">
        <div className="carousel-container">
          <button className="carousel-button prev" onClick={prevSlide}>
            &#10094;
          </button>

          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
          >
            <div className="carousel-caption">
              <h3>{slides[currentIndex].title}</h3>
              <p className="rating">
                <img className="star" src={star} alt="star-icon" />
                {slides[currentIndex].rating}
              </p>
              <p className="description">{slides[currentIndex].description}</p>
              <div className="buttons">
                <a href= {slides[currentIndex].link} target="_blank" rel="noopener noreferrer">
                  <button className="watch-btn">Watch now</button>
                </a>
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
            className={`indicator ${currentIndex === index ? "i-active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
import { useState, useRef } from "react";
import "./movie.css";
import posterPotter from "./imgs/Harry-Potter.png";
import Harry from "./imgs/harry-povar.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules'


import 'swiper/css';
import 'swiper/css/navigation';




function Watch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const castRef = useRef(null);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const scrollCast = (direction) => {
    if (castRef.current) {
      castRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const fullText = `Во время ссоры с родственниками герой случайно отправляет опекуншу 
      летать над просторами Англии. Уходит, добирается до Косого переулка 
      автобусом «Ночной рыцарь», обслуживающим волшебников, попавших в беду… 
      В разговоре с министром магии герой получает информацию о побеге из заклчюения 
      Сириуса Блэка – волшебника, из-за предательства которого погибли родители. 
      Преступник намерен расправиться с ним. Школу от проникновения Сириуса Блэка защищают, 
      разместив по периметру дементоров – жутких стражей, способных оставить жертву без надежды. 
      Блэк, как становится известным, дружил с отцом Поттера. В школе работает профессор Люпин, 
      который тоже был вхож в дом родителей`;

  const shortText = fullText.slice(0, 460) + "...";

  return (
    <>
      <div className="wrapper">
        <div className="movie__about">
          <div className="movie__poster">
            <img src={posterPotter} alt="Постер с Поваром" className="poster" />
            <button type="button" className="poster__button">
              Watch Now
            </button>
          </div>
          <div className="movie__text">
            <h1 className="movie__name">Гарри Поттер и узник Азкабана</h1>
            <div className="movie__info">
              <div className="rate">
                <span className="rate__header">Rate</span>
                <span className="rate__number">⭐8/10</span>
              </div>
              <div className="genre">
                <span className="genre__header">Genre</span>
                <span className="genre__name">Fantasy</span>
              </div>
              <div className="duration">
                <span className="duration__header">Duration</span>
                <span className="duration__time">2h 30m</span>
              </div>
            </div>
            <div className="text">
              {isExpanded ? fullText : shortText}{" "}
              <button onClick={toggleText} className="read-more-btn">
                {isExpanded ? "Show less" : "Read more"}{" "}
              </button>
            </div>
            <div className="cast__about">
              <h3>Cast</h3>
              <button
                onClick={() => scrollCast("left")}
                className="scroll-btn__left"
              >
                ◀
              </button>
              <div className="movie__cast" ref={castRef}>
                <div className="acter">
                  <img src={Harry} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">Дэниэл Редклифф</span>
                    <span className="character">Гарри Повар</span>
                  </div>
                </div>
                <div className="acter">
                  <img src={Harry} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">Дэниэл Редклифф</span>
                    <span className="character">Гарри Повар</span>
                  </div>
                </div>
                <div className="acter">
                  <img src={Harry} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">Дэниэл Редклифф</span>
                    <span className="character">Гарри Повар</span>
                  </div>
                </div>
                <div className="acter">
                  <img src={Harry} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">Дэниэл Редклифф</span>
                    <span className="character">Гарри Повар</span>
                  </div>
                </div>
                <div className="acter">
                  <img src={Harry} alt="гарри повар" />
                  <div className="acter__about">
                    <span className="name">Дэниэл Редклифф</span>
                    <span className="character">Гарри Повар</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => scrollCast("right")}
                className="scroll-btn__right"
              >
                ▶
              </button>
            </div>
          </div>
        </div>
        <div className="player">
          <h1 className="player__header">Trailer</h1>
          <iframe
            className="video"
            src="https://www.youtube.com/embed/VwErvYgoH70?si=4yVZndSprgk__1YU"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen = "allowfullscreen"
          ></iframe>
        </div>
        <div className="similar">
          <div className="similar__header">
            <h1>Similar</h1>
            <a href="">View all</a>
          </div>
          <div className="similar__cards">

            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              slidesPerView={4.5}
              spaceBetween={-50}
              centeredSlides={true}
              centeredSlidesBounds={true}
              setWrapperSize={true}
            >
              <SwiperSlide><img src={Harry} alt="" /></SwiperSlide>
              <SwiperSlide><img src={Harry} alt="" /></SwiperSlide>
              <SwiperSlide><img src={Harry} alt="" /></SwiperSlide>
              <SwiperSlide><img src={Harry} alt="" /></SwiperSlide>
              <SwiperSlide><img src={Harry} alt="" /></SwiperSlide>
              <SwiperSlide><img src={Harry} alt="" /></SwiperSlide>
              <SwiperSlide><img src={Harry} alt="" /></SwiperSlide>
              <SwiperSlide><img src={Harry} alt="" /></SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default Watch;

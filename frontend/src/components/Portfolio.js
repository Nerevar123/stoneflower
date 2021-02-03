import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowRight from "../images/slider/ArrowRight.svg";
import arrowLeft from "../images/slider/ArrowLeft.svg";
import useWindowSize from "../hooks/useWindowSize";

function Portfolio({ content, showModal, isModalWithCarouselOpen }) {
  const window = useWindowSize();

  function handleImageClick(evt) {
    showModal(evt.target.id, content);
  }
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
        {!isModalWithCarouselOpen && window.width > 849 && (
          <img
            className={className}
            src={arrowRight}
            alt="Иконка"
            style={{ ...style, width: "65px", height: "56px", right: "-60px" }}
            onClick={onClick}
          />
        )}
      </>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
        {!isModalWithCarouselOpen && window.width > 849 && (
          <img
            className={className}
            src={arrowLeft}
            alt="Иконка"
            style={{ ...style, width: "65px", height: "56px", left: "-60px" }}
            onClick={onClick}
          />
        )}
      </>
    );
  }

  const settings = {
    className: "portfolio__carousel",
    dots: false,
    infinite: true,
    initialSlide: 0,
    speed: 500,
    slidesToShow: 1,
    centerMode: window.width > 849 ? true : false,
    variableWidth: true,
    adaptiveHeight: true,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    accessibility: false,
    draggable: false,
  };

  return (
    <article className="portfolio">
      <h2 className="content__title content__title_place_portfolio">
        Портфолио
      </h2>
      <div className="portfolio__slider-container">
        <Slider {...settings}>
          {content &&
            content.map((item) => (
              <div key={item._id} className="portfolio__slide">
                <img
                  key={item._id}
                  alt="img"
                  id={item._id}
                  src={item.image}
                  className="portfolio__image"
                  draggable="false"
                  onClick={handleImageClick}
                />
              </div>
            ))}
        </Slider>
      </div>
    </article>
  );
}

export default Portfolio;

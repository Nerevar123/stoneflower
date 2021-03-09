import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import arrowRight from "../images/slider/ArrowRight.svg";
import arrowLeft from "../images/slider/ArrowLeft.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PortfolioItem({
  content,
  previewContent,
  showModal,
  isModalWithCarouselOpen,
  previewMode,
}) {
  console.log(previewContent);
  const size = useWindowSize();
  const [item, setItem] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [textExpanded, setTextExpanded] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (content && params.itemId) {
      const selectedElement = content.find((el) => el._id === params.itemId);

      setItem(selectedElement);
    } else if (previewContent) setItem(previewContent);
  }, [content, params, previewContent]);

  useEffect(() => {
    if (item) {
      setPhotos(item.photos);
    }
  }, [item]);

  function handleTextExpand() {
    setTextExpanded(!textExpanded);
  }

  function handleImageClick(evt, item) {
    if (!previewMode) {
      showModal(evt.target.id, item);
    }
  }

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
        {!isModalWithCarouselOpen && size.width > 849 && (
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
        {!isModalWithCarouselOpen && size.width > 849 && (
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
    dots: true,
    infinite: true,
    initialSlide: 0,
    speed: 500,
    slidesToShow: 1,
    centerMode: size.width > 849 ? true : false,
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
      {item && (
        <>
          <h2 className="content__title content__title_place_portfolio">
            {item.title}
          </h2>
          <div className="portfolio__slider-container">
            <Slider {...settings}>
              {photos &&
                photos.map((element) => (
                  <div key={element._id} className="portfolio__slide">
                    <img
                      alt="Слайд портфолио"
                      id={element._id}
                      src={
                        element.image.path
                          ? process.env.REACT_APP_URL + element.image.path
                          : element.image
                      }
                      className="portfolio__image"
                      draggable="false"
                      onClick={(evt) => {
                        handleImageClick(evt, item);
                      }}
                    />
                  </div>
                ))}
            </Slider>
          </div>
          <div className="content__text-container content__text-container_place_advices">
            <button
              onClick={handleTextExpand}
              className={`advices__link link ${textExpanded ? "open" : ""}`}
            >
              <span className="link__accent">Описание объекта</span>
              <div className="link__expand-arrow link__expand-arrow_place_portfolio"></div>
            </button>
            <div
              className={`content__expand-container ${
                textExpanded ? "content__expand-container_opened" : ""
              }`}
            >
              <p className="content__text content__text_place_portfolio">
                {item.text}
              </p>
            </div>
          </div>
        </>
      )}
    </article>
  );
}

export default PortfolioItem;

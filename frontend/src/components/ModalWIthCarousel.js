import React from "react";
import Modal from "./Modal";
import useWindowSize from "../hooks/useWindowSize";
import arrowRight from "../images/slider/ArrowRight.svg";
import arrowLeft from "../images/slider/ArrowLeft.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ModalWithCarousel({
  closeModal,
  initialSlide,
  content,
  isModalWithCarouselOpen,
}) {
  function getFocus() {
    const el = document.querySelector(".modal__image-container");
    el.focus();
  }
  const numSlide = content.photos.findIndex((item) => {
    return item._id === initialSlide;
  });
  const size = useWindowSize();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
    adaptiveHeight: true,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    accessibility: true,
    draggable: true,
    initialSlide: numSlide,
  };

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
        {size.width > 849 ? (
          <img
            className={className}
            src={arrowRight}
            alt="Иконка"
            style={{
              ...style,
              width: "65px",
              height: "56px",
              right: "-75px",
              filter: "brightness(0) invert(1)",
            }}
            onClick={onClick}
          />
        ) : (
          <></>
        )}
      </>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
        {size.width > 849 ? (
          <img
            className={className}
            src={arrowLeft}
            alt="Иконка"
            style={{
              ...style,
              width: "65px",
              height: "56px",
              left: "-75px",
              filter: "brightness(0) invert(1)",
            }}
            onClick={onClick}
          />
        ) : (
          <></>
        )}
      </>
    );
  }

  const handleClose = (evt) => {
    evt.target.closest(".modal").classList.remove("modal_visible");
    closeModal();
  };

  return (
    <Modal
      closeModal={closeModal}
      isModalWithCarouselOpen={isModalWithCarouselOpen}
      carousel={true}
      children={
        <>
          <div onClick={handleClose} className="modal__overlay"></div>
          <div className="modal__slider-container">
            <button
              onClick={handleClose}
              className="modal__close-button button modal__close-button_place_carousel"
            ></button>

            <Slider {...settings} className="modal__slider">
              {content &&
                content.photos.map((item) => (
                  <div
                    key={item._id}
                    className="modal__image-container"
                    onLoad={() => {
                      getFocus();
                    }}
                  >
                    <img
                      key={item._id}
                      alt="Слайд портфолио"
                      id={item._id}
                      src={
                        item.image.path
                          ? process.env.REACT_APP_URL + item.image.path
                          : item.image
                      }
                      className="modal__image"
                      draggable="false"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </>
      }
    />
  );
}
export default ModalWithCarousel;

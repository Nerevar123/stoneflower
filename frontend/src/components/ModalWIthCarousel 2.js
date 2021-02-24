import React from "react";
import Modal from "./Modal";
import useWindowSize from "../hooks/useWindowSize";
import arrowRight from "../images/slider/ArrowRight.svg";
import arrowLeft from "../images/slider/ArrowLeft.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Keyboard,
} from "swiper";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Keyboard]);

function ModalWithCarousel({ closeModal, initialSlide, content }) {
  const size = useWindowSize();

  function handleClose() {
    closeModal();
  }

  const slide = parseInt(initialSlide);

  return (
    <Modal
      closeModal={closeModal}
      carousel={true}
      children={
        <>
          <div onClick={handleClose} className="modal__overlay"></div>
          <div className="modal__slider-container">
            {size.width > 849 && (
              <button
                onClick={handleClose}
                className="modal__close-button button modal__close-button_place_carousel"
              ></button>
            )}
            {/* <Slider {...settings}>
            {content &&
              content.map((item) => (

                  <img
                    key={item._id}
                    alt="img"
                    id={item._id}
                    src={item.image}
                    className="modal__image"
                    draggable="false"
                  />
              ))}
          </Slider> */}
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              loop={true}
              centeredSlides={true}
              centeredSlidesBounds={true}
              slidesOffsetBefore={1}
              updateOnImagesReady={true}
              initialSlide={slide}
              cssMode={true}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              keyboard={{
                enabled: true,
                onlyInViewport: false,
              }}
            >
              {content &&
                content.map((item) => (
                  <SwiperSlide key={item._id}>
                    <img
                      // onLoad={invert}
                      key={item._id}
                      alt="img"
                      id={item._id}
                      src={item.image}
                      className="modal__image"
                      draggable="false"
                    />
                  </SwiperSlide>
                ))}
              {content &&
                content.map((item) => (
                  <SwiperSlide key={item._id}>
                    <img
                      // onLoad={invert}
                      key={item._id}
                      alt="img"
                      id={item._id}
                      src={item.image}
                      className="modal__image"
                      draggable="false"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <img
            className="swiper-button swiper-button-prev"
            src={arrowLeft}
            alt="Иконка"
            style={{
              width: "65px",
              height: "56px",
              left: "60px",
              outline: "none",
              filter: "brightness(0) invert(1)",
            }}
          />

          <img
            className="swiper-button swiper-button-next"
            src={arrowRight}
            alt="Иконка"
            style={{
              width: "65px",
              height: "56px",
              right: "60px",
              outline: "none",
              filter: "brightness(0) invert(1)",
            }}
          />
        </>
      }
    />
  );
}
export default ModalWithCarousel;

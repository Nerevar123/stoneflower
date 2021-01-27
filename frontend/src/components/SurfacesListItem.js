import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrow_left from "../images/icons/surfaces_arrow_left.svg";
import arrow_right from "../images/icons/surfaces_arrow_right.svg";
import useWindowSize from "../hooks/useWindowSize";
// import { Link } from "react-scroll";

function SurfacesListItem(props) {
  const window = useWindowSize();
  const [mouseIn, setMouseIn] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const itemId = props.item._id.toString();

  useEffect(() => {
    if (
      window.width > 849 &&
      props.selectedMaterial &&
      props.selectedMaterial === itemId
    ) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [itemId, props.selectedMaterial, window.width]);

  function toggleSliderOpen() {
    if (window.width < 849) {
      setIsSliderOpen(!isSliderOpen);
    }
  }
  function handleHoverEvent() {
    if (window.width > 849) {
      setMouseIn(!mouseIn);
    }
  }

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
        <img
          className={className}
          src={arrow_right}
          alt="Иконка"
          style={{
            ...style,
            width: "60px",
            height: "60px",
            right: "-5px",
            top: "45%",
          }}
          onClick={onClick}
        />
      </>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
        <img
          className={className}
          src={arrow_left}
          alt="Иконка"
          style={{
            ...style,
            width: "60px",
            height: "60px",
            left: "-5px",
            zIndex: "1",
            top: "45%",
          }}
          onClick={onClick}
        />
      </>
    );
  }
  const settings = {
    className: "surfaces__carousel",
    dots: false,
    infinite: true,
    initialSlide: 0,
    speed: 500,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
    adaptiveHeight: true,
    slidesToScroll: 1,
    accessibility: false,
    draggable: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <div
        className="surfaces__link surfaces__link_place_list"
        onClick={toggleSliderOpen}
        onMouseEnter={handleHoverEvent}
        onMouseLeave={handleHoverEvent}
      >
        <div className="surfaces__image-container">
          <img
            src={props.image}
            alt="Картинка"
            className="surfaces__image surfaces__image_main"
          />
          <div
            className={`surfaces__overlay ${
              mouseIn ? "surfaces__overlay_visible" : ""
            }`}
          >
            {props.heading}
          </div>
        </div>
        <p
          className={`surfaces__item-heading ${
            mouseIn ? "surfaces__item-heading_highlited" : ""
          } ${isSliderOpen ? "surfaces__item-heading_opened" : " "}
        ${isSelected ? "surfaces__item-heading_opened" : " "}`}
        >
          {mouseIn
            ? isSelected
              ? "скрыть каталог"
              : "посмотреть каталог"
            : props.heading}
        </p>
      </div>
      {props.isMobile && props.content && (
        <div
          className={`surfaces__slider-container ${
            isSliderOpen ? "surfaces__slider-container_opened" : ""
          }`}
        >
          <Slider {...settings}>
            {props.content.map((item) => (
              <div key={item._id} className="surfaces__slide">
                <img
                  key={item._id}
                  alt="Пример материала"
                  id={item._id}
                  src={item.image}
                  className="surfaces__image"
                  draggable="false"
                />
                <p className="surfaces__material-description surfaces__material-description_visible">
                  {item.description}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}

export default SurfacesListItem;

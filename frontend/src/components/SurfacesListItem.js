import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrow_left from "../images/icons/surfaces_arrow_left.svg";
import arrow_right from "../images/icons/surfaces_arrow_right.svg";
import useWindowSize from "../hooks/useWindowSize";
// import { Link } from "react-scroll";

function SurfacesListItem(props) {
  const size = useWindowSize();
  const [mouseIn, setMouseIn] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const itemId = props.item._id.toString();

  const handleSlideClick = (item) => {
    props.showModal(item.image);
  };

  useEffect(() => {
    if (
      size.width > 849 &&
      props.selectedMaterial &&
      props.selectedMaterial === itemId
    ) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [itemId, props.selectedMaterial, size.width]);

  function toggleSliderOpen(evt) {
    if (size.width < 849) {
      setIsSliderOpen(!isSliderOpen);
      evt.target.closest("li").classList.toggle("surfaces__list-item_expanded");
    }
  }
  function handleHoverEvent() {
    if (size.width > 849) {
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
            top: "35%",
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
            top: "35%",
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
    lazyLoad: true,
    initialSlide: 0,
    speed: 500,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: false,
    adaptiveHeight: false,
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
            src={
              props.image.path
                ? process.env.REACT_APP_URL + props.image.path
                : props.image
            }
            alt="Картинка"
            className="surfaces__image surfaces__image_main"
          />
          <div
            className={`surfaces__overlay ${
              mouseIn ? "surfaces__overlay_visible" : ""
            }`}
          >
            {props.title}
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
            : props.title}
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
                  className="surfaces__image surfaces__image_place_slider"
                  draggable="false"
                  onClick={() => handleSlideClick(item)}
                />
                <div className="surfaces__description-container">
                  <p className="surfaces__description-heading">
                    {item.description}
                  </p>
                  <p className="surfaces__description-item">
                    Фабрика:
                    <span className="surfaces__description-accent">
                      {item.manufacturer}
                    </span>
                  </p>
                  <p className="surfaces__description-item">
                    Страна:
                    <span className="surfaces__description-accent">
                      {item.origin}
                    </span>
                  </p>
                  <p className="surfaces__description-item">
                    Коллекция:
                    <span className="surfaces__description-accent">
                      {item.collection}
                    </span>
                  </p>
                  <p className="surfaces__description-item">
                    Поверхность:
                    <span className="surfaces__description-accent">
                      {item.surface}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}

export default SurfacesListItem;

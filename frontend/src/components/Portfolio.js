import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowRight from "../images/slider/ArrowRight.svg";
import arrowLeft from "../images/slider/ArrowLeft.svg";
import useWindowSize from "../hooks/useWindowSize";
import {
  BrowserRouter as Router,
  Link,
  Route,
  useRouteMatch,
  useParams
} from 'react-router-dom'
import PortfolioItem from "./PortfolioItem";

function Portfolio({ content, showModal, isModalWithCarouselOpen, portfolioContentNew }) {
  console.log(portfolioContentNew);
  // const size = useWindowSize();

  // function handleImageClick(evt) {
  //   showModal(evt.target.id, content);
  // }
  // function NextArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <>
  //       {!isModalWithCarouselOpen && size.width > 849 && (
  //         <img
  //           className={className}
  //           src={arrowRight}
  //           alt="Иконка"
  //           style={{ ...style, width: "65px", height: "56px", right: "-60px" }}
  //           onClick={onClick}
  //         />
  //       )}
  //     </>
  //   );
  // }

  // function PrevArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <>
  //       {!isModalWithCarouselOpen && size.width > 849 && (
  //         <img
  //           className={className}
  //           src={arrowLeft}
  //           alt="Иконка"
  //           style={{ ...style, width: "65px", height: "56px", left: "-60px" }}
  //           onClick={onClick}
  //         />
  //       )}
  //     </>
  //   );
  // }

  // const settings = {
  //   className: "portfolio__carousel",
  //   dots: false,
  //   infinite: true,
  //   initialSlide: 0,
  //   speed: 500,
  //   slidesToShow: 1,
  //   centerMode: size.width > 849 ? true : false,
  //   variableWidth: true,
  //   adaptiveHeight: true,
  //   slidesToScroll: 1,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  //   accessibility: false,
  //   draggable: false,
  // };
  const { url, path } = useRouteMatch()
  console.log(url, path);
  const [item, setItem] = useState({});
  const params = useParams();
  console.log('params',params.itemId)
  return (
    <article className="portfolio">
      <h2 className="content__title content__title_place_portfolio">
        Портфолио
      </h2>
        <ul className="portfolio__items">
          {portfolioContentNew && portfolioContentNew.map((portfolioItem) =>(
            <li key={portfolioItem._id}>
              <Link onClick={()=>{console.log(portfolioItem._id)}}to={`/portfolio/${portfolioItem._id}`}>{portfolioItem.title}</Link>
            </li>
          ))}
        </ul>
      {/* <Route path={`${url}/:itemId`}>
        <PortfolioItem content={portfolioContentNew}></PortfolioItem>
      </Route> */}
      {/* <div className="portfolio__slider-container">
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
      </div> */}
    </article>
  );
}

export default Portfolio;

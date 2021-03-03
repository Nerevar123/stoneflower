import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Link,
} from "react-router-dom";

function Portfolio({
  portfolioContentNew,
  setPortfolioItem,
}) {
  useEffect(() => {
    setPortfolioItem(null);
    window.scrollTo({ top: 0})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  return (
    <article className="portfolio">
      <h2 className="content__title content__title_place_portfolio">
        Портфолио
      </h2>
      <ul className="portfolio__items">
        {portfolioContentNew &&
          portfolioContentNew.map((portfolioItem) => (
            <li className="portfolio__item" key={portfolioItem._id}>
              <Link
                className="portfolio__link"
                onClick={() => {
                  setPortfolioItem({
                    name: portfolioItem.title,
                    link: `${portfolioItem._id}`,
                  });
                }}
                to={`/portfolio/${portfolioItem._id}`}
              >
                <div className="portfolio__item-description">
                  <p className="portfolio__item-title">{portfolioItem.title}</p>
                  <p className="portfolio__item-subtitle">
                    {portfolioItem.category}
                  </p>
                </div>
              </Link>
              <img
                className="portfolio__item-image"
                src={portfolioItem.photos[0].image.image}
                alt="Изображение портфолио"
              />
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

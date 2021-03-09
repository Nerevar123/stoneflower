import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function Portfolio({ content, handlePortfolioItemSelection }) {
  useEffect(() => {
    handlePortfolioItemSelection(null);
    window.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="portfolio">
      <h2 className="content__title content__title_place_portfolio">
        Портфолио
      </h2>
      <ul className="portfolio__items">
        {content &&
          content.map((portfolioItem) => (
            <li className="portfolio__item" key={portfolioItem._id}>
              <Link
                className="portfolio__link"
                onClick={() => {
                  handlePortfolioItemSelection({
                    name: portfolioItem.title,
                    link: `/portfolio/items/${portfolioItem._id}`,
                  });
                }}
                to={`/portfolio/items/${portfolioItem._id}`}
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
                src={
                  portfolioItem.photos[0].image.path
                    ? process.env.REACT_APP_URL +
                      portfolioItem.photos[0].image.path
                    : portfolioItem.photos[0].image
                }
                alt="Изображение портфолио"
              />
            </li>
          ))}
      </ul>
    </article>
  );
}

export default Portfolio;

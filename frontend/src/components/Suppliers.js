import React, {useState} from "react";
import useWindowSize from "../hooks/useWindowSize";
// import { Link } from "react-router-dom";
// import supplier_logo_1 from "../images/suppliers/1.png";

function Suppliers({ content }) {
  const window = useWindowSize();
  return (
    <article className="suppliers">
      <h2 className="content__title content__title_place_suppliers">
        {content.heading}
      </h2>

      <p className="content__text content__text_place_suppliers">
        {content.subheadingMaterials}
      </p>
      <ul className="suppliers__list list">
        {content.materialsData &&
          content.materialsData.map((item) => (
            <li key={item._id} className="suppliers__list-item">
              <img className="suppliers__logo" alt="Логотип" src={item.logo} />
              {window.width > 849 && (
                <div className="suppliers__confirmation-window">
                  <a
                    className="suppliers__link"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Открыть сайт производителя
                  </a>
                </div>
              )}
            </li>
          ))}
      </ul>
      <p className="content__text content__text_place_suppliers">
        {content.subheadingSuppliers}
      </p>
      <ul className="suppliers__list list">
        {content.suppliersData &&
          content.suppliersData.map((item) => (
            <li key={item._id} className="suppliers__list-item">
              <a
                className="suppliers__link"
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="suppliers__logo"
                  alt="Логотип"
                  src={item.logo}
                />
              </a>
            </li>
          ))}
      </ul>
    </article>
  );
}

export default Suppliers;

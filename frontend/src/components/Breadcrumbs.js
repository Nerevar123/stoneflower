import React from "react";
import { NavLink } from "react-router-dom";

function Breadcrumbs({ link, name, portfolioItem }) {

  return (
    <section className="breadcrumbs">
      <NavLink className="breadcrumbs__link" to="/">
        Главная
      </NavLink>
      {` / `}
      <NavLink className="breadcrumbs__link" to={link}>
        {name}
      </NavLink>
      {portfolioItem && (
        <>
          {` / `}
          <NavLink className="breadcrumbs__link" to={portfolioItem.link}>
            {portfolioItem.name}
          </NavLink>
        </>
      )}
    </section>
  );
}

export default Breadcrumbs;

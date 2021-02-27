import React from "react";
import { NavLink } from "react-router-dom";

function Breadcrumbs({ link, name, portFolioItem }) {
  return (
    <section className="breadcrumbs">
      <NavLink className="breadcrumbs__link" to="/">
        Главная
      </NavLink>
      {` / `}
      <NavLink className="breadcrumbs__link" to={link}>
        {name}
      </NavLink>
      {portFolioItem && (
        <>
          {` / `}
          <NavLink className="breadcrumbs__link" to={portFolioItem.link}>
            {portFolioItem.name}
          </NavLink>
        </>
      )}
    </section>
  );
}

export default Breadcrumbs;

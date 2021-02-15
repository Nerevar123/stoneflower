import React, {useState} from "react";
import useWindowSize from "../hooks/useWindowSize";
import SuppliersItem from "./SuppliersItem";
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
           <SuppliersItem item={item} id="materials"/>

          ))}
      </ul>
      <p className="content__text content__text_place_suppliers">
        {content.subheadingSuppliers}
      </p>
      <ul className="suppliers__list list">
        {content.suppliersData &&
          content.suppliersData.map((item) => (
            <SuppliersItem item={item} id="suppliers"/>
          ))}
      </ul>
    </article>
  );
}

export default Suppliers;

import React, { useState, useEffect } from "react";
import SuppliersItem from "./SuppliersItem";

function Suppliers({ content, textContent, showModal }) {
  const [materialItems, setMaterialItems] = useState([]);
  const [supplierItems, setSupplierItems] = useState([]);

  useEffect(() => {
    let mat = [];
    let sup = [];

    content.forEach((supplier) => {
      if (supplier.isMaterial) {
        mat = [...mat, supplier];
      } else {
        sup = [...sup, supplier];
      }
    });

    setMaterialItems(mat);
    setSupplierItems(sup);
  }, [content]);

  return (
    <article className="suppliers">
      <h2 className="content__title content__title_place_suppliers">
        {textContent.heading}
      </h2>

      <p className="content__text content__text_place_suppliers">
        {textContent.subheadingMaterials}
      </p>
      <ul className="suppliers__list list">
        {materialItems &&
          materialItems.map((item) => (
            <SuppliersItem
              key={item._id}
              item={item}
              id="materials"
              showModal={showModal}
            />
          ))}
      </ul>
      <p className="content__text content__text_place_suppliers">
        {textContent.subheadingSuppliers}
      </p>
      <ul className="suppliers__list list">
        {supplierItems &&
          supplierItems.map((item) => (
            <SuppliersItem
              key={item._id}
              item={item}
              id="suppliers"
              showModal={showModal}
            />
          ))}
      </ul>
    </article>
  );
}

export default Suppliers;

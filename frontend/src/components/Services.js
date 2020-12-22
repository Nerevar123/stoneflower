import React, { useState } from "react";
import ServicesItem from "./ServicesItem";

function Services({ elements }) {
  console.log(elements);
  return (
    <article id="services" className="services">
      <h2 className="content__title">Услуги</h2>
      <ul className="services__list list">
        {elements.map((item) => {
          <ServicesItem
            key={item.id}
            image={item.imageUrl}
            heading={item.heading}
            description={item.description}
          />
        })}
      </ul>
    </article>
  );
}

export default Services;

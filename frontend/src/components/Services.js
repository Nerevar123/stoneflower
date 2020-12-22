import React from "react";
import ServicesItem from "./ServicesItem";

function Services({ elements }) {
  return (
    <article id="services" className="services">
      <h2 className="content__title">Услуги</h2>
      <ul className="services__list list">
        {elements.map((item) => (
          <ServicesItem
            item={item}
            key={item._id}
            image={item.link}
            heading={item.heading}
            description={item.description}
          />
        ))}
      </ul>
    </article>
  );
}

export default Services;

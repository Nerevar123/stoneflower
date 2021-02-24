import React from "react";
import ServicesItem from "./ServicesItem";

function Services({ elements, inPreview }) {
  return (
    <article
      id="services"
      style={{ margin: inPreview ? "0" : "" }}
      className="services"
    >
      <h2 className="content__title">Услуги</h2>
      <ul className="services__list list">
        {elements.length > 1 ? (
          elements.map((item) => (
            <ServicesItem
              item={item}
              key={item._id}
              image={item.image}
              heading={item.heading}
              description={item.description}
            />
          ))
        ) : (
          <ServicesItem
            item={elements}
            key={elements._id}
            image={elements.image}
            heading={elements.heading}
            description={elements.description}
          />
        )}
      </ul>
    </article>
  );
}

export default Services;

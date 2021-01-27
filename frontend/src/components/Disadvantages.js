import React from "react";
import DisadvantagesItem from "./DisadvantagesItem";

function Disadvantages({ tableItems }) {
  return (
    <article className="disadvantages">
      <h2 className="content__title">
        Недостатки популярных аналогов в сегменте столешниц и фасадов
      </h2>
      <ul className="disadvantages__list list">
        {tableItems.map((item) => (
          <DisadvantagesItem
            item={item}
            key={item._id}
            image={item.image}
            content={item.text}
          />
        ))}
      </ul>
    </article>
  );
}

export default Disadvantages;

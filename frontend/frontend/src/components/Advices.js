import React from "react";
import AdvicesItem from "./AdvicesItem";

function Advices({ content }) {

  return (
    <article className="advices">
      <h2 className="content__title content__title_place_advices">
        Советы дизайнера
      </h2>
      <ul className="advices__list list">
      {content && content.map((item) => (
          <AdvicesItem
            item={item}
            key={item._id}
            heading={item.heading}
            image={item.image}
            shortText={item.shortText}
            expandedText={item.expandedText}
            linkTextExpanded={item.linkTextExpanded}
            linkTextMinimized={item.linkTextMinimized}
          />
        ))}
      </ul>
    </article>
  );
}

export default Advices;

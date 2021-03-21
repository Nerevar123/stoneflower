import React, { useEffect } from "react";
import AdvicesItem from "./AdvicesItem";

function Advices({ content }) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <article className="advices">
      <h2 className="content__title content__title_place_advices">
        Советы дизайнера
      </h2>
      <ul className="advices__list list">
        {content.length > 1 ? (
          content.map((item) => (
            <AdvicesItem
              item={item}
              key={item._id}
              heading={item.heading}
              image={item.image}
              shortText={item.shortText}
              expandedText={item.expandedText}
              linkTextExpanded="Скрыть"
              linkTextMinimized="Читать далее"
            />
          ))
        ) : (
          <AdvicesItem
            item={content}
            key={content._id}
            heading={content.heading}
            image={content.image}
            shortText={content.shortText}
            expandedText={content.expandedText}
            linkTextExpanded="Скрыть"
            linkTextMinimized="Читать далее"
          />
        )}
      </ul>
    </article>
  );
}

export default Advices;

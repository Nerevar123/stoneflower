import React, { useState, useEffect } from "react";
import SurfacesListItem from "./SurfacesListItem";

function Surfaces({ content }) {
  const [textExpanded, setTextExpanded] = useState(false);
  function handleTextExpand() {
    setTextExpanded(!textExpanded);
  }
  return (
    <article id="surfaces" className="surfaces">
      <h2 className="content__title content__title_place_surfaces">Варианты поверностей</h2>
      <div className="content__text-container content__text-container_place_surfaces">
        <p className="content__text">{content.shortText}</p>
        <div
          className={`content__expand-container ${
            textExpanded ? "content__expand-container_opened" : ""
          }`}
        >
          <p className="content__text">{content.expandedText}</p>
        </div>
        <a
          onClick={handleTextExpand}
          className={`surfaces__link link ${textExpanded ? "open" : ""}`}
        >
          {textExpanded ? content.linkTextExpanded : content.linkTextMinimized}
        </a>
      </div>
      <ul className="surfaces__list list">
          {content.materialsList
            ? content.materialsList.map((item) => (
                <SurfacesListItem
                  item={item}
                  key={item._id}
                  image={item.image}
                  heading={item.heading}
                />
              ))
            : ""}
        </ul>
    </article>
  );
}

export default Surfaces;

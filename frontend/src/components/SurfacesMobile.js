import React, { useState, useEffect } from "react";
import SurfacesListItem from "./SurfacesListItem";

function SurfacesMobile({ content, showModal, textContent }) {
  const [textExpanded, setTextExpanded] = useState(false);

  function handleTextExpand() {
    setTextExpanded(!textExpanded);
  }
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <article id="surfaces" className="surfaces">
      <h2 className="content__title content__title_place_surfaces">
        {textContent.heading}
      </h2>
      <div className="content__text-container content__text-container_place_surfaces">
        <p className="content__text">{textContent.shortText}</p>
        <div
          className={`content__expand-container ${
            textExpanded ? "content__expand-container_opened" : ""
          }`}
        >
          <p className="content__text">{textContent.expandedText}</p>
        </div>
        <button
          onClick={handleTextExpand}
          className={`surfaces__link link ${textExpanded ? "open" : ""}`}
        >
          {textExpanded ? "Скрыть" : "Читать далее"}
        </button>
      </div>
      <ul className="surfaces__list list">
        {content
          ? content.map((item) => (
              <li id={item._id} key={item._id} className="surfaces__list-item">
                <SurfacesListItem
                  content={item.examples}
                  isMobile={true}
                  item={item}
                  key={item._id}
                  image={item.examples[0].image}
                  showModal={showModal}
                  title={item.title}
                />
              </li>
            ))
          : ""}
      </ul>
    </article>
  );
}

export default SurfacesMobile;

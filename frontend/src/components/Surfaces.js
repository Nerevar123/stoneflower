import React, { useState, useEffect, createRef } from "react";
import SurfacesListItem from "./SurfacesListItem";

function Surfaces({ content }) {
  const [textExpanded, setTextExpanded] = useState(false);
  const [materialRefs, setMaterialRefs] = useState([]);
  const [materialListOpened, setMaterialListOpened] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const handleElementClick = (evt) => {
    if (evt.target.closest("li").id !== selectedMaterial) {
      setSelectedMaterial(evt.target.closest("li").id);
    } else {
      setSelectedMaterial(null);
    }
  };
  useEffect(() => {
    console.log(selectedMaterial);
    if (selectedMaterial !== null) {
      setMaterialListOpened(true);
    } else {
      setMaterialListOpened(false);
    }
  }, [selectedMaterial]);

  function handleTextExpand() {
    setTextExpanded(!textExpanded);
  }
  const materialsNumber = content.length;

  useEffect(() => {
    setMaterialRefs((materialRefs) =>
      Array(materialsNumber)
        .fill()
        .map((_, i) => materialRefs[i] || createRef())
    );
  }, [content, materialsNumber]);
  return (
    <article id="surfaces" className="surfaces">
      <h2 className="content__title content__title_place_surfaces">
        Варианты поверностей
      </h2>
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
              <li
                id={item._id}
                ref={materialRefs[item._id]}
                onClick={handleElementClick}
                key={item._id}
                className="surfaces__list-item"
              >
                <SurfacesListItem
                  item={item}
                  key={item._id}
                  image={item.image}
                  heading={item.heading}
                />
              </li>
            ))
          : ""}
      </ul>
      <div
        className={`surfaces__materials-container ${
          materialListOpened ? "surfaces__materials-container_opened" : ""
        }`}
      >
        {content && selectedMaterial !== null &&
        (
          content.materialsList[selectedMaterial].materialExamples.map((item) => (
            <div className="surfaces__example-item" key={item._id}>
              <img className="surfaces__example-image" src={item.image} alt='Пример материала'/>
              <p className="content__text">{item.description}</p>
            </div>
          ))
        )}

      </div>
    </article>
  );
}

export default Surfaces;

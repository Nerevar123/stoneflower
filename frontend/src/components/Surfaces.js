import React, { useState, useEffect, createRef, useRef } from "react";
import SurfacesListItem from "./SurfacesListItem";
import SurfacesExampleItem from "./SurfacesExampleItem";

function Surfaces({ content, showModal, textContent }) {
  const [textExpanded, setTextExpanded] = useState(false);
  const [exampleRefs, setExampleRefs] = useState([]);
  const [materialListOpened, setMaterialListOpened] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const examples = useRef();

  useEffect(() => {
    if (selectedMaterial !== null) {
      const refArray = [];
      for (let i = 0; i < content[parseInt(selectedMaterial)].examples.length; i++) {
        refArray.push(createRef());
      }
      setExampleRefs(refArray);
    }
  }, [content, selectedMaterial]);

  useEffect(() => {
    if (selectedMaterial !== null) {
      setMaterialListOpened(true);
      setTimeout(() => {
        const offset = -80;
        const yCoordinate =
          examples.current.getBoundingClientRect().top +
          window.pageYOffset +
          offset;
        window.scrollTo({ top: yCoordinate, behavior: "smooth" });
      }, 200);
    } else {
      setMaterialListOpened(false);
    }
  }, [selectedMaterial]);

  const handleElementClick = (evt) => {
    const foundIndex = content.findIndex(
      (x) => x._id === evt.target.closest("li").id
    );
    if (
      !selectedMaterial ||
      evt.target.closest("li").id !== content[parseInt(selectedMaterial)]._id
    ) {
      setMaterialListOpened(false);
      setSelectedMaterial(foundIndex.toString());
    } else {
      setSelectedMaterial(null);
    }
  };

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
          className={`surfaces__link surfaces__link_type_button link ${
            textExpanded ? "open" : ""
          }`}
        >
          {textExpanded ? "Скрыть" : "Читать далее"}
        </button>
      </div>
      <ul className="surfaces__list list">
        {content
          ? content.map((item) => (
              <li
                id={item._id}
                onClick={handleElementClick}
                key={item._id}
                className="surfaces__list-item"
              >
                <SurfacesListItem
                  content={item.examples}
                  selectedMaterial={selectedMaterial}
                  isMobile={false}
                  item={item}
                  key={item._id}
                  image={item.examples[0].image}
                  title={item.title}
                />
              </li>
            ))
          : ""}
      </ul>
      <div
        ref={examples}
        className={`surfaces__materials-container ${
          materialListOpened ? "surfaces__materials-container_opened" : ""
        }`}
      >
        {materialListOpened &&
          content &&
          selectedMaterial !== null &&
          content[parseInt(selectedMaterial)].examples.map((item, i) => (
            <SurfacesExampleItem
              item={item}
              id={i}
              key={item._id}
              forwardRef={exampleRefs[i]}
              showModal={showModal}
            />
          ))}
      </div>
    </article>
  );
}

export default Surfaces;

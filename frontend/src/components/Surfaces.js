import React, { useState, useEffect, createRef, useRef } from "react";
import SurfacesListItem from "./SurfacesListItem";
import SurfacesExampleItem from "./SurfacesExampleItem";

function Surfaces({ content, showModal, textContent }) {
  const [textExpanded, setTextExpanded] = useState(false);
  const [exampleRefs, setExampleRefs] = useState([]);
  const [materialListOpened, setMaterialListOpened] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedExample, setSelectedExample] = useState(-1);
  const examples = useRef();

  function handleExampleSelection(evt) {
    setSelectedExample(evt.target.closest(".surfaces__example-item"));
  }

  useEffect(() => {
    if (selectedMaterial !== null) {
      const refArray = [];
      for (
        let i = 0;
        i < content[selectedMaterial].examples.length;
        i++
      ) {
        refArray.push(createRef());
      }
      setExampleRefs(refArray);
    }
  }, [content, selectedMaterial]);

  useEffect(() => {
    if (selectedMaterial !== null) {
      setMaterialListOpened(true);
      examples.current.scrollIntoView({ block: "center", behavior: "smooth" });
    } else {
      setMaterialListOpened(false);
    }
  }, [selectedMaterial]);

  useEffect(() => {
    if (selectedExample === -1 && materialListOpened) {
      const el = document.getElementById("example_0");
      setSelectedExample(el);
    }
  }, [selectedExample, selectedMaterial, materialListOpened]);

  const handleElementClick = (evt) => {
    const foundIndex = content.findIndex((x) => x._id === evt.target.closest("li").id);
    if (evt.target.closest("li").id !== foundIndex) {
      setMaterialListOpened(false);
      setSelectedMaterial(foundIndex);
      setSelectedExample(-1);
    } else {
      setSelectedMaterial(null);
      setSelectedExample(-1);
    }
  };

  function handleTextExpand() {
    setTextExpanded(!textExpanded);
  }

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
        onClick={handleExampleSelection}
        className={`surfaces__materials-container ${
          materialListOpened ? "surfaces__materials-container_opened" : ""
        }`}
      >
        {materialListOpened &&
          content &&
          selectedMaterial !== null &&
          content[
            selectedMaterial
          ].examples.map((item, i) => (
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

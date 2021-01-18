import React, { useState, useEffect, createRef, useRef } from "react";
import SurfacesListItem from "./SurfacesListItem";
import SurfacesExampleItem from "./SurfacesExampleItem";
// import useWindowSize from "../hooks/useWindowSize";

function Surfaces({ content }) {
  const [textExpanded, setTextExpanded] = useState(false);
  const [exampleRefs, setExampleRefs] = useState([]);
  const [materialListOpened, setMaterialListOpened] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedExample, setSelectedExample] = useState(-1);
  const examples = useRef();
  // const window = useWindowSize();

  function handleExampleSelection(evt) {

    setSelectedExample(evt.target.closest(".surfaces__example-item"));

  }


  useEffect(() => {
    if (selectedMaterial !== null) {
      const refArray = [];
      for (
        let i = 0;
        i < content.materialsList[selectedMaterial].materialExamples.length;
        i++
      ) {
        refArray.push(createRef());
      }
      setExampleRefs(refArray);
    }
  }, [selectedMaterial]);

  const handleElementClick = (evt) => {
    if (evt.target.closest("li").id !== selectedMaterial) {
      setMaterialListOpened(false);
      setSelectedMaterial(evt.target.closest("li").id);
      setSelectedExample(-1);
    } else {
      setSelectedMaterial(null);
      setSelectedExample(-1);
    }
  };
  useEffect(() => {
    if (selectedMaterial !== null) {
      setMaterialListOpened(true);
      examples.current.scrollIntoView({block: "center", behavior: "smooth"})
    } else {
      setMaterialListOpened(false);
    }
  }, [selectedMaterial]);

  function handleTextExpand() {
    setTextExpanded(!textExpanded);
  }
  useEffect(() => {
    if (selectedExample === -1 && materialListOpened) {
      const el = document.getElementById("example_0");
      setSelectedExample(el);
    }
  }, [selectedExample, selectedMaterial, materialListOpened]);

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
                onClick={handleElementClick}
                key={item._id}
                className="surfaces__list-item"
              >
                <SurfacesListItem
                  selectedMaterial={selectedMaterial}
                  isMobile={false}
                  item={item}
                  key={item._id}
                  image={item.image}
                  heading={item.heading}
                />
              </li>
            ))
          : ""}
      </ul>
      <div ref={examples}
        onClick={handleExampleSelection}
        className={`surfaces__materials-container ${
          materialListOpened ? "surfaces__materials-container_opened" : ""
        }`}
      >
        {content &&
          selectedMaterial !== null &&
          content.materialsList[
            selectedMaterial
          ].materialExamples.map((item) => (
            <SurfacesExampleItem
              item={item}
              key={item._id}
              forwardRef={exampleRefs[item._id]}
              selectedExample={selectedExample}
              setSelectedExample={setSelectedExample}
            />
          ))}
      </div>
    </article>
  );
}

export default Surfaces;

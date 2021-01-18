import React, { useState } from "react";
// import DisadvantagesItem from "./DisadvantagesItem";

function AdvicesItem(props) {
  const [textExpanded, setTextExpanded] = useState(false);
  function handleTextExpand() {
    setTextExpanded(!textExpanded);
  }
  return (
    <li className="advices__item">
      <img className="advices__image" src={props.image} alt={props.heading}/>
      <div className="content__text-container content__text-container_place_advices">
        <h3 className="advices__title">{props.heading}</h3>
        <p className="content__text">{props.shortText}</p>
        <div
          className={`content__expand-container ${
            textExpanded ? "content__expand-container_opened" : ""
          }`}
        >
          <p className="content__text">{props.expandedText}</p>
        </div>
        <a
          onClick={handleTextExpand}
          className={`advices__link link ${textExpanded ? "open" : ""}`}
        >
          {textExpanded ? props.linkTextExpanded : props.linkTextMinimized}
        </a>
      </div>

    </li>
  );
}

export default AdvicesItem;

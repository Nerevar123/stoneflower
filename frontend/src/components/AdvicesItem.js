import React, { useState } from "react";

function AdvicesItem(props) {
  const [textExpanded, setTextExpanded] = useState(false);
  function handleTextExpand() {
    setTextExpanded(!textExpanded);
  }
  return (
    <li className="advices__item">
      <img
        alt={props.heading}
        className="advices__image"
        src={
          props.image.path
            ? process.env.REACT_APP_URL + props.image.path
            : props.image
        }
      />
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
        <button
          onClick={handleTextExpand}
          className={`advices__link link ${textExpanded ? "open" : ""}`}
        >
          {textExpanded ? props.linkTextExpanded : props.linkTextMinimized}
        </button>
      </div>
    </li>
  );
}

export default AdvicesItem;

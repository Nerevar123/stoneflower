import React, { useState, useEffect } from "react";

function SurfacesExampleItem({
  item,
  forwardRef,
  selectedExample,
  setSelectedExample

}) {

  function setSelectedOnLoad(evt) {
    if (selectedExample === null) {
      setSelectedExample(evt.target.closest('div'));
    }
  }


  return (
    <div
      className={`surfaces__example-item ${(forwardRef &&
        selectedExample === forwardRef.current)
          ? "surfaces__example-item_selected"
          : ""
      }`}
      key={item._id}
      ref={forwardRef}
    >
      <img
        id={item._id}
        onLoad={setSelectedOnLoad}
        className="surfaces__example-image"
        src={item.image}
        alt="Пример материала"
      />
      <p className="content__text">{item.description}</p>
    </div>
  );
}

export default SurfacesExampleItem;

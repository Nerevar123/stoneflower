import React, { useState } from "react";

function SurfacesListItem(props) {
  const [mouseIn, setMouseIn] = useState(false);
  function handleHoverEvent() {
    setMouseIn(!mouseIn);
  }

  return (
    <div
      className="surfaces__link surfaces__link_place_list"
      onMouseEnter={handleHoverEvent}
      onMouseLeave={handleHoverEvent}
    >
      <div className="surfaces__image-container">
        <img src={props.image} alt="Картинка" className="surfaces__image" />
        <div
          className={`surfaces__overlay ${
            mouseIn ? "surfaces__overlay_visible" : ""
          }`}
        >
          {props.heading}
        </div>
      </div>
      <p
        className={`surfaces__item-heading ${
          mouseIn ? "surfaces__item-heading_highlited" : ""
        }`}
      >
        {props.heading}
      </p>
    </div>
  );
}

export default SurfacesListItem;

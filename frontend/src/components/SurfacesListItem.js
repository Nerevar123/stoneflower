import React, { useState } from "react";
import { Link } from 'react-router-dom';

function SurfacesListItem(props) {
const [mouseIn,setMouseIn] = useState(false);
function handleHoverEvent() {
  setMouseIn(!mouseIn);
}

  return (
    <li className="surfaces__list-item" onMouseEnter={handleHoverEvent} onMouseLeave={handleHoverEvent}>
      <Link to="/materials" className="surfaces__link">
      <div className="surfaces__image-container">
        <img src={props.image} alt="Картинка" className="surfaces__image" />
        <div className={`surfaces__overlay ${mouseIn?'surfaces__overlay_visible':''}`}>{props.heading}</div>
      </div>
      <p className={`surfaces__item-heading ${mouseIn? 'surfaces__item-heading_highlited' : ''}`}>{props.heading}</p>
      </Link>
    </li>
  );
}

export default SurfacesListItem;

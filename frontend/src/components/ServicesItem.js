import React from "react";

function ServicesItem(props) {
  return (
    <li className="services__list-item">
      <img
        alt={props.heading}
        className="services__image"
        src={
          props.image.path
            ? process.env.REACT_APP_URL + props.image.path
            : props.image
        }
      />
      <h3 className="services__title">{props.heading}</h3>
      <p className="content__text">{props.description}</p>
    </li>
  );
}

export default ServicesItem;

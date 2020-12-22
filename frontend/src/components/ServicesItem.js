import React from "react";

function ServicesItem(props) {
  console.log('here');
  return (
    <li className="services__list-item">
      <img alt={props.heading} className="services__image" src={props.image}/>
      <h3 className="services__title">
        {props.heading}
      </h3>
      <p className="content__text">
        {props.description}
      </p>
    </li>
  );
}

export default ServicesItem;

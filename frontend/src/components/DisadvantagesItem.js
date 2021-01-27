import React from "react";

function DisadvantagesItem(props) {
  return (
    <li className="disadvantages__list-item">
      <img
        className="disadvantages__list-image"
        src={props.image}
        alt="Изображение списка"
      />
      <p className="content__text">{props.content}</p>
    </li>
  );
}

export default DisadvantagesItem;

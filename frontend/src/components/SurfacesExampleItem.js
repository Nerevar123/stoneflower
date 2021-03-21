import React from "react";

function SurfacesExampleItem({ item, id, forwardRef, showModal }) {
  const handleClickEvent = () => {
    if (showModal) {
      showModal(
        item.image.path
          ? process.env.REACT_APP_URL + item.image.path
          : item.image
      );
    }
  };

  const handleMouseIn = () => {
    forwardRef.current.classList.add("selected");
  };

  const handleMouseOut = () => {
    forwardRef.current.classList.remove("selected");
  };

  return (
    <div
      className="surfaces__example-item"
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      key={item._id}
      ref={forwardRef}
      id={`example_${id}`}
      onClick={handleClickEvent}
    >
      <img
        id={item._id}
        className="surfaces__example-image surfaces__example-image_type_regular"
        src={
          item.image.path
            ? process.env.REACT_APP_URL + item.image.path
            : item.image
        }
        alt="Пример материала"
      />

      <div className="surfaces__description-container surfaces__description-container_desktop">
        <p className="surfaces__description-heading">{item.description}</p>
        <p className="surfaces__description-item">
          Фабрика:
          <span className="surfaces__description-accent">
            {item.manufacturer}
          </span>
        </p>
        <p className="surfaces__description-item">
          Страна:
          <span className="surfaces__description-accent">{item.origin}</span>
        </p>
        <p className="surfaces__description-item">
          Коллекция:
          <span className="surfaces__description-accent">{item.style}</span>
        </p>
        <p className="surfaces__description-item">
          Поверхность:
          <span className="surfaces__description-accent">{item.surface}</span>
        </p>
      </div>
    </div>
  );
}

export default SurfacesExampleItem;

import React from "react";

function SurfacesExampleItem({
  item,
  forwardRef,
  selectedExample,
  setSelectedExample,
  showModal
}) {
  const handleClickEvent = () => {
    showModal(item.image)
  }
  const handleMouseHover = () => {
    forwardRef.current.classList.toggle('selected');
  }
  return (
    <div
      className="surfaces__example-item"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
      key={item._id}
      ref={forwardRef}
      id={`example_${item._id}`}
      onClick={handleClickEvent}
    >
      <img
        id={item._id}
        className="surfaces__example-image surfaces__example-image_type_regular"
        src={item.image}
        alt="Пример материала"
      />

      <p
        className="surfaces__material-description"
      >
        {item.description}
      </p>
    </div>
  );
}

export default SurfacesExampleItem;

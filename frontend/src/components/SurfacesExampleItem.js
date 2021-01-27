import React from "react";

function SurfacesExampleItem({
  item,
  forwardRef,
  selectedExample,
  setSelectedExample,
}) {
  return (
    <div
      className={`surfaces__example-item ${
        forwardRef && selectedExample === forwardRef.current
          ? "surfaces__example-item_selected"
          : ""
      }`}
      key={item._id}
      ref={forwardRef}
      id={`example_${item._id}`}
    >
      <img
        id={item._id}
        className="surfaces__example-image"
        src={item.image}
        alt="Пример материала"
      />

      <p
        className={`surfaces__material-description ${
          forwardRef && selectedExample === forwardRef.current
            ? "surfaces__material-description_visible"
            : ""
        }`}
      >
        {item.description}
      </p>
    </div>
  );
}

export default SurfacesExampleItem;

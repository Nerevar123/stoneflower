import React, { useState, useEffect, createRef } from "react";

function Admin({ adminItems }) {
  const [selectedItem, setSelectedItem] = useState("requests");
  const [offset, setOffset] = useState(0);

  let buttonRefs = [];

  adminItems.forEach(() => {
    buttonRefs.push(createRef());
  });
  function changeFloatingItemOffset(ref) {
    ref ? setOffset(ref.current.offsetTop) : setOffset(0);
  }

  useEffect(() => {
    const index = adminItems.findIndex((item) => item.id === selectedItem);
    index !== -1
      ? setSelectedItem(adminItems[index].id)
      : setSelectedItem("requests");
    console.log(selectedItem);
    buttonRefs.forEach((item) => {
      item.current.id === selectedItem
        ? item.current.classList.add("admin__button_selected")
        : item.current.classList.remove("admin__button_selected");
    });
  }, [selectedItem, adminItems]);

  function handleButtonClick(ref) {
    changeUrl(`edit=${ref.current.id}`);
    changeFloatingItemOffset(ref);
    setSelectedItem(ref.current.id);
  }

  useEffect(() => {
    handlePageLoad();
  }, []);

  function handlePageLoad() {
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get("edit");
    const index = adminItems.findIndex((item) => item.id === type);
    index !== -1
      ? searchParams.set("edit", type)
      : searchParams.set("edit", "requests");
    setSelectedItem(type);
    changeFloatingItemOffset(buttonRefs[index]);
    changeUrl(searchParams);
  }
  function changeUrl(searchParams) {
    let newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      searchParams.toString();
    window.history.pushState({ path: newurl }, "", newurl);
  }

  return (
    <main className="admin">
      <div className="admin__button-block">
        {adminItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              handleButtonClick(buttonRefs[index]);
            }}
            ref={buttonRefs[index]}
            id={item.id}
            className="admin__button admin__button_type_navigation"
          >
            {item.content}
          </button>
        ))}
        <button className="admin__button admin__button_type_logout">
          Выйти
        </button>
        <div
          className="admin__floating-block"
          style={{ transform: `translateY(${offset}px)` }}
        ></div>
      </div>
      <div className="admin__edit-area">
        {selectedItem}
      </div>

    </main>
  );
}

export default Admin;

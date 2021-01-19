import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function AdminMenu(props) {

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const type = params.get("edit");
  const [selectedItem, setSelectedItem] = useState(type);
  useEffect(() => {
    console.log(selectedItem)
  }, [selectedItem]);
  const inputRef = useRef();
  function changeUrl() {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set("edit", inputRef.current.value);
    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    setSelectedItem(inputRef.current.value)
    window.history.pushState({path: newurl}, '', newurl);

  }
  return (
    <nav className="admin__menu">
      <input ref={inputRef}></input>
      <button onClick={changeUrl} className="test_button">Change url!</button>
      {selectedItem}
    </nav>
  );
}

export default AdminMenu;

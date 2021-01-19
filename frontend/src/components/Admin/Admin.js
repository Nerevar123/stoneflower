import React, { useState, useEffect, useRef, createRef } from "react";
import {
  Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { pricing } from "../../utils/config";

function Admin(props) {
  const [selectedItem, setSelectedItem] = useState("requests");
  const adminItems = [
    { id: "requests", content: "Заявки" },
    { id: "lead", content: "Главная" },
    { id: "services", content: "Услуги" },
    { id: "advantages", content: "Преимущества" },
    { id: "disadvantages", content: "Недостатки" },
    { id: "infostages", content: "Этапы работы" },
    { id: "pricing", content: "Расчёт цен" },
    { id: "surfaces", content: "Варианты поверхностей" },
    { id: "advices", content: "Советы дизайнера" },
    { id: "portfolio", content: "Портфолио" },
    { id: "suppliers", content: "Производители" },
    { id: "postform", content: "Оставить заявку" },
    { id: "contacts", content: "Контакты" },
  ];
  let buttonRefs = [];
  for (let i = 0; i < adminItems.length; i++) {
    buttonRefs.push(createRef());
  }

  useEffect(() => {
    const index = adminItems.findIndex((item) => item.id === selectedItem);
    index !== -1
      ? setSelectedItem(adminItems[index].id)
      : setSelectedItem("requests");
    console.log(selectedItem);
  }, [selectedItem]);

  function handleButtonClick(ref) {
      changeUrl(`edit=${ref.current.id}`);
      setSelectedItem(ref.current.id)
  }

  useEffect(() => {
    handlePageLoad();
  }, []);

  function handlePageLoad() {
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get("edit");
    adminItems.findIndex((item) => item.id === type) !== -1
      ? searchParams.set("edit", type)
      : searchParams.set("edit", "requests");
    setSelectedItem(type);
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
    <nav className="admin">
      {adminItems.map((item, index) => (
        <button onClick={() => {handleButtonClick(buttonRefs[index])}} ref={buttonRefs[index]} id={item.id} className="test_button">
          {item.content}
        </button>
      ))}

      {selectedItem}
    </nav>
  );
}

export default Admin;

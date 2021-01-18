import React from "react";

function Applicability ({table}) {
  return (
  <article id="applicability"className="applicability">
    <img src={table} className="applicability__table" alt="Таблица"/>
  </article>
  );
}

export default Applicability;

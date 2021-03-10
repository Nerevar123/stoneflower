import React from "react";

function Applicability ({table, applicabilityRef}) {
  return (
  <article id="applicability"className="applicability" ref={applicabilityRef}>
    <img src={table && (table.path || table)} className="applicability__table" alt="Таблица"/>
  </article>
  );
}

export default Applicability;

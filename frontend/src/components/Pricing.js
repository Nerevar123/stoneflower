import React from "react";


function Pricing({ content }) {
  return (
    <article id="pricing" className="pricing">
      <h2 className="content__title">{content.heading}</h2>
      <p className="content__text">{content.textMajor}</p>
      <p className="content__text">{content.textMinor}</p>
    </article>
  );
}
export default Pricing;

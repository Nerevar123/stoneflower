import React from "react";

function Phases({ phasesIcons, phasesText, phasesRef }) {
  return (
    <article className="phases" ref={phasesRef}>
      <h2 className="content__title">{phasesText.title}</h2>
      <div className="phases__scheme-container">
        <div className="phases__scheme-element">
          <img
            alt="Иконка этапов"
            className="phases__phase-image"
            src={phasesIcons.firstIcon}
          />
          <p className="phases_description">{phasesText.phases1}</p>
        </div>
        <div className="phases__scheme-element">
          <img
            alt="Иконка этапов"
            className="phases__phase-image"
            src={phasesIcons.secondIcon}
          />
          <p className="phases_description">{phasesText.phases2}</p>
        </div>
        <div className="phases__scheme-element">
          <img
            alt="Иконка этапов"
            className="phases__phase-image"
            src={phasesIcons.thirdIcon}
          />
          <p className="phases_description">{phasesText.phases3}</p>
        </div>
        <div className="phases__scheme-element">
          <img
            alt="Иконка этапов"
            className="phases__phase-image"
            src={phasesIcons.fourthIcon}
          />
          <p className="phases_description">{phasesText.phases4}</p>
        </div>
        <div className="phases__scheme-line" />
      </div>
    </article>
  );
}
export default Phases;

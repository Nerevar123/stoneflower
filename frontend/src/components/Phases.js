import React from "react";

function Phases({ phasesIcons }) {
  return (
    <article className="phases">
      <h2 className="content__title">Этапы работы</h2>
      <div className="phases__scheme-container">
        <div className="phases__scheme-element">
          <img
            alt="Иконка этапов"
            className="phases__phase-image"
            src={phasesIcons.firstIcon}
          />
          <p className="phases_description">{`Обсуждение проекта
и расчет стоимости`}</p>
        </div>
        <div className="phases__scheme-element">
          <img
            alt="Иконка этапов"
            className="phases__phase-image"
            src={phasesIcons.secondIcon}
          />
          <p className="phases_description">{`Выезд замерщика
          на объект`}</p>
        </div>
        <div className="phases__scheme-element">
          <img
            alt="Иконка этапов"
            className="phases__phase-image"
            src={phasesIcons.thirdIcon}
          />
          <p className="phases_description">{`Оформление
           договора`}</p>
        </div>
        <div className="phases__scheme-element">
          <img
            alt="Иконка этапов"
            className="phases__phase-image"
            src={phasesIcons.fourthIcon}
          />
          <p className="phases_description">{`Производство
           и монтаж изделия`}</p>
        </div>
        <div className="phases__scheme-line"></div>
        {/* <img
            alt="Иконка этапов"
            className="phases__phase-image"
            src={phasesIcons.firstIcon}
          />
          <img
            alt="Иконка этапов"
            className="phases__phase-image"
            src={phasesIcons.secondIcon}
          />
          <img
            alt="Иконка этапов"
            className="phases__phase-image"
            src={phasesIcons.thirdIcon}
          />
          <img
            alt="Иконка этапов"
            className="phases__phase-image"
            src={phasesIcons.fourthIcon}
          /> */}

        {/* <div className="phases__text-container">

          <p className="phases_description">{`Выезд замерщика
          на объект`}</p>
          <p className="phases_description">{`Оформление
           договора`}</p>
          <p className="phases_description">{`Производство
           и монтаж изделия`}</p>
        </div> */}
      </div>
    </article>
  );
}
export default Phases;

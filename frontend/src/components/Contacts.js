import React, { useState, useEffect } from "react";
import whatsapp_icon from "../images/icons/whatsapp_icon.svg";

function Contacts({ content }) {
  const [whatsAppPhone, setWhatsAppPhone] = useState("");
  const [byBusExpanded, setByBusExpanded] = useState(false);
  const [byVehicleExpanded, setByVehicleExpanded] = useState(false);
  const [byTrainExpanded, setByTrainExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // function enableScroll () {
  //   console.log('hi')
  //   setIsFocused(true);
  // }
  // function disableScroll() {
  //   setIsFocused(false);
  // }

  useEffect(() => {
    if (content.phonePrimary) {
      let num = content.phonePrimary.match(/\d/g);
      setWhatsAppPhone(num.join(""));
    }
  }, [content]);

  function handleByBusExpand() {
    setByBusExpanded(!byBusExpanded);
  }
  function handleByVehicleExpand() {
    setByVehicleExpanded(!byVehicleExpanded);
  }
  function handleByTrainExpand() {
    setByTrainExpanded(!byTrainExpanded);
  }
  return (
    <article className="contacts">
      <h2 className="content__title content__title_place_contacts">
        {content.heading}
      </h2>
      <div className="contacts__content">
        <div className="contacts__info">
          <div className="contacts__info-block">
            <h3 className="contacts__subheading">Адрес</h3>
            <p className="content__text content__text_place_contacts">
              {content.address}
            </p>
          </div>
          <div className="contacts__info-block">
            <h3 className="contacts__subheading">Телефон</h3>
            <p className="content__text content__text_place_contacts">
              {content.phonePrimary}
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/${whatsAppPhone}`}
                className="contacts__whatsapp-link"
              >
                <img
                  src={whatsapp_icon}
                  alt="Логотип"
                  className="contacts__logo"
                />
              </a>
            </p>
            <p className="content__text content__text_place_contacts">
              {content.phoneAdditional}
            </p>
          </div>

          <div className="contacts__info-block">
            <h3 className="contacts__subheading">E-mail</h3>
            <p className="content__text content__text_place_contacts">
              {content.emailAddress}
            </p>
          </div>
          <div className="contacts__info-block">
            <h3 className="contacts__subheading">Как добраться</h3>
            <p className="content__text content__text_place_contacts">
              {content.howToGetText}
            </p>
            <div className="contacts__info-item">
              <p
                onClick={handleByBusExpand}
                className={`contacts__expand-message ${
                  byBusExpanded ? "open" : ""
                }`}
              >
                <span className="contacts__expand-accent">
                  Автобусом из Москвы
                </span>
                <span className="link__expand-arrow"></span>
              </p>
              <div
                className={`content__expand-container ${
                  byBusExpanded ? "content__expand-container_opened" : ""
                }`}
              >
                <p className="content__text">{content.byBusText}</p>
              </div>
            </div>
            <div className="contacts__info-item">
              <p
                onClick={handleByTrainExpand}
                className={`contacts__expand-message ${
                  byTrainExpanded ? "open" : ""
                }`}
              >
                <span className="contacts__expand-accent">
                  Пригородными поездами
                </span>
                <span className="link__expand-arrow"></span>
              </p>
              <div
                className={`content__expand-container ${
                  byTrainExpanded ? "content__expand-container_opened" : ""
                }`}
              >
                <p className="content__text">{content.byTrainText}</p>
              </div>
            </div>

            <div className="contacts__info-item">
              <p
                onClick={handleByVehicleExpand}
                className={`contacts__expand-message ${
                  byVehicleExpanded ? "open" : ""
                }`}
              >
                <span className="contacts__expand-accent">На автомобиле</span>
                <span className="link__expand-arrow"></span>
              </p>
              <div
                className={`content__expand-container ${
                  byVehicleExpanded ? "content__expand-container_opened" : ""
                }`}
              >
                <p className="content__text">{content.byVehicleText}</p>
              </div>
            </div>
            <p className="content__text content__text_type_landmarks">
              {content.landmarksDescription}
            </p>
          </div>
        </div>

        <iframe

          className={`contacts__map ${isFocused?'contacts__map_enabled': ''}`}
          title="map"
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A7639d1027e1fff0c230dd3bc78a9a11623774d47c3444ffe47052a5d9cbb5df1&amp;source=constructor"
          frameBorder="0"
        ></iframe>
      </div>
    </article>
  );
}

export default Contacts;

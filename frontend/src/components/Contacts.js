import React, { useState, useEffect, useRef } from "react";
import whatsapp_icon from "../images/icons/whatsapp_icon.svg";
import useWindowSize from "../hooks/useWindowSize";
import { YMaps, Map, Placemark } from "react-yandex-maps";

function Contacts({ content, entranceImage }) {
  const [whatsAppPhone, setWhatsAppPhone] = useState("");
  const [byBusExpanded, setByBusExpanded] = useState(false);
  const [byVehicleExpanded, setByVehicleExpanded] = useState(false);
  const [byTrainExpanded, setByTrainExpanded] = useState(false);
  const mapOverlayRef = useRef();

  const size = useWindowSize();
  const mapState = {
    center: [55.967157, 37.914651],
    zoom: 17,
    controls: ["zoomControl"],
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

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
  function handleMapTouch(e) {
    e.touches.length > 1
      ? mapOverlayRef.current.classList.remove("contacts__map-overlay_visible")
      : mapOverlayRef.current.classList.add("contacts__map-overlay_visible");
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
          </div>
        </div>
        <div className="contacts__map-wrapper">
          {size.width < 850 && (
            <div className="contacts__landmarks">
              <p className="content__text content__text_place_landmarks">
                {content.landmarksDescription}
              </p>
              {entranceImage && (
                <img
                  className="contacts__image"
                  src={entranceImage.path}
                  alt="Изображение входа"
                />
              )}
            </div>
          )}
          <div
            className="contacts__map-container"
            onTouchMove={handleMapTouch}
            onTouchEnd={() => {
              mapOverlayRef.current.classList.remove(
                "contacts__map-overlay_visible"
              );
            }}
          >
            <div className="contacts__map-overlay" ref={mapOverlayRef}>
              Для перемещения карты дотроньтесь двумя пальцами
            </div>
            <YMaps query={{ load: "package.full" }}>
              <Map
                state={mapState}
                className="contacts__map"
                instanceRef={(ref) => {
                  if (size.width < 850 && ref) {
                    ref.behaviors.disable("drag");
                  }
                }}
              >
                <Placemark
                  modules={["geoObject.addon.balloon"]}
                  geometry={[55.967157, 37.914651]}
                  properties={{
                    balloonContent:
                      "Студия керамогранита Каменный цветок </br> г. Ивантеевка, ул. Толмачева 1/2",
                  }}
                />
              </Map>
            </YMaps>
          </div>
          {size.width > 849 && (
            <div className="contacts__landmarks">
              {entranceImage && (
                <img
                  className="contacts__image"
                  src={entranceImage && (entranceImage.path || entranceImage)}
                  alt="Изображение входа"
                />
              )}
              <p className="content__text content__text_place_landmarks">
                {content.landmarksDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default Contacts;

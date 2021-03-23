import React from "react";
function Blocker({ offer, handleOfferAcception }) {
  return (
    <div className="offer">
      <div className="offer__message-container">
        <p className="offer__message">
          Продолжая пользование данным сайтом, я выражаю своё согласие ООО
          "ФИНЦентр" (Московская область, г. Ивантеевка, ул. Толмачёва, дом 1/2,
          пом. 008), на обработку моих персональных данных с использованием
          интернет-сервисов "Adobe Experience Cloud", "Google Analytics" и
          "Яндекс.Метрика". <br/> С <a href={offer.path} className="offer__link">
            Политикой
          </a>{" "} ООО "ФИНЦентр" в отношении обработки
          персональных данных ознакомлен.
        </p>
        <button className="offer__button" onClick={handleOfferAcception}>
          Подтверждаю
        </button>
      </div>
    </div>
  );
}

export default Blocker;

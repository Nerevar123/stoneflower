import React from 'react';
function Blocker({ offer, handleOfferAcception }) {
    return(
        <div className="offer">
            <div className="offer__message-container">
                <p className="offer__message">
                  Продолжая пользование данным сайтом, я выражаю свое согласие "Наименование Юр. лица"
                  (Тут будет адрес) на обработку моих персональных данных с использованием интернет сервисов<br/> &laquo;Google analytics&raquo; и &laquo;Яндекс.Метрика&raquo;.<br/>
                  С <a href={offer.path} className="offer__link">политикой</a> "Наименование Юр. лица" в отношении обработки персональных данных ознакомлен.
                </p>
                <button className="offer__button" onClick={handleOfferAcception}>Подтверждаю</button>
            </div>

        </div>
        )
}

export default Blocker
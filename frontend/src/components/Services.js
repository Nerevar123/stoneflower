import React from "react";

function Services() {
  return (
    <article id="services" className="services">
      <h2 className="content__title">Услуги</h2>
      <ul className="services__list list">
        <li className="services__list-item">
          <img className="services__image" />
          <h3 className="services__title">
            Производство керамических столешниц, мебели
          </h3>
          <p className="content__text">
            Кухонные столешницы и фартуки, мебель для ванной, подоконники.
            Столовая мебель с деревянными подстольями в классическом стиле
          </p>
        </li>
        <li className="services__list-item">
          <img className="services__image" />
          <h3 className="services__title">Реновация подоконников</h3>
          <p className="content__text">
            Экологичное использование старых подоконников: без демонтажа, без
            повреждения откосов и стен, облицовка керамическими «винирами» за
            один день
          </p>
        </li>
        <li className="services__list-item">
          <img className="services__image" />
          <h3 className="services__title">
            Отделка интерьеров. Фасадная и интерьерная подсветка
          </h3>
          <p className="content__text">
            Полы, стены и потолки из керамики. Контурная подсветка и встроенные
            светильники.
          </p>
        </li>
      </ul>
    </article>
  );
}

export default Services;

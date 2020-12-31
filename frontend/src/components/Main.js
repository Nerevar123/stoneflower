import React, {useState, useEffect} from 'react';
import Lead from './Lead';
import Advantages from './Advantages';
import Surfaces from './Surfaces';
import Services from './Services';
import Applicability from './Applicability';
import useWindowSize from "../hooks/useWindowSize";
import Disadvantages from './Disadvantages';
import Phases from './Phases';
import Pricing from './Pricing';
import Advices from './Advices';
import Portfolio from './Portfolio';

function Main({ services, advantagesText, advantagesIcons, applicabilityTable, disadvantagesContent, showModalWithImage, phasesIcons, pricingContent, surfacesContent, advicesContent, portfolioContent, showModalWithCarousel }) {
  const window = useWindowSize();
  return (
    <main className="content">
        <Lead />


        <Services
          elements={services}
        />


        <Advantages
          textContent={advantagesText}
          icons={advantagesIcons}
          showModal={showModalWithImage}
          image={applicabilityTable}
        />

        {window.width > 849 && (
        <Applicability
          table={applicabilityTable}
        />)}

        <Disadvantages
          tableItems = {disadvantagesContent}
        />

        <Phases
          phasesIcons={phasesIcons}
        />

        <Pricing
          content={pricingContent}
        />

        <Surfaces
          content={surfacesContent}
        />

        <Advices
          content={advicesContent}
        />

        <Portfolio
          content={portfolioContent}
          showModal={showModalWithCarousel}
        />

        {/*


         */}
        {/* <section className="portfolio">
        <h2 className="content__title">Портфолио</h2>
        <Karusel />
        </section>
        <section className="info">
          <article className="advices">
            <h2 className="content__title">Советы дизайнера</h2>
            <ul className="advices__list list">
              <li className="advices__list-item">
                <img className="advices__image" />
                <h5 className="advices__title">Заголовок первого совета</h5>
                <p className="content__text">Описание совета. Дальше будет рыбный текст. А также предприниматели в сети интернет являются только методом политического участия и заблокированы в рамках своих собственных рациональных ограничений. Не следует, однако, забывать, что граница обучения кадров обеспечивает актуальность соответствующих условий активизации. И нет сомнений, что независимые государства являются.</p>
                <button className="advices__button button">Подробнее</button>
              </li>
              <li className="advices__list-item">
                <img className="advices__image" />
                <h5 className="advices__title">Заголовок второго совета</h5>
                <p className="content__text">Описание совета. Дальше будет рыбный текст. А также предприниматели в сети интернет являются только методом политического участия и заблокированы в рамках своих собственных рациональных ограничений. Не следует, однако, забывать, что граница обучения кадров обеспечивает актуальность соответствующих условий активизации. И нет сомнений, что независимые государства являются.</p>
                <button className="advices__button button">Подробнее</button>
              </li>
              <li className="advices__list-item">
                <img className="advices__image" />
                <h5 className="advices__title">Заголовок третьего совета</h5>
                <p className="content__text">Описание совета. Дальше будет рыбный текст. А также предприниматели в сети интернет являются только методом политического участия и заблокированы в рамках своих собственных рациональных ограничений. Не следует, однако, забывать, что граница обучения кадров обеспечивает актуальность соответствующих условий активизации. И нет сомнений, что независимые государства являются.</p>
                <button className="advices__button button">Подробнее</button>
              </li>
            </ul>
          </article>
          <article className="suppliers">
            <h2 className="content__title">Производители листового керамического проката</h2>
            <p className="content__text">Мы используем лучшие материалы от надежных и проверенных поставщиков</p>
            <ul className="suppliers__list list">
              <li className="suppliers__list-item">
                <img className="suppliers__logo" />
              </li>
              <li className="suppliers__list-item">
                <img className="suppliers__logo" />
              </li>
              <li className="suppliers__list-item">
                <img className="suppliers__logo" />
              </li>
              <li className="suppliers__list-item">
                <img className="suppliers__logo" />
              </li>
              <li className="suppliers__list-item">
                <img className="suppliers__logo" />
              </li>
              <li className="suppliers__list-item">
                <img className="suppliers__logo" />
              </li>
            </ul>
          </article>
        </section>
        <section className="contact">
          <article className="contact__contacts">
            <h2 className="content__title">Наши контакты</h2>
          </article>
          <article className="contact__form">
            <h2 className="content__title">Оставить заявку</h2>
            <p className="content__text">Подберем оптимальное решение для вашего интерьера</p>
            <form className="form">
              <fieldset className="form__fieldset">
                <label htmlFor="name" className="form__label">Ваше имя
                  <Field
                    name="name"
                    type="text"
                    className={`form__input ${!!errors.name && !!touched.name && "form__input_type_error"}`}
                    placeholder="Иван Иванов" />
                  <ErrorMessage component="span" name="name" className="form__error font" />
                </label>
                <label htmlFor="tel" className="form__label">Номер телефона
                  <Field
                    name="tel"
                    type="tel"
                    className={`form__input font ${!!errors.tel && !!touched.tel && "form__input_type_error"}`}
                    placeholder="+7" />
                  <ErrorMessage component="span" name="tel" className="form__error font" />
                </label>
                <label htmlFor="poem" className="form__label">Описание задачи
                  <Field
                    name="description"
                    as="textarea"
                    className={`form__input font form__input_type_textarea ${errors.description && !!touched.description && "form__input_type_error"}`}
                    placeholder="Стихи" />
                  <ErrorMessage component="span" name="description" className="form__error font" />
                </label>
              </fieldset>
              <div className="form__button-field">
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className={cn("form__button", "button", {"form__button_disabled": !isValid || !dirty})}
                  text={'123'}
                >
                  {isSubmitting ? 'Подождите...' : 'Отправить форму'}
                </button>
                <span className="form__error font">{errors.submit}</span>
              </div>
            </form>
          </article>
        </section> */}
      </main>
  )
}

export default Main;

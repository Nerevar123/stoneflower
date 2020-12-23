import React, { useState, useEffect } from "react";
import { Router, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import { api } from "../utils/api";
import { servicesItems, advantagesTextContent, advantagesIconsList } from "../utils/config";

function App() {
  const history = useHistory();
  const [services, setServices] = useState([]);
  const [advantagesText, setAdvantegesText] = useState({});
  const [advantagesIcons, setAdvantegesIcons] = useState({});


  // useEffect(() => {
  //   Promise.all([api.getServices()])
  //     .then(([services]) => {
  //       console.log(services)
  //       setServices(services);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    setServices(servicesItems);
    setAdvantegesText(advantagesTextContent);
    setAdvantegesIcons(advantagesIconsList);
  },[]);

  return (
    <>
      <Router history={history} basename="/">
        <Header />
        <Main
        services={services}
        advantagesText={advantagesText}
        advantagesIcons={advantagesIcons}
        />
      </Router>
      {/* <main className="content">
        <section className="info">
          <article className="lead">
            <h1 className="lead__header">Студия Керамогранита «Каменный цветок»</h1>
            <ul className="lead__list list">
              <li className="lead__list-item">
                <p className="lead__text">Производство изделий из листового керамического проката</p>
              </li>
              <li className="lead__list-item">
                <p className="lead__text">Дизайн интерьеров</p>
              </li>
              <li className="lead__list-item">
                <p className="lead__text">Cветотехнические решения для дома</p>
              </li>
            </ul>
            <button className="lead__button button">Бесплатная консультация</button>
          </article>
          <article className="services">
            <h2 className="content__title">Услуги</h2>
            <ul className="services__list list">
              <li className="services__list-item">
                <img className="services__image" />
                <h3 className="services__title">Производство керамических столешниц, мебели</h3>
                <p className="content__text">Кухонные столешницы и фартуки, мебель для ванной, подоконники. Столовая мебель с деревянными подстольями в классическом стиле</p>
              </li>
              <li className="services__list-item">
                <img className="services__image" />
                <h3 className="services__title">Реновация подоконников</h3>
                <p className="content__text">Экологичное использование старых подоконников: без демонтажа, без повреждения откосов и стен, облицовка керамическими «винирами» за один день</p>
              </li>
              <li className="services__list-item">
                <img className="services__image" />
                <h3 className="services__title">Отделка интерьеров. Фасадная и интерьерная подсветка</h3>
                <p className="content__text">Полы, стены и потолки из керамики. Контурная подсветка и встроенные светильники.</p>
              </li>
            </ul>
          </article>
          <article className="advantages">
            <h2 className="content__title">Преимущества материала</h2>
            <p className="content__text">Мы работаем с листовым керамическим прокатом от ведущих производителей: Laminam, Cotto d’Este, Panaria, Florim, Thesize.  Это керамогранит  толщиной от 3 до 6 мм и размером листа от 3 до 4,5 кв. метров с уникальными механическими характеристиками и эстетикой. Инновационный материал: тонкий, прочный, экологически чистый. Применяется в качестве финишного покрытия в интерьерах, фасадах, при производстве мебели.</p>
            <ul className="advantages__list list">
              <li className="advantages__list-item">
                <img className="advantages__icon" />
                <p className="content__text">Обширная область применения</p>
              </li>
              <li className="advantages__list-item">
                <img className="advantages__icon" />
                <p className="content__text">Легко наносится на старую облицовку</p>
              </li>
              <li className="advantages__list-item">
                <img className="advantages__icon" />
                <p className="content__text">Прочный и гибкий матриал</p>
              </li>
              <li className="advantages__list-item">
                <img className="advantages__icon" />
                <p className="content__text">Гарантийный срок службы 20 лет</p>
              </li>
              <li className="advantages__list-item">
                <img className="advantages__icon" />
                <p className="content__text">Сертифицирован для дет. садов и мед. учреждений</p>
              </li>
              <li className="advantages__list-item">
                <img className="advantages__icon" />
                <p className="content__text">Не содержит токсичных веществ, экологичен</p>
              </li>
              <li className="advantages__list-item">
                <img className="advantages__icon" />
                <p className="content__text">Не горит, не впитывает влагу, не изменяет цвет</p>
              </li>
              <li className="advantages__list-item">
                <img className="advantages__icon" />
                <p className="content__text">Стойкий к щелочам и кислотам</p>
              </li>
            </ul>
            <div className="advantages__analogs">
              <h4 className="advantages__subtitle">Недостатки популярных аналогов в сегменте столешниц и фасадов</h4>
              <ul className="advantages__analogs-list">
                <li className="advantages__analogs-item">
                  <p className="content__text">Натуральный камень не обладает достаточной химической стойкостью: мрамор легко испортить вином или напитками, гранит облит оптическим эпоксидным составом, который царапается и мутнеет от  кислотосодержащих моющих средств</p>
                </li>
                <li className="advantages__analogs-item">
                  <p className="content__text">Кварцевый агломерат не защищён от ультрафиолета, поэтому светлые его виды могут пожелтеть на солнце</p>
                </li>
                <li className="advantages__analogs-item">
                  <p className="content__text">Большой удельный вес слэбов и плитки из натурального камня на фасадах зданий существенно увеличивают нагрузку на фундамент и при клеевом способе  крепления на фасаде не всегда выдерживают несколько погодных циклов</p>
                </li>
              </ul>
            </div>
          </article>
          <article className="surfaces">
            <h2 className="content__title">Варианты поверностей</h2>
            <p className="content__text">Помимо изображенных на поверхности материала природных и художественных ликов, разработанных  дизайнерами Италии и Испании, материал выполнен с разнообразными рельефами: полированный, шелковистый, матовый, повторяющий грубую обработанную поверхность дерева и камня.</p>
            <Link to="/" className="surfaaces__link link">Читать далее</Link>
            <ul className="surfaces__list list">
              <li className="surfaces__list-item">
                <img className="surfaces__image" />
                <button className="surfaces__button button">Дерево</button>
              </li>
              <li className="surfaces__list-item">
                <img className="surfaces__image" />
                <button className="surfaces__button button">Камень</button>
              </li>
              <li className="surfaces__list-item">
                <img className="surfaces__image" />
                <button className="surfaces__button button">Цемент</button>
              </li>
              <li className="surfaces__list-item">
                <img className="surfaces__image" />
                <button className="surfaces__button button">Дизайн</button>
              </li>
            </ul>
          </article>
          <article className="info__stages">
            <h2 className="content__title">Этапы работы</h2>
          </article>
          <article className="info__price">
            <h2 className="content__title">Расчет цены за изделия и услуги</h2>
            <p className="content__text">В связи с минимальным размером листа выбранного вами материала (как правило, это 3000 х 1000 мм, 3000 х 1500 мм), и особенностью его раскроя  конечная цена не поддается расчету, применяемому в отношении традиционных облицовочных материалов.</p>
            <p className="content__text">У нас часто проводятся акции на одиночные изделия из материалов, которыми мы располагаем в остатках.</p>
          </article>
        </section>
        <section className="portfolio">
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
        </section>
      </main> */}
      <footer className="footer">
        <img alt="Логотип" className="footer__logo logo" />
        <p className="footer__text">Студия керамогранита «Каменный Цветок»</p>
        <p className="footer__text">+7 (963) 782 23 47</p>
      </footer>
    </>
  );
}

export default App;

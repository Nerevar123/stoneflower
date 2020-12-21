import React from "react";

function Advantages() {
  return (
    <article className="advantages">
          <div className="advatages__info-block">
            <h2 className="content__title">Преимущества материала</h2>
            <p className="content__text">Мы работаем с листовым керамическим прокатом от ведущих производителей: Laminam, Cotto d’Este, Panaria, Florim, Thesize.  Это керамогранит  толщиной от 3 до 6 мм и размером листа от 3 до 4,5 кв. метров с уникальными механическими характеристиками и эстетикой. Инновационный материал: тонкий, прочный, экологически чистый. Применяется в качестве финишного покрытия в интерьерах, фасадах, при производстве мебели.</p>
            <a className="advantages__link link">Принципиальное отличие от традиционного керамогранита</a>
            <p className="content__text">Применяется технология горизонтального формования сырой керамической массы при формовании плиты и дальнейший прокат (давление 15 тонн на кв. метр), с последующим  обжигом и сушкой (традиционный керамогранит и керамическая плитка формуются
на вертикальных прессах с максимальным давлением 8 тонн).
В результате в структуре материала после обжига и сушки
не возникает пустот и, как следствие, остаточных напряжений (присущих традиционной технологии прессования в металлическую рамку), что улучшает прочностные и эксплуатационные характеристики, обеспечивает все свойства традиционного керамогранита при существенно меньшей толщине и многократно большей площади плиты. Появляются такие механические свойства, как гибкость и упругость в небольших амплитудах, не присущие другим керамическим материалам. Прокат толщиной 3 мм можно сгибать с радиусом 6 метров (например, оклеивание сводов тоннелей одним листом).</p>
            <a className="advanteges__link_type_navigation advantages__link link">таблица применимости</a>
            </div>
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
  );
}

export default Advantages;


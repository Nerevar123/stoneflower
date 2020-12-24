import servicesFurnitureImage from "../images/services-furniture.png";
import servicesSillImage from "../images/services-sill.png";
import servicesInteriorImage from "../images/services-interior.png";
import icon_1 from "../images/icons/advantages-icon-1.svg";
import icon_2 from "../images/icons/advantages-icon-2.svg";
import icon_3 from "../images/icons/advantages-icon-3.svg";
import icon_4 from "../images/icons/advantages-icon-4.svg";
import icon_5 from "../images/icons/advantages-icon-5.svg";
import icon_6 from "../images/icons/advantages-icon-6.svg";
import icon_7 from "../images/icons/advantages-icon-7.svg";
import icon_8 from "../images/icons/advantages-icon-8.svg";
import applicabilityTable from "../images/applicability-table.png";
import shieldWarning from "../images/ShieldWarning.svg";
import phaseIcon_1 from "../images/phases-images/1.svg";
import phaseIcon_2 from "../images/phases-images/2.svg";
import phaseIcon_3 from "../images/phases-images/3.svg";
import phaseIcon_4 from "../images/phases-images/4.svg";


export const servicesItems = [
  {
    image: servicesFurnitureImage,
    heading: "Производство керамических столешниц, мебели",
    description:
      "Кухонные столешницы и фартуки, мебель для ванной, подоконники. Столовая мебель с деревянными подстольями в классическом стиле",
    _id: "1",
  },
  {
    image: servicesSillImage,
    heading: "Реновация подоконников",
    description:
      "Экологичное использование старых подоконников: без демонтажа, без повреждения откосов и стен, облицовка керамическими «винирами» за один день",
    _id: "2",
  },
  {
    image: servicesInteriorImage,
    heading: "Отделка интерьеров. Фасадная и интерьерная подсветка",
    description:
      "Полы, стены и потолки из керамики. Контурная подсветка и встроенные светильники.",
    _id: "3",
  },
  {
    image: servicesInteriorImage,
    heading: "Отделка интерьеров. Фасадная и интерьерная подсветка",
    description:
      "Полы, стены и потолки из керамики. Контурная подсветка и встроенные светильники.",
    _id: "4",
  },
];

export const advantagesTextContent = {
  shortTextAccent: "листовым керамическим прокатом",
  shortTextBeforeAccent: "Мы работаем с ",
  shortTextAfterAccent:
    " от ведущих производителей: Laminam, Cotto d’Este, Panaria, Florim, Thesize. Это керамогранит толщиной от 3 до 6 мм и размером листа от 3 до 4,5 кв. метров с уникальными механическими характеристиками и эстетикой. Применяется в качестве финишного покрытия в интерьерах, фасадах, при производстве мебели.",
  linkText: `Принципиальное отличие
               от традиционного керамогранита`,
  expandedText:
    "Применяется технология горизонтального формования сырой керамической массы при формовании плиты и дальнейший прокат (давление 15 тонн на кв. метр), с последующим  обжигом и сушкой (традиционный керамогранит и керамическая плитка формуются на вертикальных прессах с максимальным давлением 8 тонн). В результате в структуре материала после обжига и сушки не возникает пустот и, как следствие, остаточных напряжений (присущих традиционной технологии прессования в металлическую рамку), что улучшает прочностные и эксплуатационные характеристики, обеспечивает все свойства традиционного керамогранита при существенно меньшей толщине и многократно большей площади плиты. Появляются такие механические свойства, как гибкость и упругость в небольших амплитудах, не присущие другим керамическим материалам. Прокат толщиной 3 мм можно сгибать с радиусом 6 метров (например, оклеивание сводов тоннелей одним листом).",
};

export const applicabilityTableImage = applicabilityTable;

export const advantagesIconsList = {
  icon_1: icon_1,
  icon_2: icon_2,
  icon_3: icon_3,
  icon_4: icon_4,
  icon_5: icon_5,
  icon_6: icon_6,
  icon_7: icon_7,
  icon_8: icon_8,
};

export const disadvantagesContentItems = [
  {
    image: shieldWarning,
    text: "Натуральный камень не обладает достаточной химической стойкостью: мрамор легко испортить вином или напитками, гранит облит оптическим эпоксидным составом, который царапается и мутнеет от кислотосодержащих моющих средств",
   _id: 1,
  },
  {
    image: shieldWarning,
    text: "Большой удельный вес слэбов и плитки из натурального камня на фасадах зданий существенно увеличивают нагрузку на фундамент и при клеевом способе крепления на фасаде не всегда выдерживают несколько погодных циклов",
    _id: 2,
  },
  {
    image: shieldWarning,
    text: "Кварцевый агломерат не защищён от ультрафиолета, поэтому светлые его виды могут пожелтеть на солнце",
    _id: 3,
  },
];

export const phasesIcons = {
  firstIcon: phaseIcon_1,
  secondIcon: phaseIcon_2,
  thirdIcon: phaseIcon_3,
  fourthIcon: phaseIcon_4,
}

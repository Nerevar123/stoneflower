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
import material_1 from "../images/surfaces/wood.png";
import material_2 from "../images/surfaces/stone.png";
import material_3 from "../images/surfaces/cement.png";
import material_4 from "../images/surfaces/designed.png";
import advice_1 from "../images/advices/advice_1.png";
import advice_2 from "../images/advices/advice_2.png";
import advice_3 from "../images/advices/advice_3.png";
import portfolio_1 from "../images/portfolio/portfolio_1.jpg";
import portfolio_2 from "../images/portfolio/portfolio_2.jpg";
import portfolio_3 from "../images/portfolio/portfolio_3.jpg";
import supplier_logo_1 from "../images/suppliers/1.png";
import supplier_logo_2 from "../images/suppliers/2.png";
import supplier_logo_3 from "../images/suppliers/3.png";
import supplier_logo_4 from "../images/suppliers/4.png";
import supplier_logo_5 from "../images/suppliers/5.png";
import supplier_logo_6 from "../images/suppliers/6.png";
import supplier_logo_7 from "../images/suppliers/7.png";
import supplier_logo_8 from "../images/suppliers/8.png";
import supplier_logo_9 from "../images/suppliers/9.png";
import supplier_logo_10 from "../images/suppliers/10.png";

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
    text:
      "Натуральный камень не обладает достаточной химической стойкостью: мрамор легко испортить вином или напитками, гранит облит оптическим эпоксидным составом, который царапается и мутнеет от кислотосодержащих моющих средств",
    _id: 1,
  },
  {
    image: shieldWarning,
    text:
      "Большой удельный вес слэбов и плитки из натурального камня на фасадах зданий существенно увеличивают нагрузку на фундамент и при клеевом способе крепления на фасаде не всегда выдерживают несколько погодных циклов",
    _id: 2,
  },
  {
    image: shieldWarning,
    text:
      "Кварцевый агломерат не защищён от ультрафиолета, поэтому светлые его виды могут пожелтеть на солнце",
    _id: 3,
  },
];

export const phasesIcons = {
  firstIcon: phaseIcon_1,
  secondIcon: phaseIcon_2,
  thirdIcon: phaseIcon_3,
  fourthIcon: phaseIcon_4,
};

export const pricing = {
  heading: "расчет цены на изделия и услуги",
  textMajor: `В связи с минимальным размером листа выбранного вами материала
    (как правило, это 3000 х 1000 мм, 3000 х 1500 мм), и особенностью его
    раскроя конечная цена не поддается расчету, применяемому в отношении
    традиционных облицовочных материалов.`,
  textMinor: `У нас часто проводятся акции на одиночные изделия из материалов,
    которыми мы располагаем в остатках.`,
  buttonText: "заказать расчет",
};

export const surfaces = {
  shortText: `Помимо изображенных на поверхности материала природных и художественных
  ликов, разработанных  дизайнерами Италии и Испании, материал выполнен
  с разнообразными рельефами: полированный,шелковистый, матовый,
  повторяющий грубую обработанную поверхность дерева и камня.`,
  expandedText: `Появились на рынке образцы, пропускающие свет, как фарфор.
  На вашем экране сложно увидеть реальную цветовую палитру, а рельеф
  и подавно не передается картинкой.  В нашем шоу-руме и при посещении
  объекта замерщиком с образцами материала вы оцените не только расцветку,
  но и поведение материала в месте его установки: блики, тактильность,
  сочетание с мебелью, освещением и другими компонентами вашего интерьера.`,
  linkTextMinimized: "Читать далее",
  linkTextExpanded: "Скрыть",
  materialsList: [
    {
      heading: "Дерево",
      image: material_1,
      _id: 0,
      materialExamples: [
        { _id: 0, image: material_1, description: "Название материала 1" },
        { _id: 1, image: material_1, description: "Название материала 2" },
        { _id: 2, image: material_1, description: "Название материала 3" },
        { _id: 3, image: material_1, description: "Название материала 4" },
        { _id: 4, image: material_1, description: "Название материала 5" },
        { _id: 5, image: material_1, description: "Название материала 6" },
      ],
    },
    {
      heading: "Камень",
      image: material_2,
      _id: 1,
      materialExamples: [
        { _id: 0, image: material_2, description: "Название материала 1" },
        { _id: 1, image: material_2, description: "Название материала 2" },
        { _id: 2, image: material_2, description: "Название материала 3" },
        { _id: 3, image: material_2, description: "Название материала 4" },
        { _id: 4, image: material_2, description: "Название материала 5" },
        { _id: 5, image: material_2, description: "Название материала 6" },
      ],
    },
    {
      heading: "Цемент",
      image: material_3,
      _id: 2,
      materialExamples: [
        { _id: 0, image: material_3, description: "Название материала 1" },
        { _id: 1, image: material_3, description: "Название материала 2" },
        { _id: 2, image: material_3, description: "Название материала 3" },
        { _id: 3, image: material_3, description: "Название материала 4" },
        { _id: 4, image: material_3, description: "Название материала 5" },
        { _id: 5, image: material_3, description: "Название материала 6" },
      ],
    },
    {
      heading: "Дизайн",
      image: material_4,
      _id: 3,
      materialExamples: [
        { _id: 0, image: material_4, description: "Название материала 1" },
        { _id: 1, image: material_4, description: "Название материала 2" },
        { _id: 2, image: material_4, description: "Название материала 3" },
        { _id: 3, image: material_4, description: "Название материала 4" },
        { _id: 4, image: material_4, description: "Название материала 5" },
        { _id: 5, image: material_4, description: "Название материала 6" },
      ],
    },
  ],
};

export const advices = [
  {
    image: advice_1,
    heading: "Заголовок совета",
    shortText:
      "Описание совета. Дальше будет рыбный текст. А также предприниматели в сети интернет являются только методом политического участия и заблокированы в рамках своих собственных рациональных ограничений. Не следует, однако, забывать, что граница обучения кадров обеспечивает актуальность соответствующих условий активизации. И нет сомнений, что независимые государства являются. Не следует, однако, забывать, что граница обучения кадров обеспечивает актуальность соответствующих условий активизации. И нет сомнений, что независимые государства являются.",
    expandedText:
      "Описание совета. Дальше будет рыбный текст. А также предприниматели в сети интернет являются только методом политического участия и заблокированы в рамках своих собственных рациональных ограничений. Не следует, однако, забывать, что граница обучения кадров обеспечивает актуальность соответствующих условий активизации. И нет сомнений, что независимые государства являются. Не следует, однако, забывать, что граница обучения кадров обеспечивает актуальность соответствующих условий активизации. И нет сомнений, что независимые государства являются.",
    linkTextExpanded: "Скрыть",
    linkTextMinimized: "Читать далее",
    _id: 1,
  },
  {
    image: advice_2,
    heading: "Заголовок совета",
    shortText:
      "Описание совета. Дальше будет рыбный текст. Дальше будет рыбный текст.Дальше будет рыбный текст.Дальше будет рыбный текст.Дальше будет рыбный текст.Дальше будет рыбный текст.Дальше будет рыбный текст.Дальше будет рыбный текст.Дальше будет рыбный текст.Дальше будет рыбный текст.Дальше будет рыбный текст.Дальше будет рыбный текст.Дальше будет рыбный текст.Дальше будет рыбный текст.Дальше будет рыбный текст.Дальше будет рыбный текст.А также предприниматели в сети интернет являются только методом политического участия и заблокированы в рамках своих собственных рациональных ограничений. Не следует, однако, забывать, что граница обучения кадров обеспечивает актуальность соответствующих условий активизации. И нет сомнений, что независимые государства являются. Не следует, однако, забывать, что граница обучения кадров обеспечивает актуальность соответствующих условий активизации. И нет сомнений, что независимые государства являются.",
    expandedText:
      "Описание совета. Дальше будет рыбный текст. А также предприниматели в сети интернет являются только методом политического участия и заблокированы в рамках своих собственных рациональных ограничений. Не следует, однако, забывать, что граница обучения кадров обеспечивает актуальность соответствующих условий активизации. И нет сомнений, что независимые государства являются. Не следует, однако, забывать, что граница обучения кадров обеспечивает актуальность соответствующих условий активизации. И нет сомнений, что независимые государства являются.",
    linkTextExpanded: "Скрыть",
    linkTextMinimized: "Читать далее",
    _id: 2,
  },
  {
    image: advice_3,
    heading: "Заголовок совета",
    shortText: "Описание совета. Дальше будет рыбный текст.",
    expandedText:
      "Описание совета. Дальше будет рыбный текст. А также предприниматели в сети интернет являются только методом политического участия и заблокированы в рамках своих собственных рациональных ограничений. Не следует, однако, забывать, что граница обучения кадров обеспечивает актуальность соответствующих условий активизации. И нет сомнений, что независимые государства являются. Не следует, однако, забывать, что граница обучения кадров обеспечивает актуальность соответствующих условий активизации. И нет сомнений, что независимые государства являются.",
    linkTextExpanded: "Скрыть",
    linkTextMinimized: "Читать далее",
    _id: 3,
  },
];

export const portfolio = [
  {
    image: portfolio_1,
    _id: 0,
  },
  {
    image: portfolio_2,
    _id: 1,
  },
  {
    image: portfolio_3,
    _id: 2,
  },
];

export const suppliers = {
  heading: "Производители",
  subheading:
    "Мы используем лучшие материалы от надежных и проверенных поставщиков",
  suppliersData: [
    {
      link: "https://www.laminam.com/en/",
      logo: supplier_logo_2,
      _id: 0,
    },
    {
      link: "https://www.thesize.es/en/",
      logo: supplier_logo_3,
      _id: 1,
    },
    {
      link: "https://www.thesize.es/en/",
      logo: supplier_logo_4,
      _id: 2,
    },
    {
      link: "https://www.cottodeste.it/",
      logo: supplier_logo_5,
      _id: 3,
    },
    {
      link: "https://www.cottodeste.it/",
      logo: supplier_logo_7,
      _id: 4,
    },
    {
      link: "https://www.ariostea.it/",
      logo: supplier_logo_8,
      _id: 5,
    },
    {
      link: "https://www.ariostea.it/",
      logo: supplier_logo_10,
      _id: 6,
    },
    {
      link: "https://www.florim.com/",
      logo: supplier_logo_9,
      _id: 7,
    },
    {
      link: "https://www.florim.com/",
      logo: supplier_logo_6,
      _id: 8,
    },
    {
      link: "https://www.panaria.it/collezione/zero3-eternity",
      logo: supplier_logo_1,
      _id: 9,
    },
  ],
};

export const postForm = {
  heading: "Оставить заявку",
  subHeading: "Подберем оптимальное решение для вашего интерьера",
  offerLink: "https://ya.ru",
};
export const contacts = {
  heading: "Наши контакты",
  address: "г. Ивантеевка, ул. Толмачева 1/2",
  phonePrimary: "+7 (915) 047 48 11",
  phoneAdditional: "+7 (963) 782 23 47",
  emailAddress: "fioredipietra@yandex.ru",
  howToGetText: "К нам можно добраться любым видом наземного транспорта:",
  byBusText:
    "От м. ВДНХ на маршруте 316 до остановки ул. Новая Слобода. Далее пересечь двор «П-образного» жилого дома до дальней от остановки секции, вход на углу дома.",
  byTrainText:
    "Москва Ярославская – Фрязино Пассажирская до остановки «Ивантеевка 2», далее пешком на восток через жилой массив к зданию с зелеными башенками на крыше, крыльцо с южного торца здания.",
  byVehicleText:
    "От Ярославского шоссе через ближайшие въезды в город Ивантеевку до ул. Карла Маркса. В навигаторе задайте «Студия Каменный цветок» или ул. «Карла Маркса, дом 2»",
  landmarksDescription:
    "Общие визуальные ориентиры: дом с бежевым фасадом и зелеными башенками на крыше, на кованых решетках входных дверей и окнах студии увидите наш логотип, тротуар тоже заметный, выложен цветной брусчаткой.",
};

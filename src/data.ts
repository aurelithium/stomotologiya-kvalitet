/**
 * Данные демо-сайта: направления, услуги, цены, FAQ, статьи, галерея, контакты и настройки.
 * Цены — строго из прайс-листа клиники (по состоянию на 25.12.2025). Базы данных нет — всё хранится в коде.
 *
 * Фото импортируются явно, чтобы Vite и Next.js находили файлы при сборке.
 * Файлы лежат в src/assets/images/ (и webp, и jpg-алиасы с теми же кадрами).
 */
import heroImg from "./assets/images/hero.svg";
import aboutImg from "./assets/images/about.svg";
import catSurgeryImg from "./assets/images/cat-surgery.svg";
import catImplantationImg from "./assets/images/cat-implantation.svg";
import catOrthopedicsImg from "./assets/images/cat-orthopedics.svg";
import catTherapyImg from "./assets/images/cat-therapy.svg";
import catChildrenImg from "./assets/images/cat-children.svg";
import catOrthodonticsImg from "./assets/images/cat-orthodontics.svg";
import catPeriodontologyImg from "./assets/images/cat-periodontology.svg";
import catDiagnosticsImg from "./assets/images/cat-diagnostics.svg";
import galleryRoomBlueImg from "./assets/images/gallery-room-blue.svg";
import galleryChairBackImg from "./assets/images/gallery-chair-back.svg";
import galleryRoomLightImg from "./assets/images/gallery-room-light.svg";
import galleryChairSideImg from "./assets/images/gallery-chair-side.svg";
import galleryConsultImg from "./assets/images/gallery-consult.svg";
import galleryXrayMonitorImg from "./assets/images/gallery-xray-monitor.svg";
import galleryEquipmentImg from "./assets/images/gallery-equipment.svg";
import galleryInstrumentsImg from "./assets/images/gallery-instruments.svg";
import articleBrushImg from "./assets/images/article-brush.svg";
import articleChildrenImg from "./assets/images/article-children.svg";
import articleHygieneImg from "./assets/images/article-hygiene.svg";

const PHOTOS: Record<string, string> = {
  "hero.webp": heroImg,
  "about.webp": aboutImg,
  "cat-surgery.webp": catSurgeryImg,
  "cat-implantation.webp": catImplantationImg,
  "cat-orthopedics.webp": catOrthopedicsImg,
  "cat-therapy.webp": catTherapyImg,
  "cat-children.webp": catChildrenImg,
  "cat-orthodontics.webp": catOrthodonticsImg,
  "cat-periodontology.webp": catPeriodontologyImg,
  "cat-diagnostics.webp": catDiagnosticsImg,
  "gallery-room-blue.webp": galleryRoomBlueImg,
  "gallery-chair-back.webp": galleryChairBackImg,
  "gallery-room-light.webp": galleryRoomLightImg,
  "gallery-chair-side.webp": galleryChairSideImg,
  "gallery-consult.webp": galleryConsultImg,
  "gallery-xray-monitor.webp": galleryXrayMonitorImg,
  "gallery-equipment.webp": galleryEquipmentImg,
  "gallery-instruments.webp": galleryInstrumentsImg,
  "article-brush.webp": articleBrushImg,
  "article-children.webp": articleChildrenImg,
  "article-hygiene.webp": articleHygieneImg,
};

/** URL фотографии. При сборке Vite встраивает файл в dist/index.html. */
export function img(name: string): string {
  const url = PHOTOS[name];
  if (!url) throw new Error(`Нет изображения src/assets/images/${name}`);
  return url;
}

// ───────────────────────── content ─────────────────────────
/**
 * Данные демо-сайта: направления, услуги, цены, галерея, статьи. База данных не используется.
 *
 * Цены — строго из предоставленного прайс-листа (по состоянию на 25.12.2025).
 * Тексты об услугах — нейтральные справочные формулировки без обещаний результата;
 * перед публикацией их должен проверить врач клиники (флаг reviewed = false).
 */

export type SeedCategory = {
  slug: string;
  title: string;
  shortDescription: string;
  intro: string;
  image: string;
  seoDescription: string;
};

export const SEED_CATEGORIES: SeedCategory[] = [
  {
    slug: "surgery",
    title: "Хирургия",
    shortDescription: "Удаление зубов, в том числе сложное, и консультация хирурга-имплантолога.",
    intro:
      "В хирургическом направлении клиники «Квалитет» проводится удаление зубов, включая дистопированные и сверхкомплектные, а также консультация хирурга-имплантолога. Необходимость и объём вмешательства врач определяет после осмотра и, при необходимости, диагностики.",
    image: img("cat-surgery.webp"),
    seoDescription:
      "Стоматологическая хирургия в Москве: удаление зуба, удаление дистопированного и сверхкомплектного зуба, консультация хирурга-имплантолога. Цены и запись в клинику «Квалитет».",
  },
  {
    slug: "implantation",
    title: "Имплантация",
    shortDescription: "Имплантация зубов, синус-лифтинг, костная пластика, удаление имплантата.",
    intro:
      "Направление включает имплантацию, а также сопутствующие хирургические процедуры — синус-лифтинг и костную пластику, и удаление имплантата по показаниям. План лечения составляется индивидуально после консультации и диагностики.",
    image: img("cat-implantation.webp"),
    seoDescription:
      "Имплантация зубов в Москве: имплантация, синус-лифтинг, костная пластика, удаление имплантата. Стоимость услуг и запись на консультацию в клинику «Квалитет».",
  },
  {
    slug: "orthopedics",
    title: "Ортопедия",
    shortDescription: "Виниры, керамические коронки, коронки на имплантатах, консультация ортопеда.",
    intro:
      "Ортопедическая стоматология занимается восстановлением зубов и зубных рядов с помощью протезов и накладок. В клинике доступны виниры, керамические коронки, коронки на имплантатах и консультация врача-ортопеда.",
    image: img("cat-orthopedics.webp"),
    seoDescription:
      "Ортопедическая стоматология в Москве: виниры, керамические коронки, коронки на имплантатах, консультация ортопеда. Цены и запись в клинику «Квалитет».",
  },
  {
    slug: "therapy",
    title: "Терапия",
    shortDescription: "Реставрация и восстановление зубов, профессиональная гигиена.",
    intro:
      "Терапевтическая стоматология — это лечение и восстановление зубов, а также профилактика. В направлении доступны реставрация зуба, восстановление зуба и профессиональная гигиена полости рта.",
    image: img("cat-therapy.webp"),
    seoDescription:
      "Терапевтическая стоматология в Москве: реставрация зуба, восстановление зуба, профессиональная гигиена. Стоимость услуг и запись в клинику «Квалитет».",
  },
  {
    slug: "children",
    title: "Детская стоматология",
    shortDescription: "Лечение кариеса и пульпита молочных зубов, профессиональная гигиена.",
    intro:
      "В клинике принимают не только взрослых, но и детей. В направлении доступны лечение кариеса молочных зубов, лечение пульпита молочного зуба и профессиональная гигиена молочных зубов.",
    image: img("cat-children.webp"),
    seoDescription:
      "Детская стоматология в Москве: лечение кариеса и пульпита молочных зубов, гигиена молочных зубов. Цены и запись на приём в клинику «Квалитет».",
  },
  {
    slug: "orthodontics",
    title: "Ортодонтия",
    shortDescription: "Консультация ортодонта и фиксация металлической брекет-системы.",
    intro:
      "Ортодонтия занимается исправлением положения зубов и прикуса. В клинике доступны консультация ортодонта и фиксация металлической брекет-системы. План лечения определяется врачом после осмотра и диагностики.",
    image: img("cat-orthodontics.webp"),
    seoDescription:
      "Ортодонтия в Москве: консультация ортодонта, фиксация металлической брекет-системы. Стоимость услуг и запись в клинику «Квалитет».",
  },
  {
    slug: "periodontology",
    title: "Пародонтология",
    shortDescription: "Консультация пародонтолога, пародонтологическая гигиена, закрытый кюретаж.",
    intro:
      "Пародонтология занимается состоянием тканей, окружающих зуб, — дёсен и костной ткани. В направлении доступны консультация пародонтолога, пародонтологическая гигиена и закрытый кюретаж пародонтального кармана.",
    image: img("cat-periodontology.webp"),
    seoDescription:
      "Пародонтология в Москве: консультация пародонтолога, пародонтологическая гигиена, закрытый кюретаж. Цены и запись в клинику «Квалитет».",
  },
  {
    slug: "diagnostics",
    title: "Диагностика",
    shortDescription: "ОПТГ и прицельный снимок зуба.",
    intro:
      "Диагностика помогает врачу точнее оценить ситуацию и спланировать лечение. По предоставленным данным клиника выполняет ОПТГ и прицельные снимки зубов. Стоимость диагностики уточняйте по телефону.",
    image: img("cat-diagnostics.webp"),
    seoDescription:
      "Стоматологическая диагностика в Москве: ОПТГ, прицельный снимок зуба. Запись в клинику «Квалитет».",
  },
];

export type ProcessKind = "consult" | "procedure" | "hygiene" | "diagnostics";

export const PROCESS_TEXT: Record<ProcessKind, string[]> = {
  consult: [
    "Врач беседует с вами: уточняет жалобы, пожелания и имеющуюся информацию о лечении.",
    "Проводит осмотр полости рта.",
    "При необходимости назначает дополнительную диагностику.",
    "Рассказывает о возможных вариантах лечения и ориентировочной стоимости.",
  ],
  procedure: [
    "Консультация и осмотр: врач оценивает ситуацию и при необходимости назначает диагностику.",
    "Врач обсуждает с вами план лечения, его этапы и стоимость до начала работы.",
    "Проводится процедура. Порядок и способ обезболивания врач определяет индивидуально.",
    "После приёма вы получаете рекомендации и, если нужно, план дальнейших визитов.",
  ],
  hygiene: [
    "Врач осматривает полость рта и обсуждает с вами пожелания.",
    "Проводится гигиеническая процедура. Её состав определяет врач.",
    "Врач даёт рекомендации по домашнему уходу.",
    "Вместе с врачом вы определяете, как часто имеет смысл приходить на профилактические визиты.",
  ],
  diagnostics: [
    "Врач определяет, какой вид снимка необходим в вашем случае.",
    "Выполняется снимок.",
    "Результат оценивает врач и обсуждает его с вами.",
  ],
};

export type SeedService = {
  slug: string;
  category: string;
  title: string;
  short: string;
  description: string;
  audience: string[];
  kind: ProcessKind;
  priceType: "fixed" | "from" | "range" | "none";
  priceMin?: number;
  priceMax?: number;
  priceNote?: string;
  featured?: boolean;
  faq: [string, string][];
};

export const SEED_SERVICES: SeedService[] = [
  // ───────── Хирургия
  {
    slug: "tooth-extraction",
    category: "surgery",
    title: "Удаление зуба",
    short: "Удаление зуба по показаниям врача.",
    description:
      "Удаление зуба проводится, когда сохранить его невозможно или нецелесообразно. Решение принимает врач по результатам осмотра и диагностики.\n\nПеред вмешательством врач обсудит с вами план, возможные варианты и рекомендации на период восстановления.",
    audience: [
      "Если врач рекомендовал удаление зуба",
      "Если зуб сильно разрушен и его восстановление невозможно — по заключению врача",
      "Если удаление необходимо при подготовке к протезированию или имплантации — по рекомендации специалиста",
    ],
    kind: "procedure",
    priceType: "fixed",
    priceMin: 10000,
    faq: [["Нужен ли снимок перед удалением?", "Необходимость диагностики определяет врач на консультации."]],
  },
  {
    slug: "complex-tooth-extraction",
    category: "surgery",
    title: "Удаление дистопированного, сверхкомплектного зуба",
    short: "Удаление зубов, расположенных нетипично, и лишних зубов.",
    description:
      "Дистопированный зуб — это зуб, расположенный в нетипичном положении; сверхкомплектный — зуб сверх обычного числа. Необходимость и способ удаления определяет хирург после осмотра и диагностики.",
    audience: [
      "Если зуб расположен нетипично в зубном ряду или челюсти",
      "Если обнаружен лишний (сверхкомплектный) зуб",
      "Если удаление рекомендовал хирург или ортодонт",
    ],
    kind: "procedure",
    priceType: "fixed",
    priceMin: 14000,
    faq: [
      [
        "Чем отличается от обычного удаления зуба?",
        "Сложность вмешательства зависит от положения зуба. Оценку проводит врач после осмотра и диагностики.",
      ],
    ],
  },
  {
    slug: "implantologist-consultation",
    category: "surgery",
    title: "Консультация хирурга-имплантолога",
    short: "Осмотр и обсуждение возможных вариантов лечения.",
    description:
      "На консультации хирург-имплантолог осматривает полость рта, выслушивает ваши жалобы и пожелания, оценивает необходимость дополнительной диагностики и рассказывает о возможных вариантах лечения.",
    audience: [
      "Если вы рассматриваете имплантацию",
      "Если нужна консультация по удалению зубов",
      "Если вы хотите получить дополнительное мнение специалиста",
    ],
    kind: "consult",
    priceType: "fixed",
    priceMin: 1000,
    featured: true,
    faq: [["Нужно ли что-то взять с собой?", "Если у вас есть ранее сделанные снимки или заключения врачей — возьмите их с собой."]],
  },
  // ───────── Имплантация
  {
    slug: "dental-implantation",
    category: "implantation",
    title: "Имплантация",
    short: "Установка имплантата для восстановления отсутствующего зуба.",
    description:
      "Имплантация — это установка искусственного корня зуба (имплантата) в костную ткань челюсти для последующего протезирования. Возможность и план лечения определяются индивидуально после консультации и диагностики.",
    audience: [
      "Если отсутствует один или несколько зубов",
      "Если врач рекомендует имплантацию как вариант восстановления зубного ряда",
    ],
    kind: "procedure",
    priceType: "from",
    priceMin: 80000,
    featured: true,
    priceNote: "Итоговую стоимость лечения врач называет после осмотра и составления плана.",
    faq: [
      [
        "Подходит ли имплантация всем?",
        "Нет. Решение принимает врач с учётом состояния здоровья и костной ткани. Имеются противопоказания, необходима консультация специалиста.",
      ],
    ],
  },
  {
    slug: "implant-removal",
    category: "implantation",
    title: "Удаление имплантата",
    short: "Удаление имплантата по показаниям врача.",
    description:
      "Удаление имплантата проводится по показаниям врача, например если установленный имплантат необходимо заменить или убрать. Необходимость и порядок вмешательства определяет хирург после осмотра и диагностики.",
    audience: [
      "Если врач рекомендовал удалить имплантат",
      "Если вы хотите обсудить состояние ранее установленного имплантата",
    ],
    kind: "procedure",
    priceType: "fixed",
    priceMin: 16000,
    faq: [
      [
        "Можно ли обратиться, если имплантат устанавливали в другой клинике?",
        "Для оценки ситуации нужна консультация специалиста. Запишитесь по телефону или через форму на сайте.",
      ],
    ],
  },
  {
    slug: "sinus-lifting",
    category: "implantation",
    title: "Синус-лифтинг",
    short: "Хирургическая подготовка верхней челюсти к имплантации.",
    description:
      "Синус-лифтинг — хирургическая процедура, направленная на увеличение объёма костной ткани в боковом отделе верхней челюсти. Применяется по показаниям врача при подготовке к имплантации.",
    audience: ["Если при планировании имплантации на верхней челюсти врач выявил недостаток костной ткани"],
    kind: "procedure",
    priceType: "from",
    priceMin: 15000,
    faq: [["Нужен ли синус-лифтинг перед каждой имплантацией?", "Нет. Необходимость процедуры определяет врач по результатам осмотра и диагностики."]],
  },
  {
    slug: "bone-grafting",
    category: "implantation",
    title: "Костная пластика",
    short: "Восстановление объёма костной ткани челюсти.",
    description:
      "Костная пластика — процедура восстановления объёма костной ткани челюсти. Назначается по показаниям врача, в том числе при подготовке к имплантации.",
    audience: ["Если врач выявил недостаток костной ткани при планировании лечения"],
    kind: "procedure",
    priceType: "from",
    priceMin: 20000,
    faq: [["Как понять, нужна ли костная пластика?", "Это определяет врач по результатам осмотра и диагностических снимков."]],
  },
  // ───────── Ортопедия
  {
    slug: "veneers",
    category: "orthopedics",
    title: "Виниры",
    short: "Тонкие накладки на переднюю поверхность зубов.",
    description:
      "Виниры — тонкие накладки на переднюю поверхность зубов, которые применяются для эстетического и функционального восстановления. Возможность установки и подходящий вариант определяет врач-ортопед после осмотра.",
    audience: [
      "Если вы хотите обсудить изменение формы или внешнего вида зубов",
      "Если врач рекомендует виниры как вариант восстановления",
    ],
    kind: "procedure",
    priceType: "from",
    priceMin: 50000,
    featured: true,
    faq: [["Подходят ли виниры всем?", "Нет. Показания и противопоказания определяет врач на консультации."]],
  },
  {
    slug: "orthopedist-consultation",
    category: "orthopedics",
    title: "Консультация врача-ортопеда",
    short: "Обсуждение вариантов протезирования и план лечения.",
    description:
      "На приёме врач-ортопед оценивает состояние зубов и зубных рядов, обсуждает варианты протезирования и составляет план лечения.",
    audience: [
      "Если вы планируете протезирование",
      "Если нужно восстановить утраченные или разрушенные зубы",
      "Если вы хотите узнать о вариантах коронок и виниров",
    ],
    kind: "consult",
    priceType: "range",
    priceMin: 1000,
    priceMax: 3000,
    faq: [["Почему стоимость указана диапазоном?", "Стоимость консультации находится в диапазоне 1 000–3 000 ₽. Точную сумму уточняйте у администратора при записи."]],
  },
  {
    slug: "implant-crown",
    category: "orthopedics",
    title: "Коронка на имплантате",
    short: "Ортопедическая конструкция на установленный имплантат.",
    description:
      "Коронка на имплантате — ортопедическая конструкция, которая крепится на установленный имплантат и восстанавливает видимую часть зуба. Вид конструкции и материал подбирает врач.",
    audience: ["Если вам установлен имплантат и нужно протезирование", "Если вы планируете имплантацию и хотите заранее обсудить этап протезирования"],
    kind: "procedure",
    priceType: "range",
    priceMin: 48000,
    priceMax: 60000,
    faq: [["Как узнать итоговую стоимость лечения?", "Итоговую стоимость с учётом всех этапов врач называет при составлении плана лечения."]],
  },
  {
    slug: "ceramic-crown",
    category: "orthopedics",
    title: "Керамическая коронка",
    short: "Коронка для восстановления формы и функции зуба.",
    description:
      "Керамическая коронка — ортопедическая конструкция, которая покрывает зуб и восстанавливает его форму и функцию. Материал и вид конструкции подбирает врач после осмотра.",
    audience: ["Если зуб значительно разрушен и нуждается в восстановлении", "Если врач рекомендовал коронку"],
    kind: "procedure",
    priceType: "range",
    priceMin: 55000,
    priceMax: 66000,
    faq: [["От чего зависит стоимость?", "Стоимость указана в диапазоне 55 000–66 000 ₽. Конкретную сумму врач согласует после осмотра и составления плана лечения."]],
  },
  // ───────── Терапия
  {
    slug: "tooth-restoration",
    category: "therapy",
    title: "Реставрация зуба",
    short: "Восстановление формы и внешнего вида зуба.",
    description:
      "Реставрация — восстановление формы, размера и внешнего вида зуба с помощью пломбировочных материалов. Объём работ определяет врач после осмотра.",
    audience: ["Если зуб повреждён или изменил форму", "Если вы хотите обсудить восстановление зуба"],
    kind: "procedure",
    priceType: "fixed",
    priceMin: 15000,
    faq: [["Сколько визитов потребуется?", "Количество визитов зависит от ситуации. Врач сообщит об этом после осмотра."]],
  },
  {
    slug: "tooth-rebuilding",
    category: "therapy",
    title: "Восстановление зуба",
    short: "Лечение и восстановление зуба, разрушенного кариесом или повреждённого.",
    description:
      "Восстановление зуба направлено на возвращение формы и функции зуба, поражённого кариесом или повреждённого. Метод и объём лечения определяет врач.",
    audience: ["Если вас беспокоит разрушенный или повреждённый зуб", "Если нужна консультация по лечению зуба"],
    kind: "procedure",
    priceType: "from",
    priceMin: 10000,
    faq: [["Почему цена указана «от»?", "Стоимость зависит от объёма лечения, который определяет врач после осмотра."]],
  },
  {
    slug: "professional-hygiene",
    category: "therapy",
    title: "Профессиональная гигиена зубов",
    short: "Комплекс процедур по удалению зубных отложений и налёта.",
    description:
      "Профессиональная гигиена — комплекс процедур по удалению зубных отложений и налёта в условиях клиники. Состав процедуры определяет врач.",
    audience: ["Если вы хотите поддерживать здоровье полости рта", "Если врач рекомендовал профессиональную чистку", "Для профилактических визитов"],
    kind: "hygiene",
    priceType: "fixed",
    priceMin: 9000,
    featured: true,
    faq: [["Как часто нужна профессиональная гигиена?", "Периодичность зависит от состояния полости рта. Рекомендацию даёт врач на осмотре."]],
  },
  // ───────── Детская стоматология
  {
    slug: "baby-teeth-caries",
    category: "children",
    title: "Лечение кариеса молочных зубов",
    short: "Лечение кариеса у детей.",
    description:
      "Молочные зубы также нуждаются во внимании: кариес может развиваться и у них. Метод лечения определяет врач после осмотра ребёнка.",
    audience: ["Если вы заметили изменения на молочных зубах ребёнка", "Если врач выявил кариес на профилактическом осмотре"],
    kind: "procedure",
    priceType: "fixed",
    priceMin: 6000,
    faq: [["С какого возраста можно приходить на приём?", "Возраст и особенности приёма уточняйте у администратора по телефону."]],
  },
  {
    slug: "baby-teeth-hygiene",
    category: "children",
    title: "Профессиональная гигиена молочных зубов",
    short: "Гигиенические процедуры для детей.",
    description:
      "Профессиональная гигиена молочных зубов — гигиеническая процедура в условиях клиники. Состав процедуры определяет врач с учётом возраста и состояния полости рта ребёнка.",
    audience: ["Для профилактических визитов ребёнка", "Если врач рекомендовал профессиональную гигиену ребёнку"],
    kind: "hygiene",
    priceType: "fixed",
    priceMin: 5000,
    faq: [["Нужно ли готовить ребёнка к визиту?", "Спокойно расскажите ребёнку о визите и приходите заранее. Рекомендации по подготовке даст администратор."]],
  },
  {
    slug: "baby-tooth-pulpitis",
    category: "children",
    title: "Лечение пульпита молочного зуба",
    short: "Лечение воспаления пульпы молочного зуба.",
    description:
      "Пульпит — воспаление пульпы зуба. Диагноз и метод лечения определяет врач после осмотра ребёнка и, при необходимости, диагностики.",
    audience: ["Если у ребёнка болит зуб — запишитесь на осмотр, не откладывая", "Если врач выявил пульпит молочного зуба"],
    kind: "procedure",
    priceType: "fixed",
    priceMin: 10000,
    faq: [["Что делать, если у ребёнка болит зуб?", "Обратитесь к стоматологу. Не занимайтесь самолечением; запишитесь по телефону."]],
  },
  // ───────── Ортодонтия
  {
    slug: "orthodontist-consultation",
    category: "orthodontics",
    title: "Консультация ортодонта",
    short: "Оценка прикуса и положения зубов, обсуждение вариантов лечения.",
    description:
      "На консультации ортодонт осматривает полость рта, оценивает положение зубов и прикус, обсуждает возможные варианты лечения и необходимость дополнительной диагностики.",
    audience: ["Если вас беспокоит положение зубов или прикус", "Если вы хотите узнать о вариантах ортодонтического лечения", "Для консультации по ребёнку или подростку"],
    kind: "consult",
    priceType: "fixed",
    priceMin: 2000,
    featured: true,
    faq: [["Нужно ли что-то готовить к консультации?", "Если есть снимки и заключения врачей — возьмите их с собой."]],
  },
  {
    slug: "metal-braces",
    category: "orthodontics",
    title: "Фиксация металлической брекет-системы",
    short: "Несъёмная ортодонтическая конструкция.",
    description:
      "Металлические брекеты — несъёмная ортодонтическая конструкция, которая применяется для исправления положения зубов и прикуса. Показания, план и сроки лечения определяет ортодонт после диагностики.",
    audience: ["Если ортодонт рекомендовал лечение брекет-системой"],
    kind: "procedure",
    priceType: "range",
    priceMin: 70000,
    priceMax: 100000,
    faq: [["Что входит в стоимость?", "Указана стоимость фиксации брекет-системы. Состав плана лечения и ведение уточняйте у ортодонта."]],
  },
  // ───────── Пародонтология
  {
    slug: "periodontist-consultation",
    category: "periodontology",
    title: "Консультация врача-пародонтолога",
    short: "Оценка состояния дёсен и тканей, окружающих зуб.",
    description:
      "Врач-пародонтолог оценивает состояние дёсен и тканей, окружающих зуб, обсуждает жалобы и предлагает план дальнейших действий.",
    audience: ["Если вас беспокоит состояние дёсен", "Если вы заметили кровоточивость дёсен", "Если нужна консультация по профилактике заболеваний дёсен"],
    kind: "consult",
    priceType: "fixed",
    priceMin: 1000,
    faq: [["Когда стоит записаться к пародонтологу?", "При появлении жалоб на состояние дёсен. Решение о необходимости лечения принимает врач."]],
  },
  {
    slug: "periodontal-hygiene",
    category: "periodontology",
    title: "Пародонтологическая гигиена зубов",
    short: "Гигиеническая процедура с учётом состояния дёсен.",
    description:
      "Пародонтологическая гигиена — гигиеническая процедура, которую проводят с учётом состояния тканей пародонта. Состав процедуры определяет врач.",
    audience: ["Если врач рекомендовал гигиену с учётом состояния дёсен", "Если вы наблюдаетесь у пародонтолога"],
    kind: "hygiene",
    priceType: "from",
    priceMin: 7000,
    faq: [["Чем отличается от обычной профессиональной гигиены?", "Состав процедуры определяет врач с учётом состояния дёсен. Подробности вам объяснят на приёме."]],
  },
  {
    slug: "closed-curettage",
    category: "periodontology",
    title: "Закрытый кюретаж пародонтального кармана",
    short: "Очищение пародонтальных карманов без рассечения дёсен.",
    description:
      "Закрытый кюретаж — процедура очищения пародонтальных карманов от отложений без рассечения дёсен. Назначается по показаниям врача-пародонтолога.",
    audience: ["Если врач-пародонтолог рекомендовал кюретаж"],
    kind: "procedure",
    priceType: "fixed",
    priceMin: 2000,
    faq: [["Кто принимает решение о проведении кюретажа?", "Врач-пародонтолог после осмотра и диагностики."]],
  },
  // ───────── Диагностика
  {
    slug: "opg",
    category: "diagnostics",
    title: "ОПТГ (ортопантомограмма)",
    short: "Панорамный рентгеновский снимок зубов и челюстей.",
    description:
      "ОПТГ — панорамный рентгеновский снимок зубов и челюстей, который позволяет врачу оценить общую картину состояния зубочелюстной системы и спланировать лечение.",
    audience: ["Если врач назначил панорамный снимок", "При планировании лечения — по рекомендации врача"],
    kind: "diagnostics",
    priceType: "none",
    priceNote: "Стоимость в предоставленном прайс-листе не указана — уточняйте у администратора.",
    faq: [["Сколько стоит ОПТГ?", "Стоимость уточняйте по телефону — в исходном прайс-листе она не указана."]],
  },
  {
    slug: "targeted-xray",
    category: "diagnostics",
    title: "Прицельный снимок зуба",
    short: "Рентгеновский снимок отдельного зуба.",
    description:
      "Прицельный снимок — рентгеновский снимок отдельного зуба или небольшого участка, который помогает врачу уточнить диагноз и спланировать лечение.",
    audience: ["Если врач назначил снимок конкретного зуба"],
    kind: "diagnostics",
    priceType: "none",
    priceNote: "Стоимость в предоставленном прайс-листе не указана — уточняйте у администратора.",
    faq: [["Нужно ли направление врача?", "Порядок выполнения снимков уточняйте у администратора по телефону."]],
  },
];

export const SEED_GALLERY: { image: string; caption: string; category: string }[] = [
  { image: img("gallery-room-blue.webp"), caption: "Стоматологический кабинет — иллюстративное фото", category: "cabinets" },
  { image: img("gallery-chair-back.webp"), caption: "Стоматологическое кресло — иллюстративное фото", category: "cabinets" },
  { image: img("gallery-room-light.webp"), caption: "Светлый стоматологический кабинет — иллюстративное фото", category: "cabinets" },
  { image: img("gallery-chair-side.webp"), caption: "Кабинет врача — иллюстративное фото", category: "cabinets" },
  { image: img("gallery-consult.webp"), caption: "Консультация врача и пациента — иллюстративное фото", category: "clinic" },
  { image: img("gallery-xray-monitor.webp"), caption: "Рентгеновский снимок на мониторе — иллюстративное фото", category: "equipment" },
  { image: img("gallery-equipment.webp"), caption: "Оснащение стоматологического кабинета — иллюстративное фото", category: "equipment" },
  { image: img("gallery-instruments.webp"), caption: "Стерильные инструменты — иллюстративное фото", category: "equipment" },
];

export type SeedArticle = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  category: string;
  relatedCategory: string;
  publishedAt: string;
  seoDescription: string;
};

export const SEED_ARTICLES: SeedArticle[] = [
  {
    slug: "home-oral-hygiene",
    title: "Домашний уход за полостью рта: основные принципы",
    excerpt: "Общие рекомендации по ежедневному уходу за зубами и дёснами. Индивидуальные советы вам даст стоматолог.",
    cover: img("article-brush.webp"),
    category: "Гигиена полости рта",
    relatedCategory: "therapy",
    publishedAt: "2026-01-15",
    seoDescription: "Основные принципы ежедневного ухода за зубами и дёснами: чистка зубов, межзубные промежутки, регулярные осмотры у стоматолога.",
    content: `Ежедневный уход за полостью рта — основа здоровья зубов и дёсен. Ниже собраны общие принципы; подробные рекомендации вам подберёт врач с учётом состояния вашей полости рта.

## Чистка зубов

- Чистите зубы два раза в день — утром и вечером.
- Выбирайте щётку, с которой вам удобно, а зубную пасту — по рекомендации стоматолога.
- Не забывайте про внутреннюю и жевательную поверхности зубов.

## Межзубные промежутки

Зубная щётка не всегда достаёт до межзубных промежутков. Для их очищения применяют зубную нить или ёршики. Какой способ подойдёт именно вам, подскажет врач.

## Регулярные осмотры

Профилактические осмотры помогают заметить проблемы на ранней стадии. Периодичность посещений врач определяет индивидуально.

## Когда стоит обратиться к врачу

Кровоточивость дёсен, боль, повышенная чувствительность зубов, неприятный запах изо рта — поводы записаться на консультацию. Не откладывайте визит и не занимайтесь самолечением.`,
  },
  {
    slug: "child-first-dentist-visit",
    title: "Первый визит ребёнка к стоматологу: на что обратить внимание",
    excerpt: "Почему полезно знакомить ребёнка со стоматологом заранее и как подготовиться к визиту.",
    cover: img("article-children.webp"),
    category: "Детская стоматология",
    relatedCategory: "children",
    publishedAt: "2026-01-22",
    seoDescription: "Как подготовить ребёнка к первому визиту к стоматологу: общие рекомендации для родителей.",
    content: `Многие специалисты рекомендуют знакомить ребёнка со стоматологом заранее, не дожидаясь жалоб. Точные сроки первого визита и периодичность осмотров подскажет врач.

## Зачем приходить без боли

Профилактический визит помогает ребёнку привыкнуть к обстановке клиники, а врачу — оценить состояние зубов и дать рекомендации по уходу.

## Как подготовиться

- Расскажите ребёнку о визите спокойно и без пугающих слов.
- Приходите заранее, чтобы ребёнок мог освоиться.
- Сообщите врачу о жалобах и особенностях здоровья ребёнка.

## Когда не стоит откладывать

Если ребёнок жалуется на боль, вы заметили изменения на зубах или дёснах, запишитесь на осмотр как можно раньше.`,
  },
  {
    slug: "professional-hygiene-explained",
    title: "Профессиональная гигиена: что это и чего ожидать",
    excerpt: "Кратко о том, как проходит профессиональная гигиена полости рта и зачем она нужна.",
    cover: img("article-hygiene.webp"),
    category: "Профилактика кариеса",
    relatedCategory: "therapy",
    publishedAt: "2026-02-03",
    seoDescription: "Что такое профессиональная гигиена полости рта и как проходит процедура в стоматологической клинике.",
    content: `Профессиональная гигиена — комплекс процедур по удалению налёта и зубных отложений, которые проводит врач в условиях клиники. Она дополняет домашний уход, но не заменяет его.

## Как это обычно проходит

1. Врач осматривает полость рта и обсуждает с вами пожелания.
2. Проводится гигиеническая процедура — её состав определяет врач.
3. Врач даёт рекомендации по домашнему уходу.

## Как часто приходить

Периодичность визитов зависит от состояния полости рта и определяется врачом индивидуально.

## Что важно знать

Состав процедуры и ощущения во время неё могут отличаться. Если у вас есть вопросы или особенности здоровья, сообщите о них врачу до начала.`,
  },
];

// ───────────────────────── constants ─────────────────────────
/** Подтверждённые исходные данные клиники и справочники сайта. */

export const TWO_GIS = {
  firm: "https://2gis.ru/moscow/firm/4504127917705609",
  info: "https://2gis.ru/moscow/firm/4504127917705609/tab/info",
  reviews: "https://2gis.ru/moscow/firm/4504127917705609/tab/reviews",
  prices: "https://2gis.ru/moscow/firm/4504127917705609/tab/prices",
  gallery: "https://2gis.ru/moscow/gallery/firm/4504127917705609",
  questions: "https://2gis.ru/moscow/firm/4504127917705609/tab/questions",
} as const;

export const DEFAULT_PHONES = [
  { label: "Основной", display: "+7 (499) 481-32-08", tel: "+74994813208" },
  { label: "Дополнительный", display: "+7 (499) 481-97-00", tel: "+74994819700" },
  { label: "Мобильный", display: "+7 (966) 019-41-19", tel: "+79660194119" },
];

export const GALLERY_CATEGORIES = [
  { value: "interior", label: "Интерьер" },
  { value: "cabinets", label: "Кабинеты" },
  { value: "equipment", label: "Оборудование" },
  { value: "clinic", label: "Клиника" },
  { value: "other", label: "Другое" },
] as const;

export const MEDICAL_DISCLAIMER =
  "Имеются противопоказания. Необходима консультация специалиста. Информация на сайте носит справочный характер и не заменяет приём врача.";

export const PRICE_DISCLAIMER = "Информация о ценах не является публичной офертой.";

// ───────────────────────── settings-types ─────────────────────────
export type SiteSettings = {
  siteName: string;
  tagline: string;
  logo: string;
  heroImage: string;
  aboutImage: string;
  seoTitle: string;
  seoDescription: string;
};

export type PhoneItem = { label: string; display: string; tel: string };
export type LinkItem = { label: string; url: string };

export type ContactSettings = {
  phones: PhoneItem[];
  email: string;
  address: string;
  workingHours: string;
  mapEmbedUrl: string;
  contactText: string;
  legalEntity: string;
  twoGisUrl: string;
  twoGisReviewsUrl: string;
  twoGisQuestionsUrl: string;
  twoGisPricesUrl: string;
  twoGisGalleryUrl: string;
  social: LinkItem[];
};

export type PaymentMethod = { key: string; title: string; description: string; enabled: boolean };
export type PaymentSettings = { methods: PaymentMethod[]; installmentsInfo: string };

export type PriceSettings = {
  /** Дата исходного прайса (YYYY-MM-DD) */
  sourceDate: string;
  /** Дата последнего изменения цен (ISO), если были изменения */
  updatedAt: string | null;
};

export type RatingSettings = { value: number; count: number; source: string };

export type AllSettings = {
  site: SiteSettings;
  contacts: ContactSettings;
  payments: PaymentSettings;
  prices: PriceSettings;
  rating: RatingSettings;
};

export const DEFAULT_SETTINGS: AllSettings = {
  site: {
    siteName: "Квалитет",
    tagline: "Стоматологическая клиника в Москве",
    logo: "",
    heroImage: img("hero.webp"),
    aboutImage: img("about.webp"),
    seoTitle: "Квалитет — стоматологическая клиника в Москве для взрослых и детей",
    seoDescription:
      "Квалитет — частная стоматологическая клиника в Москве: хирургия, имплантация, ортопедия, терапия, детская стоматология, ортодонтия, пародонтология и диагностика. Запись по телефону и онлайн.",
  },
  contacts: {
    phones: DEFAULT_PHONES,
    email: "",
    address: "",
    workingHours: "",
    mapEmbedUrl: "",
    contactText:
      "Запишитесь на приём по телефону или оставьте заявку на сайте — администратор свяжется с вами, чтобы согласовать удобное время.",
    legalEntity: "",
    twoGisUrl: TWO_GIS.firm,
    twoGisReviewsUrl: TWO_GIS.reviews,
    twoGisQuestionsUrl: TWO_GIS.questions,
    twoGisPricesUrl: TWO_GIS.prices,
    twoGisGalleryUrl: TWO_GIS.gallery,
    social: [],
  },
  payments: {
    methods: [
      { key: "card", title: "Банковская карта", description: "Оплата картой при посещении клиники.", enabled: true },
      { key: "cash", title: "Наличный расчёт", description: "Оплата наличными в кассе клиники.", enabled: true },
      { key: "qr", title: "Оплата по QR-коду", description: "Оплата через мобильное приложение банка по QR-коду.", enabled: true },
      { key: "installments", title: "Плати частями", description: "Возможность оплатить лечение частями.", enabled: true },
    ],
    installmentsInfo: "",
  },
  prices: { sourceDate: "2025-12-25", updatedAt: null },
  rating: { value: 4.9, count: 42, source: "2ГИС" },
};

// ───────────────────────── settings ─────────────────────────
/** Настройки демо-сайта хранятся в коде (src/lib/settings-types.ts → DEFAULT_SETTINGS). */
export function getSettings(): AllSettings {
  return DEFAULT_SETTINGS;
}

// ───────────────────────── data ─────────────────────────
/**
 * Источник данных демо-сайта: всё хранится в коде (src/data/seed.ts и src/lib/settings-types.ts),
 * база данных и серверная часть не используются.
 * Функции остаются асинхронными, чтобы страницы не зависели от способа хранения данных.
 */

export type FaqItem = { q: string; a: string };

export type Category = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  intro: string | null;
  image: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Service = {
  id: number;
  slug: string;
  categoryId: number;
  title: string;
  shortDescription: string;
  description: string | null;
  audience: string | null;
  process: string | null;
  preparation: string | null;
  contraindications: string | null;
  image: string | null;
  priceType: string;
  priceMin: number | null;
  priceMax: number | null;
  priceNote: string | null;
  faq: FaqItem[];
  seoTitle: string | null;
  seoDescription: string | null;
  sortOrder: number;
  published: boolean;
  featured: boolean;
  reviewed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ServiceWithCategory = Service & { categorySlug: string; categoryTitle: string; categoryImage: string | null };

export type Doctor = {
  id: number;
  slug: string;
  fullName: string;
  specialization: string;
  photo: string | null;
  education: string | null;
  qualification: string | null;
  experience: string | null;
  bio: string | null;
  serviceIds: number[];
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type GalleryItem = {
  id: number;
  image: string;
  caption: string | null;
  category: string;
  sortOrder: number;
  published: boolean;
};

export type Promotion = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  conditions: string | null;
  image: string | null;
  startsAt: string | null;
  endsAt: string | null;
  status: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string | null;
  category: string;
  relatedCategoryId: number | null;
  status: string;
  publishedAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Review = {
  id: number;
  authorName: string;
  rating: number;
  text: string;
  source: string;
  sourceUrl: string | null;
  reviewDate: string | null;
  sortOrder: number;
  published: boolean;
};

const STAMP = new Date("2026-01-15T00:00:00Z");

const CATEGORIES: Category[] = SEED_CATEGORIES.map((c, i) => ({
  id: i + 1,
  slug: c.slug,
  title: c.title,
  shortDescription: c.shortDescription,
  intro: c.intro,
  image: c.image,
  seoTitle: null,
  seoDescription: c.seoDescription,
  sortOrder: (i + 1) * 10,
  published: true,
  createdAt: STAMP,
  updatedAt: STAMP,
}));
const CATEGORY_BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

const SERVICES: ServiceWithCategory[] = SEED_SERVICES.map((s, i) => {
  const category = CATEGORY_BY_SLUG.get(s.category) as Category;
  return {
    id: i + 1,
    slug: s.slug,
    categoryId: category.id,
    title: s.title,
    shortDescription: s.short,
    description: s.description,
    audience: s.audience.map((a) => `- ${a}`).join("\n"),
    process: PROCESS_TEXT[s.kind].map((p, idx) => `${idx + 1}. ${p}`).join("\n"),
    preparation: null,
    contraindications: null,
    image: null,
    priceType: s.priceType,
    priceMin: s.priceMin ?? null,
    priceMax: s.priceMax ?? null,
    priceNote: s.priceNote ?? null,
    faq: s.faq.map(([q, a]) => ({ q, a })),
    seoTitle: null,
    seoDescription: null,
    sortOrder: (i + 1) * 10,
    published: true,
    featured: Boolean(s.featured),
    reviewed: false,
    createdAt: STAMP,
    updatedAt: STAMP,
    categorySlug: category.slug,
    categoryTitle: category.title,
    categoryImage: category.image,
  };
});

// Врачи, акции и отзывы намеренно пусты: подтверждённых данных нет, вымышленные не публикуем.
const DOCTORS: Doctor[] = [];
const PROMOTIONS: Promotion[] = [];
const REVIEWS: Review[] = [];

const GALLERY: GalleryItem[] = SEED_GALLERY.map((g, i) => ({
  id: i + 1,
  image: g.image,
  caption: g.caption,
  category: g.category,
  sortOrder: (i + 1) * 10,
  published: true,
}));

const ARTICLES: Article[] = SEED_ARTICLES.map((a, i) => ({
  id: i + 1,
  slug: a.slug,
  title: a.title,
  excerpt: a.excerpt,
  content: a.content,
  cover: a.cover,
  category: a.category,
  relatedCategoryId: CATEGORY_BY_SLUG.get(a.relatedCategory)?.id ?? null,
  status: "published",
  publishedAt: a.publishedAt,
  seoTitle: null,
  seoDescription: a.seoDescription,
  sortOrder: (i + 1) * 10,
  createdAt: STAMP,
  updatedAt: STAMP,
})).sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getServices(): ServiceWithCategory[] {
  return SERVICES;
}

export function getCategoryBySlug(slug: string) {
  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category) return null;
  return { category, services: SERVICES.filter((s) => s.categorySlug === slug) };
}

export function getServiceBySlug(categorySlug: string, slug: string) {
  const service = SERVICES.find((s) => s.slug === slug && s.categorySlug === categorySlug);
  if (!service) return null;
  const related = SERVICES.filter((s) => s.categorySlug === categorySlug && s.id !== service.id).slice(0, 4);
  return { service, related };
}

export function getDoctors(): Doctor[] {
  return DOCTORS;
}

export function getDoctorBySlug(slug: string): Doctor | null {
  return DOCTORS.find((d) => d.slug === slug) ?? null;
}

export function getGallery(): GalleryItem[] {
  return GALLERY;
}

export function getPromotions(): Promotion[] {
  return PROMOTIONS;
}

export function getArticles(): Article[] {
  return ARTICLES;
}

export function getArticleBySlug(slug: string): Article | null {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

export function getReviews(): Review[] {
  return REVIEWS;
}

export type BookingOptions = {
  categories: { slug: string; title: string }[];
  services: { id: number; title: string; categorySlug: string }[];
  doctors: { id: number; name: string }[];
};

export function getBookingOptions(): BookingOptions {
  return {
    categories: CATEGORIES.map((c) => ({ slug: c.slug, title: c.title })),
    services: SERVICES.map((s) => ({ id: s.id, title: s.title, categorySlug: s.categorySlug })),
    doctors: DOCTORS.map((d) => ({ id: d.id, name: d.fullName })),
  };
}

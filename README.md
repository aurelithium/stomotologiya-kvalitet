# Квалитет — сайт стоматологической клиники (демо)

Статический сайт на **Vite + React 19 + Tailwind CSS 4 + TypeScript**. Сборка даёт один самодостаточный файл `dist/index.html`: JavaScript, CSS, шрифты и фотографии встроены внутрь, внешних запросов нет. Его можно открыть двойным кликом или выложить на GitHub Pages.

Базы данных, админ-панели и серверной части нет — все данные лежат в коде.

## Команды

Нужен Node.js 22 или новее.

```bash
npm install
npm run dev        # разработка: http://localhost:5173
npm run build      # сборка → dist/index.html (+ dist/robots.txt)
npm run start      # предпросмотр собранного dist/ на http://localhost:3000
npm run typecheck  # проверка типов
```

## Публикация на GitHub Pages

1. Загрузите содержимое проекта в репозиторий (вместе с `.github/workflows/deploy.yml`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Отправьте изменения в ветку `main` — Actions выполнит `npm ci` и `npm run build` и опубликует папку `dist/`.

Папку `dist/` в Git загружать не нужно (она в `.gitignore`), её собирает GitHub Actions.

## Адреса страниц

Навигация построена на адресе после `#`, поэтому сайт работает на GitHub Pages из любой папки и без настройки сервера:

`index.html#/` · `#/services` · `#/services/surgery` · `#/services/surgery/tooth-extraction` · `#/prices` · `#/doctors` · `#/about` · `#/reviews` · `#/gallery` · `#/promotions` · `#/articles` · `#/articles/home-oral-hygiene` · `#/contacts` · `#/booking` · `#/privacy-policy` · `#/personal-data-consent`

Неизвестный адрес показывает страницу 404.

## Структура

```
index.html                  точка входа Vite: мета-теги, favicon, JSON-LD (Dentist)
vite.config.ts              base "./", singlefile, Tailwind, алиас "@" → src
scripts/serve.mjs           сервер предпросмотра dist/ (для GitHub Pages не нужен)
public/robots.txt           копируется в dist/
.github/workflows/deploy.yml
src/
  main.tsx, App.tsx         запуск и таблица маршрутов
  router.tsx                hash-роутер, Link, useSeo (title и description страницы)
  pages.tsx                 все страницы сайта
  data.ts                   данные: направления, услуги, цены, статьи, галерея, контакты, настройки
  format.ts                 форматирование цен, телефонов, дат
  index.css                 дизайн-токены (цвета, радиусы, тени) в @theme, шрифт Manrope
  components/
    client.tsx              интерактив: форма записи, шапка, каталог, прайс, галерея
    ui.tsx                  логотип, звёзды, FAQ, разметка текста
    shell.tsx               оболочка сайта: подвал, хлебные крошки, призыв к записи
    sections.tsx            блоки главной и контактов
  assets/images, assets/fonts
```

## Где менять данные

| Что | Где |
|---|---|
| Направления, услуги, цены, FAQ, статьи, галерея | `src/data.ts` |
| Телефоны, адрес, график работы, оплата, рейтинг, ссылки 2ГИС | `src/data.ts` → `DEFAULT_SETTINGS` |
| Врачи, акции, отзывы (сейчас пусты — вымышленных данных нет) | `src/data.ts` → `DOCTORS`, `PROMOTIONS`, `REVIEWS` |
| Цвета, радиусы, тени | `src/index.css` → блок `@theme` |
| Фотографии | `src/assets/images` (подключаются через `img("имя.webp")`) |

Тип цены хранится в данных: `fixed` (фиксированная), `from` («от»), `range` (диапазон), `none` (не указана). Цены — строго из прайс-листа клиники на 25.12.2025; для диагностики (ОПТГ, прицельный снимок) цена не указана.

## Ограничения

- **Форма записи — демонстрационная.** Она проверяет поля и показывает состояния, но ничего не отправляет и не сохраняет; пользователю об этом сообщается. Для реального приёма заявок нужен сервер или внешний сервис форм.
- **SEO.** Страницы — это адреса с `#`, поэтому поисковики видят их как один адрес. Заголовок и description обновляются при переходе, но отдельных индексируемых URL, `sitemap.xml` и разметки по страницам нет; в `index.html` есть только разметка `Dentist` без адреса, графика и рейтинга (они не подтверждены). Если нужно продвижение по страницам, понадобится предварительный рендеринг (отдельный HTML на каждую страницу).
- Фотографии — иллюстративные стоковые с [Pexels](https://www.pexels.com/license/) (бесплатное коммерческое использование); на них нет реальных кабинетов, врачей и пациентов клиники. Замените их своими: положите файлы в `src/assets/images` с теми же именами.
- Юридические страницы — шаблоны, их должны проверить клиника и юрист.

Источники фото (ID на pexels.com/photo/ID): `hero` 4269369 · `about` 5355863 · `cat-surgery` 3881410 · `cat-implantation` 6502343 · `cat-orthopedics` 39377366 · `cat-therapy` 6627573 · `cat-children` 7800560 · `cat-orthodontics` 6502301 · `cat-periodontology` 30551804 · `cat-diagnostics` 4270367 · `gallery-chair-back` 4269268 · `gallery-chair-side` 4269277 · `gallery-room-blue` 5355858 · `gallery-room-light` 5355920 · `gallery-equipment` 6502543 · `gallery-xray-monitor` 6501862 · `gallery-instruments` 6627671 · `gallery-consult` 4270093 · `article-hygiene` 30551803 · `article-brush` 6690859 · `article-children` 7800657.

## Что нужно получить от клиники

Адрес, график работы, реквизиты оператора персональных данных, список врачей (ФИО, фото, образование, квалификация), условия «Плати частями», собственные фотографии, проверенные врачом тексты об услугах, подтверждение актуальности цен.

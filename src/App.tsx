import { useEffect, useRef, type ReactElement } from "react";
import { SiteShell } from "@/components/shell";
import {
  AboutPage,
  ArticlesPage,
  BookingPage,
  ContactsPage,
  DoctorsPage,
  GalleryPage,
  HomePage,
  LegalPage,
  NotFoundPage,
  PricesPage,
  PromotionsPage,
  ReviewsPage,
  ServicesPage,
} from "@/pages";
import { useRoute, type Route } from "@/router";

/** Таблица маршрутов: /services/surgery → index.html#/services/surgery. Неизвестный адрес — страница 404. */
function renderPage({ segments, query }: Route): ReactElement {
  const [head, ...rest] = segments;
  const leaf = (page: ReactElement) => (rest.length === 0 ? page : <NotFoundPage />);

  switch (head) {
    case undefined:
      return <HomePage />;
    case "services":
      return <ServicesPage segments={rest} sp={query} />;
    case "doctors":
      return <DoctorsPage segments={rest} sp={query} />;
    case "articles":
      return <ArticlesPage segments={rest} sp={query} />;
    case "prices":
      return leaf(<PricesPage />);
    case "about":
      return leaf(<AboutPage />);
    case "reviews":
      return leaf(<ReviewsPage />);
    case "gallery":
      return leaf(<GalleryPage />);
    case "promotions":
      return leaf(<PromotionsPage />);
    case "contacts":
      return leaf(<ContactsPage />);
    case "booking":
      return leaf(<BookingPage sp={query} />);
    case "privacy-policy":
    case "personal-data-consent":
      return leaf(<LegalPage doc={head} />);
    default:
      return <NotFoundPage />;
  }
}

export default function App() {
  const route = useRoute();
  const first = useRef(true);

  // При смене страницы — к началу (или к якорю), фокус на содержимое для клавиатуры и скринридеров.
  useEffect(() => {
    if (route.to) document.getElementById(route.to)?.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: "instant" });
    if (!first.current) document.getElementById("main")?.focus({ preventScroll: true });
    first.current = false;
  }, [route.hash, route.to]);

  return <SiteShell>{renderPage(route)}</SiteShell>;
}

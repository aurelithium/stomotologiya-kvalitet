import { useEffect, useMemo, useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from "react";

/**
 * Минимальный роутер на адресе после «#» (hash-маршрутизация).
 * Сайт собирается в один index.html и открывается где угодно — с GitHub Pages, из папки, с любого пути:
 *   index.html#/            — главная
 *   index.html#/prices      — цены
 *   index.html#/services/surgery/tooth-extraction
 */
export type Query = Record<string, string>;
export type Route = { hash: string; path: string; segments: string[]; query: Query; to: string | null };

const decode = (s: string) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#/, "");
  const cut = raw.indexOf("?");
  const pathPart = cut === -1 ? raw : raw.slice(0, cut);
  const query: Query = Object.fromEntries(new URLSearchParams(cut === -1 ? "" : raw.slice(cut + 1)));
  const to = query.to ?? null; // «to» — якорь внутри страницы (id элемента)
  delete query.to;
  const segments = pathPart.split("/").filter(Boolean).map(decode);
  return { hash, path: `/${segments.join("/")}`, segments, query, to };
}

const subscribe = (notify: () => void) => {
  window.addEventListener("hashchange", notify);
  return () => window.removeEventListener("hashchange", notify);
};

export function useHash(): string {
  return useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => ""
  );
}

export function useRoute(): Route {
  const hash = useHash();
  return useMemo(() => parseHash(hash), [hash]);
}

export const usePath = () => useRoute().path;

/** "/contacts#payment" → "#/contacts?to=payment": второй «#» в адресе невозможен, поэтому якорь передаётся параметром. */
export function toHref(href: string): string {
  const i = href.indexOf("#");
  if (i === -1) return `#${href}`;
  const path = href.slice(0, i);
  return `#${path}${path.includes("?") ? "&" : "?"}to=${encodeURIComponent(href.slice(i + 1))}`;
}

function scrollToTarget(to: string | null) {
  if (to) document.getElementById(to)?.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/** Внутренняя ссылка сайта. */
export function Link({ href, onClick, target, ...rest }: LinkProps) {
  const hash = toHref(href);
  return (
    <a
      {...rest}
      target={target}
      href={hash}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || target === "_blank" || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        // Повторный клик по ссылке на текущую страницу не вызывает hashchange — прокручиваем вручную.
        if (hash === window.location.hash || (hash === "#/" && window.location.hash === "")) {
          e.preventDefault();
          scrollToTarget(parseHash(hash).to);
        }
      }}
    />
  );
}

/** Обработчик для якорей внутри страницы (ссылка «К содержимому», оглавление статьи). */
export const jump = (id: string) => (e: MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  el.focus({ preventScroll: true });
};

const BRAND = "Квалитет";

/** Заголовок вкладки и meta description для текущей страницы. */
export function useSeo(title: string, description?: string) {
  useEffect(() => {
    document.title = title.includes(BRAND) ? title : `${title} — ${BRAND}`;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}

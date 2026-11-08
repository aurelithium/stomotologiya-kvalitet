import {
  ArrowRight,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  ImageIcon,
  Info,
  Phone,
  ShieldCheck,
  TriangleAlert,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  BookButton,
  BookingForm,
  Gallery,
  PriceList,
  ServiceCard,
  ServiceCatalog,
  type PriceGroup,
} from "@/components/client";
import {
  AboutBlock,
  Advantages,
  BookingSection,
  CategoryGrid,
  ContactBlock,
  DoctorCard,
  DoctorsBlock,
  DoctorsEmpty,
  FeaturedServices,
  HeroSection,
  PaymentBlock,
  PricePreview,
  RatingCard,
  ReviewBlock,
  ReviewCard,
  TrustBlock,
} from "@/components/sections";
import { Breadcrumbs, CTASection, PageHero } from "@/components/shell";
import { extractHeadings, FAQ, RichText, SectionHeading, SmartImage } from "@/components/ui";
import {
  GALLERY_CATEGORIES,
  getArticleBySlug,
  getArticles,
  getCategories,
  getCategoryBySlug,
  getDoctorBySlug,
  getDoctors,
  getGallery,
  getPromotions,
  getReviews,
  getServiceBySlug,
  getServices,
  getSettings,
  MEDICAL_DISCLAIMER,
  PRICE_DISCLAIMER,
  type AllSettings,
} from "@/data";
import { formatDateRu, formatPrice, hasPrice, promoPeriod } from "@/format";
import { jump, Link, useSeo, type Query } from "@/router";

const NOT_FOUND_TITLE = "Страница не найдена";

// ───────────────────────── HomePage ─────────────────────────
export function HomePage() {
  useSeo(getSettings().site.seoTitle, getSettings().site.seoDescription);
  const settings = getSettings();
  const categories = getCategories();
  const services = getServices();
  const doctors = getDoctors();
  const gallery = getGallery();
  const reviews = getReviews();
  const featured = services.filter((s) => s.featured).slice(0, 6);
  const c = settings.contacts;

  return (
    <>
      <HeroSection settings={settings} categoriesCount={categories.length} />
      <TrustBlock settings={settings} />
      <CategoryGrid categories={categories} />
      <FeaturedServices services={featured} />
      <Advantages />
      <AboutBlock image={settings.site.aboutImage} />
      <DoctorsBlock doctors={doctors} phone={c.phones[0]} />
      <PricePreview services={services} sourceDate={settings.prices.sourceDate} />
      <ReviewBlock settings={settings} reviews={reviews} />

      {gallery.length > 0 && (
        <section className="section" aria-labelledby="gallery-title">
          <div className="container-page">
            <div id="gallery-title">
              <SectionHeading
                eyebrow="Фотогалерея"
                title="Фотографии"
                description="Иллюстративные изображения. Фотографии клиники будут добавлены после согласования."
                href="/gallery"
                hrefLabel="Вся галерея"
              />
            </div>
            <Gallery items={gallery} categories={[...GALLERY_CATEGORIES]} limit={6} columns="3" />
            <p className="mt-5 text-sm text-muted">
              Больше фотографий — в{" "}
              <Link href="/gallery" className="font-semibold text-brand-600 underline">
                галерее
              </Link>{" "}
              и{" "}
              <a href={c.twoGisGalleryUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-600 underline">
                карточке клиники в 2ГИС
              </a>
              .
            </p>
          </div>
        </section>
      )}

      <PaymentBlock payments={settings.payments} id="payment" />
      <BookingSection phones={c.phones} />

      <section className="section-tight" aria-labelledby="contacts-title">
        <div className="container-page">
          <div id="contacts-title">
            <SectionHeading eyebrow="Контакты" title="Как с нами связаться" href="/contacts" hrefLabel="Все контакты" />
          </div>
          <ContactBlock settings={settings} />
        </div>
      </section>
    </>
  );
}

// ───────────────────────── ServicesPage ─────────────────────────
/**
 * Один файл обслуживает три адреса:
 *   /services                         — каталог услуг
 *   /services/{направление}           — страница направления
 *   /services/{направление}/{услуга}  — страница услуги
 */
export function ServicesPage({ segments, sp }: { segments: string[]; sp: Query }) {
  if (segments.length > 2) return <NotFoundPage />;
  if (segments.length === 0) return <ServicesIndex sp={sp} />;
  if (segments.length === 1) return <CategoryView slug={segments[0]} />;
  return <ServiceView category={segments[0]} slug={segments[1]} />;
}

/* ───────────── /services ───────────── */

function ServicesIndex({ sp }: { sp: Record<string, string | string[] | undefined> }) {
  useSeo(
    "Услуги стоматологической клиники в Москве",
    "Каталог стоматологических услуг клиники «Квалитет» в Москве: хирургия, имплантация, ортопедия, терапия, детская стоматология, ортодонтия, пародонтология, диагностика. Цены и запись на приём."
  );
  const categories = getCategories();
  const services = getServices();
  const settings = getSettings();
  const phone = settings.contacts.phones[0];
  return (
    <>
      <PageHero
        title="Услуги клиники"
        description="Выберите направление или воспользуйтесь поиском. На странице каждой услуги — описание, стоимость и запись на приём."
        crumbs={[{ label: "Услуги" }]}
      />
      <section className="section-tight">
        <div className="container-page">
          <ServiceCatalog
            key={`${typeof sp.category === "string" ? sp.category : ""}|${typeof sp.q === "string" ? sp.q : ""}`}
            categories={categories.map((c) => ({ slug: c.slug, title: c.title }))}
            services={services.map((s) => ({
              id: s.id,
              slug: s.slug,
              title: s.title,
              shortDescription: s.shortDescription,
              categorySlug: s.categorySlug,
              categoryTitle: s.categoryTitle,
              priceType: s.priceType,
              priceMin: s.priceMin,
              priceMax: s.priceMax,
            }))}
            initialCategory={typeof sp.category === "string" ? sp.category : "all"}
            initialQuery={typeof sp.q === "string" ? sp.q.slice(0, 80) : ""}
            phone={phone}
          />
        </div>
      </section>
      <CTASection phone={phone} />
    </>
  );
}

/* ───────────── /services/{направление} ───────────── */

function CategoryView({ slug }: { slug: string }) {
  const data = getCategoryBySlug(slug);
  const allCategories = getCategories();
  const settings = getSettings();
  useSeo(
    data ? data.category.seoTitle || `${data.category.title} в Москве — услуги и цены` : NOT_FOUND_TITLE,
    data
      ? data.category.seoDescription || `${data.category.shortDescription} Клиника «Квалитет», Москва. Цены и запись на приём.`
      : undefined
  );
  if (!data) return <NotFoundPage />;
  const { category: c, services } = data;
  const others = allCategories.filter((x) => x.id !== c.id);

  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-brand-50 to-white">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs items={[{ label: "Услуги", href: "/services" }, { label: c.title }]} />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <div>
              <p className="eyebrow mb-3">Направление</p>
              <h1>{c.title}</h1>
              {c.intro && <p className="lead mt-5">{c.intro}</p>}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <BookButton preset={{ categorySlug: c.slug }} className="btn btn-primary btn-lg">
                  Записаться на приём
                </BookButton>
                <Link href="/prices" className="btn btn-secondary btn-lg">
                  Смотреть цены
                </Link>
              </div>
            </div>
            {c.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)]">
                <SmartImage src={c.image} alt={`Направление «${c.title}» — иллюстрация`} priority className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="cat-services">
        <div className="container-page">
          <h2 id="cat-services" className="mb-8">
            Услуги направления
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.id} className="reveal">
                <ServiceCard s={s} />
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-muted">{MEDICAL_DISCLAIMER}</p>
        </div>
      </section>

      <section className="section-tight bg-surface-alt" aria-labelledby="other-cats">
        <div className="container-page">
          <h2 id="other-cats" className="mb-6 text-2xl">
            Другие направления
          </h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.id}>
                <Link href={`/services/${o.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-5 font-semibold hover:border-brand-300 hover:bg-brand-50">
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection phone={settings.contacts.phones[0]} preset={{ categorySlug: c.slug }} />
      <section className="section-tight pt-0">
        <div className="container-page">
          <h2 className="mb-6 text-2xl">Контакты</h2>
          <ContactBlock settings={settings} withMap={false} />
        </div>
      </section>
    </>
  );
}

/* ───────────── /services/{направление}/{услуга} ───────────── */

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28">
      <h2 id={`${id}-h`} className="mb-5 text-[clamp(1.4rem,1.2rem+0.8vw,1.85rem)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ServiceView({ category, slug }: { category: string; slug: string }) {
  const data = getServiceBySlug(category, slug);
  const settings = getSettings();
  useSeo(
    data ? data.service.seoTitle || `${data.service.title} в Москве — цена и запись` : NOT_FOUND_TITLE,
    data
      ? data.service.seoDescription ||
          `${data.service.shortDescription}${hasPrice(data.service) ? ` Стоимость: ${formatPrice(data.service)}.` : ""} Клиника «Квалитет», Москва. Запишитесь на консультацию.`
      : undefined
  );
  if (!data) return <NotFoundPage />;
  const { service: s, related } = data;
  const phone = settings.contacts.phones[0];
  const priced = hasPrice(s);
  const image = s.image || s.categoryImage;

  const faq = [
    ...s.faq,
    {
      q: `Сколько стоит услуга «${s.title}»?`,
      a: priced
        ? `По прайс-листу клиники стоимость составляет ${formatPrice(s).replace(/\u00A0/g, " ")}. Итоговую стоимость врач называет после осмотра. ${PRICE_DISCLAIMER}`
        : "Стоимость этой услуги в опубликованном прайс-листе не указана. Уточните её у администратора по телефону.",
    },
    {
      q: "Как записаться на приём?",
      a: `Позвоните по телефону ${settings.contacts.phones.map((p) => p.display).join(", ")} или оставьте заявку на сайте.`,
    },
  ];


  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-brand-50 to-white">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs
            items={[
              { label: "Услуги", href: "/services" },
              { label: s.categoryTitle, href: `/services/${s.categorySlug}` },
              { label: s.title },
            ]}
          />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div>
              <p className="eyebrow mb-3">{s.categoryTitle} · Москва</p>
              <h1 className="text-[clamp(1.9rem,1.3rem+2.4vw,3.2rem)]">{s.title}</h1>
              <p className="lead mt-4">{s.shortDescription}</p>
              <p className="mt-6 text-3xl font-extrabold tracking-tight">
                {priced ? formatPrice(s) : <span className="text-lg text-muted">Стоимость уточняйте по телефону</span>}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <BookButton preset={{ serviceId: s.id }} className="btn btn-primary btn-lg">
                  Записаться на приём
                </BookButton>
                {phone && (
                  <a href={`tel:${phone.tel}`} className="btn btn-secondary btn-lg">
                    <Phone size={18} aria-hidden="true" /> {phone.display}
                  </a>
                )}
              </div>
            </div>
            {image && (
              <div className="relative aspect-[16/11] overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)]">
                <SmartImage src={image} alt={`${s.title} — иллюстрация`} priority className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 py-12 md:py-16 lg:grid-cols-[1fr_340px]">
        <article className="min-w-0 space-y-12">
          {s.description && (
            <Block id="about" title="Описание процедуры">
              <RichText text={s.description} />
            </Block>
          )}
          {s.audience && (
            <Block id="audience" title="Кому может быть полезна услуга">
              <RichText text={s.audience} />
            </Block>
          )}
          {s.process && (
            <Block id="process" title="Как проходит консультация или процедура">
              <RichText text={s.process} />
              <p className="mt-4 max-w-2xl text-sm text-muted">Порядок и состав процедуры врач определяет индивидуально.</p>
            </Block>
          )}
          {s.preparation && (
            <Block id="preparation" title="Подготовка">
              <RichText text={s.preparation} />
            </Block>
          )}
          {s.contraindications && (
            <Block id="contraindications" title="Противопоказания">
              <RichText text={s.contraindications} />
            </Block>
          )}

          <Block id="price" title="Стоимость">
            <div className="card max-w-2xl p-6">
              <p className="text-sm text-muted">{s.title}</p>
              <p className="mt-1 text-3xl font-extrabold">{priced ? formatPrice(s) : "Цена не указана"}</p>
              {s.priceNote && <p className="mt-3 text-sm">{s.priceNote}</p>}
              <p className="mt-3 text-xs text-muted">
                Цены по данным на {formatDateRu(settings.prices.sourceDate)}. {PRICE_DISCLAIMER} Актуальную стоимость уточняйте у администратора.
              </p>
              <Link href="/prices" className="link-arrow mt-4 text-sm">
                Весь прайс-лист
              </Link>
            </div>
          </Block>

          <FAQ items={faq} />

          <p className="max-w-2xl rounded-xl bg-accent-soft p-4 text-sm text-ink">{MEDICAL_DISCLAIMER}</p>
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Запись на услугу">
          <div className="card p-6">
            <p className="text-sm font-semibold text-muted">Стоимость</p>
            <p className="mt-1 text-3xl font-extrabold">{priced ? formatPrice(s) : "Уточняйте"}</p>
            <BookButton preset={{ serviceId: s.id }} className="btn btn-primary mt-5 w-full">
              <CalendarCheck size={18} aria-hidden="true" /> Записаться
            </BookButton>
            <ul className="mt-4 space-y-1">
              {settings.contacts.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="flex min-h-11 items-center gap-2 rounded-lg px-2 font-bold hover:bg-brand-50">
                    <Phone size={16} className="text-brand-600" aria-hidden="true" />
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section-tight bg-surface-alt" aria-labelledby="related-title">
          <div className="container-page">
            <h2 id="related-title" className="mb-8">
              Связанные услуги
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <ServiceCard key={r.id} s={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection phone={phone} preset={{ serviceId: s.id }} />
      <section className="section-tight pt-0">
        <div className="container-page">
          <h2 className="mb-6 text-2xl">Контакты</h2>
          <ContactBlock settings={settings} withMap={false} />
        </div>
      </section>
    </>
  );
}

// ───────────────────────── PricesPage ─────────────────────────
export function PricesPage() {
  useSeo("Цены на стоматологические услуги в Москве",
    "Прайс-лист стоматологической клиники «Квалитет» в Москве: хирургия, имплантация, ортопедия, терапия, детская стоматология, ортодонтия, пародонтология. Стоимость услуг и запись на приём.");
  const categories = getCategories();
  const services = getServices();
  const settings = getSettings();
  const groups: PriceGroup[] = categories
    .map((c) => ({
      slug: c.slug,
      title: c.title,
      items: services
        .filter((s) => s.categorySlug === c.slug)
        .map((s) => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          priceType: s.priceType,
          priceMin: s.priceMin,
          priceMax: s.priceMax,
          priceNote: s.priceNote,
        })),
    }))
    .filter((g) => g.items.length > 0);

  const priced = services.filter(hasPrice).length;
  const unpriced = services.length - priced;
  const { prices } = settings;

  return (
    <>
      <PageHero
        title="Цены на стоматологические услуги"
        description="Стоимость услуг клиники «Квалитет» по направлениям. Итоговую цену лечения врач называет после осмотра и составления плана."
        crumbs={[{ label: "Цены" }]}
      />

      <section className="section-tight">
        <div className="container-page">
          <div className="mb-8 grid gap-4 lg:grid-cols-3">
            <div className="card flex gap-4 p-5">
              <CalendarDays className="mt-0.5 shrink-0 text-brand-600" size={24} aria-hidden="true" />
              <div className="text-sm">
                <p className="font-bold">Дата обновления исходных цен</p>
                <p className="mt-1 text-muted">
                  <time dateTime={prices.sourceDate}>{formatDateRu(prices.sourceDate)}</time>
                  {prices.updatedAt && <> · изменения на сайте: {formatDateRu(prices.updatedAt)}</>}
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-card border border-amber-200 bg-amber-50 p-5">
              <TriangleAlert className="mt-0.5 shrink-0 text-amber-700" size={24} aria-hidden="true" />
              <div className="text-sm">
                <p className="font-bold text-amber-900">{PRICE_DISCLAIMER}</p>
                <p className="mt-1 text-amber-900/80">Стоимость может меняться — актуальную цену уточняйте у администратора перед записью.</p>
              </div>
            </div>
            <div className="card flex gap-4 p-5">
              <Info className="mt-0.5 shrink-0 text-brand-600" size={24} aria-hidden="true" />
              <div className="text-sm">
                <p className="font-bold">Как читать цены</p>
                <p className="mt-1 text-muted">
                  «от» — минимальная стоимость, «1 000–3 000 ₽» — диапазон. В прайсе {priced} {priced === 1 ? "позиция" : "позиции"} с ценой
                  {unpriced > 0 && ` и ${unpriced} без указанной цены (диагностика)`}.
                </p>
              </div>
            </div>
          </div>

          <PriceList groups={groups} />

          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted">
            Цены приведены по данным на {formatDateRu(prices.sourceDate)} и подлежат подтверждению клиникой. {PRICE_DISCLAIMER} {MEDICAL_DISCLAIMER}
          </p>
        </div>
      </section>

      <CTASection title="Нужна консультация по стоимости лечения?" text="Запишитесь на приём — врач осмотрит и подготовит план лечения с понятной стоимостью." phone={settings.contacts.phones[0]} />
    </>
  );
}

// ───────────────────────── DoctorsPage ─────────────────────────
/** /doctors — каталог специалистов, /doctors/{slug} — профиль врача. */
export function DoctorsPage({ segments, sp }: { segments: string[]; sp: Query }) {
  if (segments.length > 1) return <NotFoundPage />;
  if (segments.length === 1) return <DoctorProfile slug={segments[0]} />;
  return <DoctorsList sp={sp} />;
}

function DoctorsList({ sp }: { sp: Record<string, string | string[] | undefined> }) {
  useSeo(
    "Врачи стоматологической клиники в Москве",
    "Специалисты стоматологической клиники «Квалитет» в Москве. Выберите врача по специализации и запишитесь на приём."
  );
  const doctors = getDoctors();
  const settings = getSettings();
  const specs = Array.from(new Set(doctors.map((d) => d.specialization)));
  const spec = typeof sp.spec === "string" && specs.includes(sp.spec) ? sp.spec : "";
  const list = spec ? doctors.filter((d) => d.specialization === spec) : doctors;
  const phone = settings.contacts.phones[0];

  return (
    <>
      <PageHero
        title="Врачи клиники"
        description="Каталог специалистов. Мы публикуем только проверенную информацию о враче: образование, повышение квалификации и опыт работы."
        crumbs={[{ label: "Врачи" }]}
      />
      <section className="section-tight">
        <div className="container-page">
          {doctors.length === 0 ? (
            <DoctorsEmpty phone={phone} />
          ) : (
            <>
              {specs.length > 1 && (
                <nav aria-label="Фильтр по специализации" className="mb-8 flex flex-wrap gap-2">
                  {[{ label: "Все специалисты", value: "" }, ...specs.map((s) => ({ label: s, value: s }))].map((f) => {
                    const on = spec === f.value;
                    return (
                      <Link
                        key={f.value || "all"}
                        href={f.value ? `/doctors?spec=${encodeURIComponent(f.value)}` : "/doctors"}
                        aria-current={on ? "true" : undefined}
                        className={`inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors ${
                          on ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-white hover:border-brand-300 hover:bg-brand-50"
                        }`}
                      >
                        {f.label}
                      </Link>
                    );
                  })}
                </nav>
              )}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {list.map((d) => (
                  <DoctorCard key={d.id} d={d} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <CTASection phone={phone} />
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function DoctorProfile({ slug }: { slug: string }) {
  const d = getDoctorBySlug(slug);
  const allServices = getServices();
  const settings = getSettings();
  useSeo(
    d ? `${d.fullName} — ${d.specialization}` : NOT_FOUND_TITLE,
    d ? `${d.fullName}, ${d.specialization} клиники «Квалитет» в Москве. Запись на приём.` : undefined
  );
  if (!d) return <NotFoundPage />;
  const services = allServices.filter((s) => d.serviceIds.includes(s.id));


  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-brand-50 to-white">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs items={[{ label: "Врачи", href: "/doctors" }, { label: d.fullName }]} />
          <div className="mt-8 grid gap-8 md:grid-cols-[280px_1fr] md:items-center lg:grid-cols-[340px_1fr] lg:gap-14">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[1.75rem] bg-brand-50 shadow-[var(--shadow-lift)] md:max-w-none">
              {d.photo ? (
                <SmartImage src={d.photo} alt={`${d.fullName}, ${d.specialization}`} priority className="object-cover" />
              ) : (
                <span className="grid h-full place-items-center text-brand-300">
                  <UserRound size={110} strokeWidth={1.1} aria-hidden="true" />
                </span>
              )}
            </div>
            <div>
              <p className="eyebrow mb-3">{d.specialization}</p>
              <h1>{d.fullName}</h1>
              {d.experience && <p className="lead mt-4">{d.experience}</p>}
              <div className="mt-7">
                <BookButton preset={{ doctorId: d.id }} className="btn btn-primary btn-lg">
                  Записаться к врачу
                </BookButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page max-w-4xl space-y-10 py-12 md:py-16">
        {d.bio && (
          <Section title="О враче">
            <RichText text={d.bio} />
          </Section>
        )}
        {d.education && (
          <Section title="Образование">
            <RichText text={d.education} />
          </Section>
        )}
        {d.qualification && (
          <Section title="Повышение квалификации">
            <RichText text={d.qualification} />
          </Section>
        )}
        {services.length > 0 && (
          <Section title="Услуги врача">
            <ul className="grid gap-2 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.categorySlug}/${s.slug}`} className="flex min-h-12 items-center rounded-xl border border-line px-4 font-semibold hover:border-brand-300 hover:bg-brand-50">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>
      <CTASection phone={settings.contacts.phones[0]} preset={{ doctorId: d.id }} />
    </>
  );
}

// ───────────────────────── AboutPage ─────────────────────────
const STEPS = [
  { t: "Запись", d: "Вы звоните в клинику или оставляете заявку на сайте — администратор согласовывает удобное время." },
  { t: "Консультация", d: "Врач выслушивает ваши жалобы, осматривает полость рта и при необходимости назначает диагностику." },
  { t: "План лечения", d: "Врач рассказывает о возможных вариантах лечения, этапах и ориентировочной стоимости." },
  { t: "Лечение и наблюдение", d: "После согласования плана проводится лечение. Врач даёт рекомендации по уходу и дальнейшим визитам." },
];

export function AboutPage() {
  useSeo("О клинике «Квалитет»",
    "«Квалитет» — частная стоматологическая клиника в Москве для взрослых и детей. Направления лечения, порядок первого приёма, контакты.");
  const categories = getCategories();
  const settings = getSettings();
  return (
    <>
      <PageHero
        title="О клинике «Квалитет»"
        description="Частная стоматологическая клиника в Москве. Мы принимаем взрослых и детей и предлагаем лечение по нескольким направлениям в одном месте."
        crumbs={[{ label: "О клинике" }]}
      />

      <section className="section-tight">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)]">
            <SmartImage
              src={settings.site.aboutImage}
              alt="Стоматологический кабинет с креслом и оборудованием (иллюстративное фото)"
              priority
              className="object-cover"
            />
          </div>
          <div>
            <h2>Спокойный подход к лечению</h2>
            <div className="mt-5 space-y-4 text-lg text-muted">
              <p>
                В «Квалитет» можно получить консультацию по разным стоматологическим направлениям: от терапии и гигиены до хирургии, имплантации,
                ортопедии, ортодонтии и пародонтологии. Отдельное направление — детская стоматология.
              </p>
              <p>
                Мы стремимся, чтобы пациент понимал, что и зачем делается: врач объясняет план лечения и согласует его до начала работы.
              </p>
            </div>
            <p className="mt-5 text-xs text-muted">Иллюстративное фото. Фотографии клиники будут добавлены после согласования.</p>
          </div>
        </div>
      </section>

      <section className="section-tight bg-surface-alt" aria-labelledby="about-dir">
        <div className="container-page">
          <h2 id="about-dir" className="mb-8">
            Направления клиники
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/services/${c.slug}`} className="group card card-hover flex h-full flex-col p-5">
                  <span className="text-lg font-bold">{c.title}</span>
                  <span className="mt-1.5 line-clamp-2 text-sm text-muted">{c.shortDescription}</span>
                  <span className="link-arrow mt-4 pt-1 text-sm">
                    Подробнее <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="about-steps">
        <div className="container-page">
          <h2 id="about-steps" className="mb-8">
            Как проходит первое обращение
          </h2>
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t} className="card relative p-6">
                <span className="grid size-10 place-items-center rounded-full bg-brand-600 text-lg font-extrabold text-white">{i + 1}</span>
                <h3 className="mt-4 text-lg">{s.t}</h3>
                <p className="mt-2 text-sm text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-muted">Порядок приёма может отличаться в зависимости от направления и ситуации — детали уточняйте у администратора.</p>
        </div>
      </section>

      <Advantages />
      <CTASection phone={settings.contacts.phones[0]} />
      <section className="section-tight pt-0">
        <div className="container-page">
          <h2 className="mb-6 text-2xl">Контакты</h2>
          <ContactBlock settings={settings} withMap={false} />
        </div>
      </section>
    </>
  );
}

// ───────────────────────── ReviewsPage ─────────────────────────
export function ReviewsPage() {
  useSeo("Отзывы о клинике «Квалитет»",
    "Рейтинг клиники «Квалитет» в 2ГИС — 4,9 из 5 на основании 42 оценок. Отзывы пациентов в первоисточнике.");
  const settings = getSettings();
  const reviews = getReviews();
  const c = settings.contacts;
  return (
    <>
      <PageHero
        title="Отзывы о клинике"
        description="Мы показываем только подтверждённые данные — рейтинг и оценки из карточки клиники в 2ГИС."
        crumbs={[{ label: "Отзывы" }]}
      />
      <section className="section-tight">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,440px)_1fr]">
            <RatingCard settings={settings} />
            <div className="card p-7 sm:p-9">
              <h2 className="text-2xl">Где читать отзывы пациентов</h2>
              <p className="mt-3 text-muted">
                Все отзывы пациентов размещены в карточке клиники в 2ГИС. Там же можно оставить собственный отзыв, задать вопрос клинике и посмотреть
                фотографии.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={c.twoGisReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Читать отзывы в 2ГИС
                </a>
                <a href={c.twoGisQuestionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Вопросы клинике
                </a>
              </div>
              <p className="mt-6 flex gap-3 rounded-xl bg-brand-50 p-4 text-sm text-muted">
                <Info size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                <span>
                  Число {settings.rating.count} — это количество оценок пользователей, а не количество текстовых отзывов.
                </span>
              </p>
            </div>
          </div>

          {reviews.length > 0 && (
            <div className="mt-14">
              <h2 className="mb-6">Опубликованные отзывы</h2>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((r) => (
                  <ReviewCard key={r.id} r={r} />
                ))}
              </div>
              <p className="mt-5 text-xs text-muted">Отзывы публикуются с указанием источника и проверяются администратором сайта.</p>
            </div>
          )}
        </div>
      </section>
      <CTASection phone={c.phones[0]} />
    </>
  );
}

// ───────────────────────── GalleryPage ─────────────────────────
export function GalleryPage() {
  useSeo("Фотогалерея стоматологической клиники",
    "Фотографии стоматологической клиники «Квалитет»: кабинеты, интерьер, оборудование.");
  const items = getGallery();
  const settings = getSettings();
  return (
    <>
      <PageHero
        title="Фотогалерея"
        description="Фотографии кабинетов, интерьера и оборудования. Нажмите на фото, чтобы увеличить."
        crumbs={[{ label: "Фотогалерея" }]}
      />
      <section className="section-tight">
        <div className="container-page">
          <p className="mb-8 flex gap-3 rounded-xl bg-brand-50 p-4 text-sm text-muted">
            <ImageIcon size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
            <span>
              Часть изображений — иллюстративные стоковые фотографии: на них не показаны реальные кабинеты или специалисты клиники. Фотографии
              «Квалитет» появятся здесь после согласования. Больше фото — в{" "}
              <a href={settings.contacts.twoGisGalleryUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-600 underline">
                карточке клиники в 2ГИС
              </a>
              .
            </span>
          </p>
          {items.length > 0 ? (
            <Gallery items={items} categories={[...GALLERY_CATEGORIES]} showFilter />
          ) : (
            <div className="card p-10 text-center text-muted">Фотографии скоро появятся в галерее.</div>
          )}
        </div>
      </section>
      <CTASection phone={settings.contacts.phones[0]} />
    </>
  );
}

// ───────────────────────── PromotionsPage ─────────────────────────
export function PromotionsPage() {
  useSeo("Акции и специальные предложения",
    "Акции и специальные предложения стоматологической клиники «Квалитет» в Москве.");
  const promos = getPromotions();
  const settings = getSettings();
  const phone = settings.contacts.phones[0];
  return (
    <>
      <PageHero
        title="Акции и специальные предложения"
        description="Здесь публикуются действующие акции клиники с условиями и сроками."
        crumbs={[{ label: "Акции" }]}
      />
      <section className="section-tight">
        <div className="container-page">
          {promos.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {promos.map((p) => {
                const period = promoPeriod(p.startsAt, p.endsAt);
                return (
                  <article key={p.id} className="card flex flex-col overflow-hidden">
                    {p.image && (
                      <div className="relative aspect-[16/10] bg-brand-50">
                        <SmartImage src={p.image} alt={p.title} className="object-cover" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      {period && (
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-600">
                          <CalendarClock size={15} aria-hidden="true" /> {period}
                        </p>
                      )}
                      <h2 className="mt-2 text-xl">{p.title}</h2>
                      <p className="mt-2 text-sm text-muted">{p.summary}</p>
                      {p.conditions && (
                        <details className="mt-4 rounded-xl border border-line p-3">
                          <summary className="font-semibold">Подробные условия</summary>
                          <RichText text={p.conditions} className="mt-3 !text-sm" />
                        </details>
                      )}
                      <BookButton className="btn btn-primary btn-sm mt-auto">Записаться</BookButton>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="card mx-auto max-w-2xl p-8 text-center sm:p-12">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent-soft text-accent">
                <CalendarClock size={30} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl">Сейчас на сайте нет активных акций</h2>
              <p className="mt-3 text-muted">
                Информацию о специальных предложениях можно уточнить по телефону — администратор расскажет о действующих условиях.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                {phone && (
                  <a href={`tel:${phone.tel}`} className="btn btn-primary">
                    <Phone size={18} aria-hidden="true" /> {phone.display}
                  </a>
                )}
                <BookButton className="btn btn-secondary">Записаться на приём</BookButton>
              </div>
            </div>
          )}
        </div>
      </section>
      <CTASection phone={phone} />
    </>
  );
}

// ───────────────────────── ArticlesPage ─────────────────────────
/** /articles — список статей, /articles/{slug} — отдельная статья. */
export function ArticlesPage({ segments, sp }: { segments: string[]; sp: Query }) {
  if (segments.length > 1) return <NotFoundPage />;
  if (segments.length === 1) return <ArticleView slug={segments[0]} />;
  return <ArticlesList sp={sp} />;
}

function ArticlesList({ sp }: { sp: Record<string, string | string[] | undefined> }) {
  useSeo(
    "Полезные статьи о здоровье зубов",
    "Статьи о гигиене полости рта, профилактике кариеса, уходе за зубами и детской стоматологии от клиники «Квалитет»."
  );
  const articles = getArticles();
  const settings = getSettings();
  const cats = Array.from(new Set(articles.map((a) => a.category)));
  const cat = typeof sp.category === "string" && cats.includes(sp.category) ? sp.category : "";
  const list = cat ? articles.filter((a) => a.category === cat) : articles;

  return (
    <>
      <PageHero
        title="Полезные статьи"
        description="Общие информационные материалы о здоровье зубов. Они не заменяют консультацию врача."
        crumbs={[{ label: "Статьи" }]}
      />
      <section className="section-tight">
        <div className="container-page">
          {cats.length > 1 && (
            <nav aria-label="Категории статей" className="mb-8 flex flex-wrap gap-2">
              {[{ label: "Все статьи", value: "" }, ...cats.map((c) => ({ label: c, value: c }))].map((f) => {
                const on = cat === f.value;
                return (
                  <Link
                    key={f.value || "all"}
                    href={f.value ? `/articles?category=${encodeURIComponent(f.value)}` : "/articles"}
                    aria-current={on ? "true" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors ${
                      on ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-white hover:border-brand-300 hover:bg-brand-50"
                    }`}
                  >
                    {f.label}
                  </Link>
                );
              })}
            </nav>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <article key={a.id} className="card card-hover flex flex-col overflow-hidden">
                <Link href={`/articles/${a.slug}`} className="relative block aspect-[16/10] bg-brand-50" aria-hidden="true" tabIndex={-1}>
                  {a.cover && <SmartImage src={a.cover} alt="" className="object-cover" />}
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-600">
                    {a.category}
                    {a.publishedAt && <span className="font-medium normal-case tracking-normal text-muted"> · {formatDateRu(a.publishedAt)}</span>}
                  </p>
                  <h2 className="mt-2 text-xl leading-snug">
                    <Link href={`/articles/${a.slug}`} className="hover:text-brand-700">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{a.excerpt}</p>
                  <Link href={`/articles/${a.slug}`} className="link-arrow mt-auto pt-4 text-sm">
                    Читать
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection phone={settings.contacts.phones[0]} />
    </>
  );
}

function ArticleView({ slug }: { slug: string }) {
  const a = getArticleBySlug(slug);
  const all = getArticles();
  const services = getServices();
  const cats = getCategories();
  const settings = getSettings();
  useSeo(a ? a.seoTitle || a.title : NOT_FOUND_TITLE, a ? a.seoDescription || a.excerpt : undefined);
  if (!a) return <NotFoundPage />;

  const headings = extractHeadings(a.content);
  const others = all.filter((x) => x.id !== a.id);
  const relatedArticles = [...others.filter((x) => x.category === a.category), ...others.filter((x) => x.category !== a.category)].slice(0, 3);
  const relatedCategory = cats.find((c) => c.id === a.relatedCategoryId);
  const relatedServices = relatedCategory ? services.filter((s) => s.categorySlug === relatedCategory.slug).slice(0, 3) : [];


  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-brand-50 to-white">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs items={[{ label: "Статьи", href: "/articles" }, { label: a.title }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow mb-3">{a.category}</p>
            <h1 className="text-[clamp(1.8rem,1.3rem+2vw,3rem)]">{a.title}</h1>
            <p className="lead mt-4">{a.excerpt}</p>
            {a.publishedAt && (
              <p className="mt-5 flex items-center gap-2 text-sm text-muted">
                <CalendarDays size={16} aria-hidden="true" />
                <time dateTime={a.publishedAt}>{formatDateRu(a.publishedAt)}</time>
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0">
          {a.cover && (
            <div className="relative mb-10 aspect-[16/9] max-w-3xl overflow-hidden rounded-3xl bg-brand-50">
              <SmartImage src={a.cover} alt={a.title} priority className="object-cover" />
            </div>
          )}
          <RichText text={a.content} />
          <p className="mt-10 max-w-3xl rounded-xl bg-accent-soft p-4 text-sm">{MEDICAL_DISCLAIMER}</p>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {headings.length >= 3 && (
            <nav aria-label="Содержание статьи" className="card p-5">
              <p className="font-bold">Содержание</p>
              <ol className="mt-3 space-y-2 text-sm">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} onClick={jump(h.id)} className="text-muted hover:text-brand-700">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className="card bg-brand-800 p-6 text-white">
            <p className="text-lg font-bold">Остались вопросы?</p>
            <p className="mt-2 text-sm text-brand-100">Запишитесь на консультацию — врач ответит на вопросы и осмотрит вас.</p>
            <Link href="/booking" className="btn btn-light mt-5 w-full">
              Записаться на приём
            </Link>
          </div>
        </aside>
      </div>

      {relatedServices.length > 0 && (
        <section className="section-tight bg-surface-alt" aria-labelledby="art-services">
          <div className="container-page">
            <h2 id="art-services" className="mb-8 text-2xl">
              Связанные услуги
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedServices.map((s) => (
                <ServiceCard key={s.id} s={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedArticles.length > 0 && (
        <section className="section-tight" aria-labelledby="art-related">
          <div className="container-page">
            <h2 id="art-related" className="mb-8 text-2xl">
              Читайте также
            </h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {relatedArticles.map((r) => (
                <li key={r.id}>
                  <Link href={`/articles/${r.slug}`} className="card card-hover block h-full p-5">
                    <span className="text-xs font-bold uppercase tracking-wide text-brand-600">{r.category}</span>
                    <span className="mt-2 block text-lg font-bold leading-snug">{r.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <CTASection phone={settings.contacts.phones[0]} />
    </>
  );
}

// ───────────────────────── ContactsPage ─────────────────────────
export function ContactsPage() {
  useSeo("Контакты стоматологической клиники в Москве",
    "Контакты клиники «Квалитет» в Москве: телефоны +7 (499) 481-32-08, +7 (499) 481-97-00, +7 (966) 019-41-19, карточка в 2ГИС, способы оплаты, форма обратной связи.");
  const settings = getSettings();
  return (
    <>
      <PageHero
        title="Контакты"
        description="Позвоните нам или оставьте сообщение — администратор свяжется с вами."
        crumbs={[{ label: "Контакты" }]}
      />
      <section className="section-tight">
        <div className="container-page">
          <ContactBlock settings={settings} />
        </div>
      </section>

      <PaymentBlock payments={settings.payments} id="payment" />

      <section className="section-tight" aria-labelledby="feedback-title">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow mb-3">Обратная связь</p>
            <h2 id="feedback-title">Напишите нам</h2>
            <p className="mt-4 text-lg text-muted">
              Демонстрационная форма: сообщение никуда не отправляется. В рабочей версии здесь можно будет задать вопрос о лечении, записи или оплате. Чтобы записаться на конкретную услугу, воспользуйтесь{" "}
              <a href="/booking" className="font-semibold text-brand-600 underline">
                формой записи на приём
              </a>
              .
            </p>
          </div>
          <div className="card p-5 sm:p-8">
            <BookingForm kind="feedback" headingId="feedback-form-title" title="Сообщение клинике" />
          </div>
        </div>
      </section>
    </>
  );
}

// ───────────────────────── BookingPage ─────────────────────────
export function BookingPage({ sp }: { sp: Query }) {
  useSeo("Запись на приём к стоматологу в Москве",
    "Запишитесь на приём в стоматологическую клинику «Квалитет» в Москве: онлайн-заявка или звонок по телефону.");
  const settings = getSettings();
  const services = getServices();
  const svc = typeof sp.service === "string" ? services.find((s) => s.slug === sp.service) : undefined;
  const cat = typeof sp.category === "string" ? sp.category : undefined;

  return (
    <>
      <PageHero
        title="Запись на приём"
        description="Заполните форму — администратор свяжется с вами, ответит на вопросы и согласует удобное время."
        crumbs={[{ label: "Запись на приём" }]}
      />
      <section className="section-tight">
        <div className="container-page grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="card p-5 sm:p-8">
            <BookingForm
              headingId="booking-page-title"
              preset={{ serviceId: svc?.id, categorySlug: svc?.categorySlug ?? cat }}
            />
          </div>
          <aside className="space-y-5" aria-label="Другие способы записи">
            <div className="card p-6">
              <h2 className="text-xl">Записаться по телефону</h2>
              <ul className="mt-4 space-y-2">
                {settings.contacts.phones.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`} className="flex min-h-12 items-center gap-3 rounded-xl border border-line px-4 font-bold hover:border-brand-300 hover:bg-brand-50">
                      <Phone size={18} className="text-brand-600" aria-hidden="true" />
                      {p.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card space-y-4 bg-brand-50 p-6 text-sm">
              <p className="flex gap-3">
                <CalendarCheck size={20} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                <span>Это демо-форма: данные не отправляются. Чтобы записаться, позвоните по одному из телефонов.</span>
              </p>
              <p className="flex gap-3">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                <span>Мы не просим подробных медицинских сведений — их обсудит врач на приёме.</span>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

// ───────────────────────── LegalPage ─────────────────────────
/**
 * Юридические документы: /privacy-policy и /personal-data-consent (любой другой адрес — 404).
 * Тексты — шаблоны: перед публикацией их должны проверить клиника и юрист.
 */
const DOCS = {
  "privacy-policy": {
    title: "Политика конфиденциальности",
    description: "Политика обработки персональных данных на сайте стоматологической клиники «Квалитет».",
  },
  "personal-data-consent": {
    title: "Согласие на обработку персональных данных",
    description: "Текст согласия на обработку персональных данных при отправке формы на сайте клиники «Квалитет».",
  },
} as const;
type DocKey = keyof typeof DOCS;

const NOTICE =
  "Демонстрационная версия: документ — шаблон, который должен быть проверен клиникой и юристом перед публикацией. На этом демо-сайте формы не отправляют и не сохраняют данные. Реквизиты оператора будут добавлены после получения данных от клиники.";

const isDoc = (v: string): v is DocKey => Object.prototype.hasOwnProperty.call(DOCS, v);

function operator(s: AllSettings) {
  return (
    s.contacts.legalEntity ||
    `${s.site.siteName} — стоматологическая клиника, г. Москва (полное наименование, ИНН, ОГРН и адрес оператора будут указаны после предоставления реквизитов клиникой)`
  );
}

function Privacy({ s }: { s: AllSettings }) {
  const c = s.contacts;
  return (
    <>
      <h2>1. Общие положения</h2>
      <p>
        Настоящая политика описывает, как на сайте обрабатываются персональные данные посетителей. Оператор персональных данных: {operator(s)}.
      </p>
      <p>Отправляя форму на сайте, вы подтверждаете, что ознакомились с настоящей политикой и даёте согласие на обработку персональных данных.</p>

      <h2>2. Какие данные мы собираем</h2>
      <ul>
        <li>имя и номер телефона, которые вы указываете в форме;</li>
        <li>выбранные направление, услуга и врач (если указаны);</li>
        <li>желаемые дата и время приёма, комментарий (если указаны).</li>
      </ul>
      <p>
        Мы не просим указывать в форме подробные медицинские сведения. Пожалуйста, не пишите их в комментариях — все медицинские вопросы обсуждаются
        с врачом на приёме.
      </p>
      <p>Сайт не использует рекламные и аналитические cookie-файлы.</p>

      <h2>3. Цели обработки</h2>
      <ul>
        <li>связаться с вами для записи на приём и согласования времени;</li>
        <li>ответить на ваши вопросы и обращения;</li>
        <li>организовать приём пациента.</li>
      </ul>

      <h2>4. Правовые основания</h2>
      <p>Обработка осуществляется на основании вашего согласия, которое вы даёте при отправке формы.</p>

      <h2>5. Хранение и передача данных</h2>
      <p>
        Данные хранятся в течение срока, необходимого для достижения целей обработки, либо до отзыва согласия. Мы не передаём персональные данные
        третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации.
      </p>

      <h2>6. Ваши права</h2>
      <p>
        Вы вправе запросить информацию об обработке своих данных, потребовать их уточнения, блокирования или уничтожения, а также отозвать согласие.
        Для этого свяжитесь с клиникой по телефону {c.phones.map((p) => p.display).join(", ")}
        {c.email ? ` или по электронной почте ${c.email}` : ""}.
      </p>

      <h2>7. Защита данных</h2>
      <p>Мы применяем организационные и технические меры защиты персональных данных. Передача данных осуществляется по защищённому соединению.</p>

      <h2>8. Изменение политики</h2>
      <p>
        Клиника может обновлять настоящую политику. Актуальная редакция всегда доступна на этой странице. См. также{" "}
        <Link href="/personal-data-consent">согласие на обработку персональных данных</Link>.
      </p>
    </>
  );
}

function Consent({ s }: { s: AllSettings }) {
  const c = s.contacts;
  return (
    <>
      <p>
        Отправляя форму на сайте, я свободно, своей волей и в своём интересе даю согласие оператору — {operator(s)} — на обработку моих
        персональных данных на следующих условиях.
      </p>

      <h2>Перечень данных</h2>
      <p>Имя; номер телефона; выбранное направление, услуга и врач; желаемые дата и время приёма; текст комментария или сообщения.</p>

      <h2>Цели обработки</h2>
      <p>Связь со мной для записи на приём, согласования времени, ответа на мои обращения и организации приёма.</p>

      <h2>Действия с данными</h2>
      <p>
        Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, блокирование, удаление и
        уничтожение персональных данных — с использованием средств автоматизации.
      </p>

      <h2>Срок действия и отзыв согласия</h2>
      <p>
        Согласие действует до достижения целей обработки или до его отзыва. Я могу отозвать согласие, обратившись в клинику по телефону{" "}
        {c.phones.map((p) => p.display).join(", ")}
        {c.email ? ` или на адрес ${c.email}` : ""}.
      </p>

      <p>
        Подробнее о порядке обработки данных — в <Link href="/privacy-policy">политике конфиденциальности</Link>.
      </p>
    </>
  );
}

export function LegalPage({ doc }: { doc: string }) {
  useSeo(isDoc(doc) ? DOCS[doc].title : NOT_FOUND_TITLE, isDoc(doc) ? DOCS[doc].description : undefined);
  if (!isDoc(doc)) return <NotFoundPage />;
  const settings = getSettings();
  return (
    <>
      <PageHero title={DOCS[doc].title} crumbs={[{ label: DOCS[doc].title }]} />
      <section className="section-tight">
        <div className="container-page max-w-4xl">
          <p className="mb-8 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>{NOTICE}</span>
          </p>
          <div className="rich max-w-none space-y-2 [&_h2]:mt-8 [&_h2]:text-2xl">
            {doc === "privacy-policy" ? <Privacy s={settings} /> : <Consent s={settings} />}
          </div>
        </div>
      </section>
    </>
  );
}

// ───────────────────────── NotFoundPage ─────────────────────────
export function NotFoundPage() {
  useSeo(NOT_FOUND_TITLE);
  const settings = getSettings();
  const phone = settings.contacts.phones[0];
  return (
      <section className="section">
        <div className="container-page mx-auto max-w-2xl text-center">
          <p className="text-[clamp(5rem,4rem+8vw,9rem)] font-extrabold leading-none tracking-tight text-brand-200">404</p>
          <h1 className="mt-4 text-[clamp(1.8rem,1.4rem+1.6vw,2.6rem)]">Такой страницы нет</h1>
          <p className="lead mt-4">Возможно, адрес введён с ошибкой или страница была перемещена. Перейдите на главную или выберите нужный раздел.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn btn-primary btn-lg">
              На главную
            </Link>
            <Link href="/services" className="btn btn-secondary btn-lg">
              Услуги
            </Link>
            <Link href="/prices" className="btn btn-secondary btn-lg">
              Цены
            </Link>
          </div>
          {phone && (
            <a href={`tel:${phone.tel}`} className="mt-8 inline-flex items-center gap-2 font-bold text-brand-700">
              <Phone size={18} aria-hidden="true" /> {phone.display}
            </a>
          )}
        </div>
      </section>
  );
}

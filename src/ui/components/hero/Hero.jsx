import { useEffect, useState } from "react";
import Iridescence from "../iridescence/Iridescence.jsx";
import { useI18n } from "../../../i18n.jsx";

const SunIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
);

const getInitialTheme = () =>
  typeof document !== "undefined" &&
  document.documentElement.dataset.theme === "light"
    ? "light"
    : "dark";

export function Hero() {
  const [theme, setTheme] = useState(getInitialTheme);
  const { t, locale, setLocale } = useI18n();

  useEffect(() => {
    const nextTheme = theme ?? "dark";
    const doc = document.documentElement;
    doc.dataset.theme = nextTheme;
    document.body.classList.toggle("theme-light", nextTheme === "light");
    document.body.classList.toggle("theme-dark", nextTheme === "dark");
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const toggleLocale = () =>
    setLocale(locale === "en" ? "es" : "en");

  return (
    <section className="hero" id="home">
      <nav className="hero__banner">
        <a href="#home">{t("nav.home")}</a>
        <a href="#about">{t("nav.about")}</a>
        <a href="#projects">{t("nav.projects")}</a>
        <a href="#experience">{t("nav.experience")}</a>
        <a href="#contact">{t("nav.contact")}</a>
      </nav>

      <div className="hero__rectangle-wrapper">
        <div className="hero__rectangle">
          <div className="hero__controls">
            <button
              type="button"
              className="hero__lang-toggle"
              onClick={toggleLocale}
              aria-label="Toggle language"
            >
              {locale === "en" ? "EN" : "ES"}
            </button>
          <button
            type="button"
            className="hero__theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          </div>

          {/* BACKGROUND IRIDESCENCE */}
          <div className="hero__rectangle-bg">
            <Iridescence
              color={[0.5, 0.6, 0.8]}
              mouseReact={false}
              amplitude={0.1}
              speed={1.0}
            />
          </div>

          {/* CONTENT */}
          <div className="hero__rectangle-content">
            <h1 className="hero__title">{t("hero.title")}</h1>
            <p className="hero__subtitle">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

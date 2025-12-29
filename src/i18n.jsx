import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./locales/en.json";
import es from "./locales/es.json";

const STORAGE_KEY = "app:locale";
export const messages = { en, es };

const I18nContext = createContext({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

const browserLocale = () => {
  if (typeof navigator === "undefined") return "en";
  return (navigator.language || navigator.userLanguage || "en").slice(0, 2);
};

const translate = (key, locale) => {
  const parts = key.split(".");
  let val = messages[locale] || messages.en;
  for (const part of parts) {
    val = val?.[part];
    if (val === undefined) break;
  }
  return typeof val === "string" ? val : key;
};

export function I18nProvider({ children }) {
  const initial =
    (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) ||
    browserLocale() ||
    "en";
  const [locale, setLocaleState] = useState(messages[initial] ? initial : "en");

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, locale);
      }
    } catch {
      /* ignore */
    }
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: (next) => setLocaleState(messages[next] ? next : "en"),
      t: (key) => translate(key, locale),
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

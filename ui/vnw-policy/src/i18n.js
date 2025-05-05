import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector"; // ⬅️ THÊM DÒNG NÀY

i18n
  .use(HttpBackend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "vi",
    supportedLngs: ["en", "vi"],
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
    debug: true,
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

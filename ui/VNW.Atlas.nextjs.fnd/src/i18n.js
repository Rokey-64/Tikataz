import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // Load file JSON chứa ngôn ngữ
//   .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
  .use(initReactI18next) // Kết nối với React
  .init({
    fallbackLng: "vi", // Ngôn ngữ mặc định
    debug: false,
    ns: ["translation", "captions"],
    defaultNS: "translation",
    backend:{
        loadPath: "/locales/{{lng}}/{{ns}}.json"
    },
    interpolation: {
      escapeValue: false, // Không cần escape vì React đã xử lý
    },
  });

export default i18n;

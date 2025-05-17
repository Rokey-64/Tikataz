import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "vi",
    debug: false, // bật để xem log lỗi
    ns: ["translation"], // hoặc thêm captions nếu cần
    defaultNS: "translation",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // đường dẫn chính xác
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;


import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  i18next
    .use(Backend)
    //.use(i18nextMiddleware.LanguageDetector)
    .init({
      fallbackLng: 'vi',
      lng: 'vi',
      preload: ['en', 'vi'], // Danh sách các ngôn ngữ bạn hỗ trợ
      backend: {
        loadPath: path.join(__dirname, './{{lng}}/{{ns}}.json')
      }
    });
} catch (error) {
  console.log(error);
}

export default i18next;
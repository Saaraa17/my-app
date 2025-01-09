import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)  // لتجلب البيانات من ملفات JSON عبر الإنترنت أو الخادم
  .use(LanguageDetector) // لاكتشاف اللغة الحالية تلقائيًا
  .use(initReactI18next) // ربط i18next بـ React
  .init({
    supportedLngs: ['en', 'ar'], // اللغات المدعومة
    fallbackLng: 'en',  // اللغة الافتراضية
    detection: {
      order: ['cookie', 'localStorage', 'htmlTag', 'querystring', 'sessionStorage', 'navigator'], 
      caches: ['cookie', 'localStorage'], 
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',  // مسار تحميل الترجمة
    },
    react: {
      useSuspense: false,  // تعيين false لتجنب انتظار التحميل
    },
  });
  console.log('Current language:', i18n.language);
export default i18n;

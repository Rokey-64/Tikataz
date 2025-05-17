module.exports = {
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    localeDetection: false,
  },
  react: {
    useSuspense: false, // Disable Suspense if you are using SSR.
    wait: true,
  },
  defaultNS: 'translation',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
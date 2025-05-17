import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers';

const locales = ['en', 'vi'];
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting
  // read from `cookies()`, `headers()`, etc.
  const localCookies = await cookies()
  const locale = localCookies.get('next-intl')?.value || 'vi';

  const messages = (await import(`../../messages/${locale}.json`)).default;
 
  return {
    locale,
    messages
  };
});
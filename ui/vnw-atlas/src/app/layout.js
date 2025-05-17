

import AppProvider from '@/app/AppProvider';
import '@/location/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';


export const metadata = {
  title: 'Tikataz - Atlas',
  description: 'Web site created using Next.js App Router',
};


export default async function RootLayout({ children }) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <AppProvider>
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>
  );
}

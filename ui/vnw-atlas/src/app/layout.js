

// app/layout.tsx
import React from 'react';
import AppProvider from '@/app/AppProvider';
// import '@/location/index.scss';
import '@/location/globals.css';

export const metadata = {
  title: 'Tikataz - Atlas',
  description: 'Web site created using Next.js App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

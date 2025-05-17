// app/page.tsx

// nếu Layout dùng các hook như useState, useEffect, v.v.

import CardLayout from '@/components/common/Layout/CardLayout';
// import StudioLayout from '@/components/common/Layout/StudioLayout';

export default function StudioMeLayout({ children }) {
  return (
    <CardLayout >
      {children}
    </CardLayout>
  );
}

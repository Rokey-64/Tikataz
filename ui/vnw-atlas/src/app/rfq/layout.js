'use client';

import CardLayout from '@/components/common/Layout/CardLayout';

export default function Layout({ children }) {
    return (
        <CardLayout>
            {children}
        </CardLayout>
    );
}
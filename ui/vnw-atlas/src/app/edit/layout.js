'use client'

import CardLayout from "@/components/common/Layout/CardLayout";

export default function CardMeLayout({ children }) {
    return (
        <>
            <CardLayout>
                {children}
            </CardLayout>
        </>
    )
}
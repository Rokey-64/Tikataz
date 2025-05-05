"use client"

// app/layout.tsx
import React from 'react';

import store from '@/redux/store';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export default function AppProvider({ children }) {
    return (
        <div className='bg-red-50'>
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    {children}
                </I18nextProvider>
            </Provider>
        </div>
    );
}


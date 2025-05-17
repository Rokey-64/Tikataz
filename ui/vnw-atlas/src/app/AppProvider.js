"use client"


import React from 'react';
import store from '@/redux/store';
import { Provider } from 'react-redux';


export default function AppProvider({ children }) {
    return (
        <div className='bg-red-50'>
            <Provider store={store}>
                {children}
            </Provider>
        </div>
    );
}


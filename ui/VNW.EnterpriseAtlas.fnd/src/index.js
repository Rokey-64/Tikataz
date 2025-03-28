import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
  // </React.StrictMode>
);

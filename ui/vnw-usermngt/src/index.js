import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import './index.scss'
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey='6LdW5fMpAAAAAM-wEYLbO762E4Ah7Lz_6KP7NHP8'
      useRecaptchaNet='true'
      container={{
        parameters: {
          badge: 'topright', // optional, default undefined
          theme: 'dark', // optional, default undefined
        }
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);


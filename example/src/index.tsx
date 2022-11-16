import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { setDefaultLanguage, setDefaultTranslations } from 'react-multi-lang'
import en from './translations/en.json'
import pt from './translations/pt.json'

setDefaultTranslations({ pt, en })
setDefaultLanguage('pt')

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

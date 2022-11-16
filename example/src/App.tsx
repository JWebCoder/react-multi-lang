import React from 'react';
import { getLanguage, setLanguage, useTranslation } from 'react-multi-lang'
import './App.css';

function App() {
  const t = useTranslation()
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='App-title'>
          {t('home.Title', {param: 'react'})}
        </h1>
      </header>
      <p className='App-intro'>
        To change language just press the buttons beneath
      </p>
      <div>Selected lang <b>{getLanguage()}</b></div>
      <br/>
      <button onClick={() => setLanguage('pt')}>PT</button>
      <button onClick={() => setLanguage('en')}>EN</button>
    </div>
  );
}

export default App;

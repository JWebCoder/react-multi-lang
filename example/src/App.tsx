import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useTranslation, setLanguage, getLanguage } from 'react-multi-lang'

const App: React.FC = () => {

  const t = useTranslation()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">
          {t('home.Title', {param: 'react'})}
        </h1>
      </header>
      <p className="App-intro">
        To change language just press the buttons beneath
      </p>
      <div>Selected lang <b>{getLanguage()}</b></div>
      <br/>
      <button onClick={() => setLanguage('pt')}>PT</button>
      <button onClick={() => setLanguage('en')}>EN</button>
    </div>
  )
}

export default App;

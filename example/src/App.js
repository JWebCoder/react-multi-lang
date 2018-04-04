import * as React from 'react'
import logo from './logo.svg'
import './App.css'
import { translate, setLanguage, getLanguage } from 'react-multi-lang'

class App extends React.Component {
  changeLang (lang) {
    setLanguage(lang)
  }
  render () {
    console.log(getLanguage())
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            {this.props.t('home.Title', {param: 'react'})}
          </h1>
        </header>
        <p className="App-intro">
          To change language just press the buttons beneath
        </p>
        <button onClick={() => this.changeLang('pt')}>PT</button>
        <button onClick={() => this.changeLang('en')}>EN</button>
      </div>
    )
  }
}

export default translate(App)

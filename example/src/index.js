import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { setDefaultTranslations, setDefaultLanguage } from 'react-multi-lang'
import pt from './translations/pt.json'
import en from './translations/en.json'

setDefaultTranslations({pt, en})
setDefaultLanguage('pt')

ReactDOM.render(<App />, document.getElementById('root'))

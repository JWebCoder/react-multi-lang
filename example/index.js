// @flow

import * as React from 'react'
import ReactDOM from 'react-dom'

// Translations
import { setDefaultTranslations, setDefaultLanguage } from 'react-multi-lang'
import pt from './translations/pt.json'
import en from './translations/en.json'

// Translated Component
import TranslatedComponent from './component'

setDefaultTranslations({pt, en})
setDefaultLanguage('en')

ReactDOM.render(
  <TranslatedComponent/>,
  document.getElementById('app')
)

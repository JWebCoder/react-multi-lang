# react-multi-lang

React Multilanguage Higher Order Component.

Works with React and React Native

## Installation

`npm i -S react-multi-lang`

## Usage

See the example folder for better understanding

```javascript
// @flow

import * as React from 'react'

// Translation Higher Order Component
import { setTranslations, setDefaultLanguage, translate } from 'react-multi-lang'
import pt from '.pt.json'
import en from '.en.json'
import type { T } from 'react-multi-lang'

// Do this two lines only when setting up the application
setTranslations({pt, en})
setDefaultLanguage('en')

type Props = {
  t: T
}

type State = {}

class SomeComponent extends React.Component<Props, State> {
  render () {
    const { translate } = this.props
    return (
      <div>
        {t('home.Title')}
        {t('Hello', {name: 'João'})}
      </div>
    )
  }
}

export default translate(SomeComponent)
```

## Injected Method

If using the Higher Order Component `translate(SomeComponent)`

### t(path, params)

Params | Type   | Description
------ | ------ | ------------------------------------------------------------------------------------
path   | string | translation path that identifies the text
params | object | {'param': 'value', ...} each param will be set on the string in its correct location

## Exported Methods

### setDefaultTranslations(translations)

Sets the translations

Params       | Type   | Description
------------ | ------ | ----------------------------
translations | object | {'key': 'translations', ...}

### setTranslations(translations)

Same as setDefaultTranslations, but this will update all components using translations

Params       | Type   | Description
------------ | ------ | ----------------------------
translations | object | {'key': 'translations', ...}

### setDefaultLanguage(key)

Sets the default application language

Params | Type   | Description
------ | ------ | ---------------------------------------------
key    | string | translation key, in this example 'en' or 'pt'

### setLanguage(key)

Same as setDefaultLanguage, but this will update all components using translations

Params | Type   | Description
------ | ------ | ---------------------------------------------
key    | string | translation key, in this example 'en' or 'pt'

### t(key, params)

Get text function, will return the translated string

Params | Type   | Description
------ | ------ | ------------------------------------------------------------------------------------
key    | string | translation key that identifies the text
params | object | {'param': 'value', ...} each param will be set on the string in its correct location

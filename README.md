# react-multi-lang

React Multi-language component.

Works with React and React Native

## Installation

`npm i -S react-multi-lang`

## Usage

### Hook

See the example folder for better understanding

```tsx
import React from 'react'

// Translation Hook
import { setTranslations, setDefaultLanguage, useTranslation } from 'react-multi-lang'
import pt from 'pt.json'
import en from 'en.json'

// Do this two lines only when setting up the application
setTranslations({pt, en})
setDefaultLanguage('en')

const App: React.FC = () => {
  const t = useTranslation()
  return (
    <div>
      {t('home.Title')}
      {t('Hello', {name: 'João'})}
    </div>
  )
}

export default App
```

### Higher order component

```tsx
import React from 'react'

// Translation Higher Order Component
import { setTranslations, setDefaultLanguage, withTranslation } from 'react-multi-lang'
import pt from 'pt.json'
import en from 'en.json'
import type { T } from 'react-multi-lang'

// Do this two lines only when setting up the application
setTranslations({pt, en})
setDefaultLanguage('en')

type Props = {
  t: T
}

class SomeComponent extends React.Component<Props> {
  render () {
    const { t } = this.props
    return (
      <div>
        {t('home.Title')}
        {t('Hello', {name: 'João'})}
      </div>
    )
  }
}

export default withTranslation(SomeComponent)
```

## Translation Method t(path, params)

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

### getLanguage()

Returns the current selected language

### t(key, params)

Get text function, will return the translated string

Params | Type   | Description
------ | ------ | ------------------------------------------------------------------------------------
key    | string | translation key that identifies the text
params | object | {'param': 'value', ...} each param will be set on the string in its correct location

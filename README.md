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

## Auto update functions

### useTranslation(basePath)

React hook that returns the t function

Params | Type | Description | Required
---- | ---- | ---- | ----
basePath | string | translation base path used to identify all the next requested translations | no

### withTranslation(component, basePath)

HOC that injects the translation function into the component

Params | Type | Description | Required
---- | ---- | ---- | ----
component | React Component | React component that requires the translation function | yes
basePath | string | translation base path used to identify all the next requested translations | no

## Translation Method

t(path, params)

Returns the translation for the requested path

Params | Type | Description | Required
---- | ---- | ---- | ----
path | string | translation path that identifies the text | yes
params | object | {'param': 'value', ...} each parameter will be set on the string in its correct location | no

## Exported Methods

### setDefaultTranslations(translations)

Sets the translations

Params | Type | Description | Required
---- | ---- | ---- | ----
translations | object | {'key': 'translations', ...} | yes

### setTranslations(translations)

Same as setDefaultTranslations, but this will update all components using translations

Params | Type | Description | Required
---- | ---- | ---- | ----
translations | object | {'key': 'translations', ...} | yes

### setDefaultLanguage(key)

Sets the default application language

Params | Type | Description | Required
---- | ---- | ---- | ----
key    | string | translation key, in this example 'en' or 'pt' | yes

### setLanguage(key)

Same as setDefaultLanguage, but this will update all components using translations

Params | Type | Description | Required
---- | ---- | ---- | ----
key    | string | translation key, in this example 'en' or 'pt' | yes

### getLanguage()

Returns the current selected language

### t(key, params)

t(path, params)

Returns the translation for the requested path

Params | Type | Description | Required
---- | ---- | ---- | ----
path | string | translation path that identifies the text | yes
params | object | {'param': 'value', ...} each parameter will be set on the string in its correct location | no

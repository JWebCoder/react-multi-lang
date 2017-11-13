# react-native-swipe-container

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

// Do this two lines only when setting up the application
setTranslations({pt, en})
setDefaultLanguage('en')

type Props = {
  translate:(string) => string
}

type State = {}

class SomeComponent extends React.Component<Props, State> {
  render () {
    const { translate } = this.props
    return (
      <div>
        {translate('About Us')}
      </div>
    )
  }
}

export default translate(SomeComponent)
```

## Injected Method

#### translate(key)

| Params        | Type          | Description  |
| ------------- |:-------------:| ------------ |
| key   | string        | translation key that identifies the text |


## Methods

#### setTranslations(translations)

| Params        | Type          | Description  |
| ------------- |:-------------:| ------------ |
| translations   | object        | {'key': 'translations', ...} |

#### setDefaultLanguage(key)

| Params        | Type          | Description  |
| ------------- |:-------------:| ------------ |
| key   | string        | translation key, in this example 'en' or 'pt' |

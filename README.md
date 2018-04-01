# react-switch-lang

React Multilanguage Higher Order Component.

Works with React and React Native

## Installation

`npm install react-switch-lang --save`

## Usage

See the example folder for better understanding

```javascript
import React from 'react';
import PropTypes from 'prop-types';

// Translation Higher Order Component
import { setTranslations, setDefaultLanguage, translate } from 'react-switch-lang';
import en from 'en.json';
import th from 'th.json';

// Do this two lines only when setting up the application
setTranslations({ en, th });
setDefaultLanguage('en');

class SomeComponent extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        {t('home.Title')}
        {t('Hello', { name: 'World' })}
      </div>
    )
  }
}

SomeComponent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate(SomeComponent);

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

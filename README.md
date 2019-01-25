# react-switch-lang

React Multi-language Higher Order Component with cookie support.

## Installation

`npm install react-switch-lang --save`

## Usage

en.json
```json
{
  "home": {
    "title": "Homepage"
  },
  "hello": "Hello {name}!",
  "fallback": "Fallback message"
}
```

th.json
```json
{
  "home": {
    "title": "หน้าแรก"
  },
  "hello": "สวัสดี {name}!"
}
```

SomeComponent.js
```javascript
import React from 'react';
import PropTypes from 'prop-types';

// Translation Higher Order Component
import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  setLanguage,
  translate,
} from 'react-switch-lang';
import en from 'en.json';
import th from 'th.json';

// Do this two lines only when setting up the application
setTranslations({ en, th });
setDefaultLanguage('en');

// If you want to remember selected language
setLanguageCookie();

class SomeComponent extends React.Component {
  handleSetLanguage = (key) => () => {
    setLanguage(key);
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        {t('home.title')}
        {t('home.title', null, 'th')}
        {t('hello', { name: 'World' })}
        {t('fallback')}

        <button type="button" onClick={this.handleSetLanguage('th')}>
          Switch language
        </button>
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

### t(path, params, lang)

Get text function, will return the translated string

Params | Type   | Description
------ | ------ | ------------------------------------------------------------------------------------
path   | string | translation path that identifies the text
params | object | (optional) {'param': 'value', ...} each param will be set on the string in its correct location
lang   | string | (optional) force select language with translation key, in this example 'en' or 'th'

## Exported Methods

### setDefaultTranslations(translations)

Sets the translations

Params       | Type   | Description
------------ | ------ | ----------------------------
translations | object | { "en": { "hello": "Hello" } }

### setTranslations(translations)

Same as setDefaultTranslations, but this will update all components using translations

Params       | Type   | Description
------------ | ------ | ----------------------------
translations | object | { "en": { "hello": "Hello" } }

### setDefaultLanguage(key)

Set the default application language, when current language does not have translation text method t() will fallback with this default language
Note: this method will set current language but not update components

Params | Type    | Description
------ | ------  | ---------------------------------------------
key    | string  | translation key, in this example 'en' or 'th'

### setLanguage(key)

Set current language, this will update all components using translations

Params | Type   | Description
------ | ------ | ---------------------------------------------
key    | string | translation key, in this example 'en' or 'th'

### setLanguageCookie(name, option, reqCookie)

Set the language cookie name, will setLanguage form this cookie and store language key back to cookie when call setLanguage

Params | Type   | Default | Description
------ | ------ | ------ | ---------------------------------------------
name    | string | `'language'` | (optional) name of cookie to store in browser
option   | object | `{ path: '/', maxAge: 157680000 }` | (optional) cookie option base on "universal-cookie", default age is 5 years
reqCookie   | string | `undefined` | (optional) the express cookie header (req.headers.cookie), this is required if you use server-side rendering such as Next.js

### getLanguages()

Return all translations key. Example: ['en', 'th']

### getDefaultLanguage()

Return the default fallback language

### getLanguage()

Return the current selected language

### t(key, params, lang)

Same as t() method above

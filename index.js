const React = require('react');
const hoistStatics = require('hoist-non-react-statics');
const objectAssign = require('object-assign');
const Cookies = require('universal-cookie');

const subscribes = {};

let translations = {};
let language = 'en';
let count = 0;
let cookies;
let cookieName = 'language';
let cookieOption = { path: '/', maxAge: 157680000 };

function subscribe(cb) {
  const newId = count;
  subscribes[newId] = cb;
  count += 1;
  return newId;
}

function unsubscribe(id) {
  delete subscribes[id];
}

function triggerSubscriptions() {
  Object.keys(subscribes).forEach((id) => {
    new Promise((resolve) => {
      subscribes[id]();
      resolve();
    }).then();
  });
}

function getLanguages() {
  return Object.keys(translations);
}

function getLanguage() {
  return language;
}

function setDefaultLanguage(lang) {
  language = lang;
}

function setLanguage(lang) {
  if (getLanguages().indexOf(lang) === -1) {
    return;
  }

  language = lang;
  triggerSubscriptions();

  if (cookies && process.browser) {
    cookies.set(cookieName, language, cookieOption);
  }
}

function setLanguageCookie(name, option, reqCookie) {
  cookies = new Cookies(reqCookie);
  cookieName = name || cookieName;
  cookieOption = Object.assign({}, cookieOption, option);

  const lang = cookies.get(name);

  if (lang) {
    setLanguage(lang);
  }
}

function setTranslations(userTranslations) {
  translations = userTranslations;
  triggerSubscriptions();
}

function setDefaultTranslations(userTranslations) {
  if (getLanguages().length !== 0) {
    setTranslations(userTranslations);
    return;
  }
  translations = userTranslations;
}

function getTranslation(lang) {
  return translations[lang];
}

function t(path, params, lang) {
  let translationObj = getTranslation(lang || language);

  if (!translationObj) {
    return path;
  }

  const translationKeys = path.split('.');
  let translation = '';

  translationKeys.forEach((key) => {
    const temp = translationObj[key];
    if (typeof translationObj[key] === 'object') {
      translationObj = translationObj[key];
    } else if (typeof temp === 'string') {
      translation = temp;
    }
  });

  if (!translation) {
    return path;
  }

  if (params) {
    Object.keys(params).forEach((key) => {
      const replace = `{${key}}`;
      translation = translation.replace(replace, params[key]);
    });
  }

  return translation;
}

function translate(Component) {
  class TranslatedComponet extends React.Component {
    componentDidMount() {
      this.id = subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
      unsubscribe(this.id);
    }

    render() {
      return React.createElement(
        Component,
        objectAssign({}, this.props, { t: (key, args, lang) => t(key, args, lang) }),
      );
    }
  }

  return hoistStatics(TranslatedComponet, Component);
}

module.exports = {
  getLanguages,
  getLanguage,
  setDefaultLanguage,
  setLanguage,
  setLanguageCookie,
  setDefaultTranslations,
  setTranslations,
  translate,
  subscribe,
  unsubscribe,
  t,
};

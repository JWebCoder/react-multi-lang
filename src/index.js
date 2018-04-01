const React = require('react');
const hoistStatics = require('hoist-non-react-statics');

let language = 'en';
let count = 0;

const subscribes = {};

let translations = {};

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

function setDefaultLanguage(lang) {
  language = lang;
}

function setTranslations(userTranslations) {
  translations = userTranslations;
  triggerSubscriptions();
}

function setDefaultTranslations(userTranslations) {
  if (Object.keys(translations).length !== 0) {
    setTranslations(userTranslations);
    return;
  }
  translations = userTranslations;
}

function setLanguage(lang) {
  language = lang;
  triggerSubscriptions();
}

function t(path, args) {
  const translationKeys = path.split('.');
  let translation = '';
  let translationObj = translations[language];

  translationKeys.forEach((key) => {
    const temp = translationObj[key];
    if (typeof translationObj[key] === 'object') {
      translationObj = translationObj[key];
    } else if (typeof temp === 'string') {
      translation = temp;
    }
  });

  if (translation) {
    if (args) {
      Object.keys(args).forEach((key) => {
        const replace = `{${key}}`;
        translation = translation.replace(replace, args ? args[key] : replace);
      });
    }
  } else {
    translation = path;
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
        Object.assign({}, this.props, { t: (key, args) => t(key, args) }),
      );
    }
  }

  return hoistStatics(TranslatedComponet, Component);
}

module.exports = {
  setDefaultLanguage,
  setLanguage,
  setDefaultTranslations,
  setTranslations,
  translate,
  subscribe,
  unsubscribe,
  t,
};

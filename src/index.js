// @flow

import * as React from 'react'

// statics handler
import hoistStatics from 'hoist-non-react-statics'

let language: string = 'pt'
let id: number = 0

type Subscription = (() => mixed)

let subscribes: {
  [key: number | string]: Subscription
} = {}

type Translation = {
  [string]: string | Translation
}

export type Translations = {
  [string]: Translation
}

export type T = (path: string, args?: {[string]: string}) => string

let translations: Translations = {}

export function subscribe (cb: () => mixed): number {
  const newId = id
  subscribes[newId] = cb
  id += 1
  return newId
}

export function unsubscribe (id: number): void {
  delete subscribes[id]
}

function triggerSubscriptions () {
  Object.keys(subscribes).forEach(
    (id: string) => {
      new Promise(
        (resolve, reject) => {
          subscribes[id]()
          resolve()
        }
      ).then()
    }
  )
}

export function setDefaultLanguage (lang: string): void {
  language = lang
}

export function setDefaultTranslations (userTranslations: Translations): void {
  if (Object.keys(translations).length !== 0) {
    setTranslations(userTranslations)
    return
  }
  translations = userTranslations
}

export function setTranslations (userTranslations: Translations): void {
  translations = userTranslations
  triggerSubscriptions()
}

export function setLanguage (lang: string) {
  language = lang
  triggerSubscriptions()
}

export function getLanguage (): string {
  return language
}

export function t (path: string, args?: {[string]: string}): string {
  const translationKeys: string[] = path.split('.')
  let translation: string = ''
  let translationObj: Translation = translations[language]

  translationKeys.forEach(
    (key: string) => {
      const temp: string | Translation = translationObj[key]
      if (typeof translationObj[key] === 'object') {
        translationObj = translationObj[key]
      }
      if (typeof temp === 'string') {
        translation = temp
      }
    }
  )

  if (translation) {
    if (args) {
      Object.keys(args).forEach(
        key => {
          translation = translation.replace(`{${key}}`, args ? args[key]: '')
        }
      )
    }
  } else {
    return path
  }

  return translation
}

export function translate (Component: React$ComponentType<*>): React$ComponentType<*> {
  class TranslatedComponet extends React.Component<{}, *> {
    id: number

    componentDidMount () {
      this.id = subscribe(() => this.forceUpdate())
    }

    componentWillUnmount () {
      unsubscribe(this.id)
    }

    render () {
      return (
        <Component {...this.props} t={(key: string, args?:{[string]: string}): string => t(key, args)}/>
      )
    }
  }

  return hoistStatics(TranslatedComponet, Component)
}

export default {
  setDefaultLanguage,
  setLanguage,
  setDefaultTranslations,
  setTranslations,
  translate,
  subscribe,
  unsubscribe,
  t
}

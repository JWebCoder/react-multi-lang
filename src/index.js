// @flow

import * as React from 'react'
import uuid from 'react-native-uuid'

// statics handler
import hoistStatics from 'hoist-non-react-statics'

let language: string = 'pt'

type Subscription = {
  promise: Promise<any>,
  id: string
}

let subscribes: Subscription[] = []

type Translation = {
  [string]: string | Translation
}

export type Translations = {
  [string]: Translation
}

export type T = (path: string, args?: {[string]: string}) => string

let translations: Translations = {}

export function subscribe (promise: Promise<any>, id?: string): string {
  const newId = id || uuid.v1()
  subscribes.push({
    promise: promise,
    id: newId
  })
  return newId
}

export function unsubscribe (id: string): void {
  subscribes = subscribes.filter(
    (item: Subscription) => item.id !== id
  )
}

function triggerSubscriptions () {
  subscribes.forEach(
    (item: Subscription) => {
      item.promise.then()
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

export function t (path: string, args?: {[string]: string}): string {
  const translationKeys: string[] = path.split('.')
  let translation: string = ''
  let translationObj: Translation = translations[language]

  translationKeys.forEach(
    (key: string) => {
      const temp: string | Translation = translationObj[key]
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
  }

  return translation
}

export function translate (Component: React$ComponentType<*>): React$ComponentType<*> {
  class TranslatedComponet extends React.Component<{}, *> {
    id: string

    componentDidMount () {
      this.id = subscribe(
        new Promise(
          (resolve, reject) => {
            this.forceUpdate()
          }
        )
      )
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

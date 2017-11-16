// @flow

import * as React from 'react'
import uuid from 'react-native-uuid'

// statics handler
import hoistStatics from 'hoist-non-react-statics'

let language: string = 'pt'

let subscribes: {
  cb: () => mixed,
  id: string
}[] = []
export type Translations = {
  [string]: {
    [string]: string
  }
}

export type T = (key: string, args?: {[string]: string}) => string

let translations: Translations = {}

export function subscribe (cb:() => mixed, id?: string): string {
  const newId = id || uuid.v1()
  subscribes.push({
    cb,
    id: newId
  })
  return newId
}

export function unsubscribe (id: string): void {
  subscribes = subscribes.filter(
    item => item.id !== id
  )
}

function triggerSubscriptions (): void {
  subscribes.forEach(
    item => item.cb()
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

export function t (key: string, args?: {[string]: string}): string {
  let translation = translations[language][key]
  if (args) {
    Object.keys(args).forEach(
      key => {
        translation = translation.replace(`{${key}}`, args[key])
      }
    )
  }
  return translation
}

export function translate (Component: React$ComponentType<*>): React$ComponentType<*> {
  class TranslatedComponet extends React.Component<{}, *> {
    id: string

    componentDidMount () {
      this.id = subscribe(() => {
        this.forceUpdate()
      })
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

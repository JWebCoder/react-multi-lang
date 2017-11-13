// @flow

import * as React from 'react'
import uuid from 'react-native-uuid'

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

let translations: Translations = {}

export function setDefaultLanguage (lang: string): void {
  language = lang
}

export function setTranslations (userTranslations: Translations): void {
  translations = userTranslations
}

export function getText (key: string): string {
  return translations[language][key]
}

export function subscribe (cb:() => mixed, id?: string): string {
  const newId = id || uuid.v1()
  subscribes.push({
    cb,
    id: newId
  })
  return newId
}

export function unsubscribe (id: string) {
  subscribes = subscribes.filter(
    item => item.id !== id
  )
}

export function setLanguage (lang: string) {
  language = lang
  subscribes.forEach(
    item => item.cb()
  )
}

export function translate (Component: React$ComponentType<*>):React$ComponentType<*> {
  return class extends React.Component<{}, *> {
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
        <Component {...this.props} translate={(key: string) => getText(key)}/>
      )
    }
  }
}

export default {
  setLanguage,
  translate,
  subscribe,
  unsubscribe,
  getText,
  setTranslations
}

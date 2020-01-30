import hoistStatics from 'hoist-non-react-statics'
import React, { useEffect, useState } from 'react'
import { SetDifference, Subtract } from 'utility-types'

const useForceUpdate = () => () => useState()[1](undefined);

let language: string = 'pt'
let id: number = 1

type Subscription = () => any

const subscribes: {
  [key: string]: Subscription
} = {}

interface ITranslation {
  [key: string]: string | ITranslation
}

export interface ITranslations {
  [key: string]: ITranslation
}

export interface ITranslate {
  t(path: string, args?: {[key: string]: string}): string
}

let translations: ITranslations = {}

export function subscribe(cb: Subscription): number {
  const newId = id
  subscribes[newId] = cb
  id += 1
  return newId
}

export function unsubscribe(componentId: number): void {
  delete subscribes[componentId]
}

function triggerSubscriptions() {
  Object.keys(subscribes).forEach(
    (componentId: string) => {
      new Promise(
        (resolve, reject) => {
          subscribes[componentId]()
          resolve()
        }
      ).then()
    }
  )
}

export function setDefaultLanguage(lang: string): void {
  language = lang
}

export function setDefaultTranslations(userTranslations: ITranslations): void {
  if (Object.keys(translations).length !== 0) {
    setTranslations(userTranslations)
    return
  }
  translations = userTranslations
}

export function setTranslations(userTranslations: ITranslations): void {
  translations = userTranslations
  triggerSubscriptions()
}

export function setLanguage(lang: string) {
  language = lang
  triggerSubscriptions()
}

export function getLanguage(): string {
  return language
}

export function t(path: string, args?: {[key: string]: string}): string {
  const translationKeys: string[] = path.split('.')
  let translation: string = ''
  let translationObj: ITranslation = translations[language]

  translationKeys.forEach(
    (key: string) => {
      const temp: string | ITranslation = translationObj[key]
      if (typeof translationObj[key] === 'object') {
        translationObj = translationObj[key] as ITranslation
      }
      if (typeof temp === 'string') {
        translation = temp
      }
    }
  )

  if (translation) {
    if (args) {
      Object.keys(args).forEach(
        (key) => {
          translation = translation.replace(`{${key}}`, args ? args[key] : '')
        }
      )
    }
  } else {
    return path
  }

  return translation
}

export function useTranslation(basePath?: string) {
  const forceUpdate = useForceUpdate()
  useEffect(() => {
    const subId = subscribe(() => forceUpdate())
    return () => unsubscribe(subId)
  }, [forceUpdate])
  return (path: string, args?: {[key: string]: string}) =>
    t(basePath ? (basePath + '.' + path) : path, args)
}

export function withTranslation<P extends ITranslate>(
  Component: React.ComponentType<Pick<P, SetDifference<keyof P, 't'>>>
): React.ComponentType<Subtract<P, ITranslate>> {
  class TranslatedComponent extends React.Component<Subtract<P, ITranslate>> {
    public id: number | undefined

    public componentDidMount() {
      this.id = subscribe(() => this.forceUpdate())
    }

    public componentWillUnmount() {
      if (this.id) {
        unsubscribe(this.id)
      }
    }

    public render() {
      return <Component {...this.props as P} t={t}/>
    }
  }

  return hoistStatics(TranslatedComponent, Component)
}

export default {
  setDefaultLanguage,
  setLanguage,
  setDefaultTranslations,
  setTranslations,
  withTranslation,
  useTranslation,
  subscribe,
  unsubscribe,
  t,
}

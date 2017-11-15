// @flow

import * as React from 'react'

// Translation Higher Order Component
import { translate } from 'react-multi-lang'
import type { T } from 'react-multi-lang'

type Props = {
  t: T
}

type State = {}

class SomeComponent extends React.Component<Props, State> {
  render () {
    const { t } = this.props
    return (
      <div>
        {t('About Us')}
        {t('Hello', {name: 'João'})}
      </div>
    )
  }
}

export default translate(SomeComponent)

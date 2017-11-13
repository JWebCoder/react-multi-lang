// @flow

import * as React from 'react'

// Translation Higher Order Component
import { translate } from 'react-multi-lang'

type Props = {
  translate:(string) => string
}

type State = {}

class SomeComponent extends React.Component<Props, State> {
  render () {
    const { translate } = this.props
    return (
      <div>
        {translate('About Us')}
      </div>
    )
  }
}

export default translate(SomeComponent)

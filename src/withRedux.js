import React from 'react'
import {connect} from 'react-redux'
import _noop from 'lodash/noop'

function defaultMapDispathToProps() {
  return {}
}

export default function withRedux(...args) {
  return (Component) => {
    const ConnectedComponent = connect.apply(null, args)(Component)

    const WithReduxWrapper = (props) => {
      return React.createElement(ConnectedComponent, props)
    }

    WithReduxWrapper.dispatchInitialAction = (dispatch, location, query) => {
      const [
        mapStateToProps,
        mapDispatchToProps = defaultMapDispathToProps
      ] = args

      const actions = mapDispatchToProps(dispatch)
      const dispatchInitialAction = Component.dispatchInitialAction || Component.getInitialProps || _noop
      return Promise.all([
          dispatchInitialAction({...actions, location, query})
        ])
        .then([data] => data || {})
    }
  }
}

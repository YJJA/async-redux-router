import React from 'react'
import {connect} from 'react-redux'
import _noop from 'lodash/noop'

// mapSomethingToProps
function mapSomethingToProps() {
  return {}
}

// with redux
export default function withRedux(...args) {
  return (Component) => {
    const ConnectedComponent = connect.apply(null, args)(Component)

    const WithReduxWrapper = (props) => {
      return React.createElement(ConnectedComponent, props)
    }

    WithReduxWrapper.dispatchInitialAction = ({store, location, query}) => {
      const [
        mapStateToProps = mapSomethingToProps,
        mapDispatchToProps = mapSomethingToProps
      ] = args

      const dispatch = action => store.dispatch(action)
      const state = defaultMapToProps(store.getState())
      const actions = mapDispatchToProps(dispatch)
      const dispatchInitialAction = Component.dispatchInitialAction || Component.getInitialProps || _noop
      return Promise.all([
          dispatchInitialAction({...actions, ...state, location, query})
        ])
        .then(([data]) => data || {})
    }
  }
}

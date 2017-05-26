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

    WithReduxWrapper.getInitialProps = ({store, location, query}) => {
      const [
        mapStateToProps = mapSomethingToProps,
        mapDispatchToProps = mapSomethingToProps
      ] = args

      const dispatch = action => store.dispatch(action)
      const state = mapStateToProps(store.getState())
      const actions = mapDispatchToProps(dispatch)
      const getInitialProps = Component.getInitialProps || _noop
      return Promise.all([
        getInitialProps({...actions, ...state, location, query})
      ])
        .then(([data]) => data || {})
    }

    return WithReduxWrapper
  }
}

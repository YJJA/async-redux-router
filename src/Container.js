import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import matchPath from './matchPath'

class Container extends Component {
  static propTypes = {
    Components: PropTypes.array,
    route: PropTypes.object,
    router: PropTypes.shape({
      history: PropTypes.object.isRequired
    }).isRequired
  };

  static childContextTypes = {
    router: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      router: {
        history: this.props.router.history
      }
    }
  }
  render() {
    const {history, Components, route} = this.props.router
    const match = matchPath(history.location.pathname, route)

    // Recursive rendering
    const renderComponents = (Components) => {
      let [Component, ...Children] = Components
      let children = null

      if (!Component) {
        return null
      }

      if (Children.length) {
        children = renderComponents(Children)
      }
      if (children) {
        return <Component history={history} match={match}>{children}</Component>
      }

      return <Component history={history} match={match} />
    }

    return renderComponents(Components)
  }
}

function mapStateToProps({router}) {
  return {router}
}

export default connect(
  mapStateToProps
)(Container)

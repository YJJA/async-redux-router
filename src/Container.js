import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Container extends Component {
  static propTypes = {
    Components: PropTypes.array,
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
    const {history, Components} = this.props.router

    // 递归渲染
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
        return <Component history={history}>{children}</Component>
      }

      return <Component history={history} />
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

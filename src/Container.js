import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export class Container extends Component {
  static propTypes = {
    router: PropTypes.shape({
      Components: PropTypes.array,
      match: PropTypes.object,
      history: PropTypes.object.isRequired
    }).isRequired
  }

  render() {
    const {history, Components, match} = this.props.router

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

      return <Component history={history} match={match} children={children} />
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

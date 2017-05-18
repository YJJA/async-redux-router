import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import matchPath from './matchPath'
import {connect} from 'react-redux'

class NavLink extends Component {
  static propTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired
    }).isRequired,
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    activeClass: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    activeClassName: 'active'
  };

  render() {
    const {location} = this.props.router.history
    const {activeClassName, className, to, exact, strict, ...props} = this.props
    const isActive = matchPath(location.pathname, { path: to, exact, strict })

    return <Link {...props} to={to} className={isActive ? [className, activeClassName].join(' ') : className} />
  }
}

export default connect(
  ({router}) => ({router})
)(NavLink)

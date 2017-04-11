import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import matchPath from './matchPath'

class NavLink extends Component {
  static propTypes = {
    to: Link.propTypes.to,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    activeClass: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    activeClassName: 'active'
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired
    }).isRequired
  };

  render() {
    const {location} = this.context.router.history
    const {activeClassName, className, to, exact, strict, ...props} = this.props
    const isActive = matchPath(location.pathname, { path: to, exact, strict })

    return <Link {...props} to={to} className={isActive ? [className, activeClassName].join(' ') : className} />
  }
}

export default NavLink

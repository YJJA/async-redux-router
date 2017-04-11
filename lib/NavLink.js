'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _matchPath = require('./matchPath');

var _matchPath2 = _interopRequireDefault(_matchPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavLink = function (_Component) {
  (0, _inherits3.default)(NavLink, _Component);

  function NavLink() {
    (0, _classCallCheck3.default)(this, NavLink);
    return (0, _possibleConstructorReturn3.default)(this, (NavLink.__proto__ || (0, _getPrototypeOf2.default)(NavLink)).apply(this, arguments));
  }

  (0, _createClass3.default)(NavLink, [{
    key: 'render',
    value: function render() {
      var location = this.context.router.history.location;
      var _props = this.props,
          activeClassName = _props.activeClassName,
          className = _props.className,
          to = _props.to,
          exact = _props.exact,
          strict = _props.strict,
          props = (0, _objectWithoutProperties3.default)(_props, ['activeClassName', 'className', 'to', 'exact', 'strict']);

      var isActive = (0, _matchPath2.default)(location.pathname, { path: to, exact: exact, strict: strict });

      return _react2.default.createElement(_Link2.default, (0, _extends3.default)({}, props, { to: to, className: isActive ? [className, activeClassName].join(' ') : className }));
    }
  }]);
  return NavLink;
}(_react.Component);

NavLink.propTypes = {
  to: _Link2.default.propTypes.to,
  exact: _propTypes2.default.bool,
  strict: _propTypes2.default.bool,
  activeClass: _propTypes2.default.string,
  style: _propTypes2.default.object
};
NavLink.defaultProps = {
  activeClassName: 'active'
};
NavLink.contextTypes = {
  router: _propTypes2.default.shape({
    history: _propTypes2.default.object.isRequired
  }).isRequired
};
exports.default = NavLink;
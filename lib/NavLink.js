'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _matchPath = require('./matchPath');

var _matchPath2 = _interopRequireDefault(_matchPath);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavLink = function (_Component) {
  _inherits(NavLink, _Component);

  function NavLink() {
    _classCallCheck(this, NavLink);

    return _possibleConstructorReturn(this, (NavLink.__proto__ || Object.getPrototypeOf(NavLink)).apply(this, arguments));
  }

  _createClass(NavLink, [{
    key: 'render',
    value: function render() {
      var location = this.props.router.history.location;

      var _props = this.props,
          activeClassName = _props.activeClassName,
          className = _props.className,
          to = _props.to,
          exact = _props.exact,
          strict = _props.strict,
          props = _objectWithoutProperties(_props, ['activeClassName', 'className', 'to', 'exact', 'strict']);

      var isActive = (0, _matchPath2.default)(location.pathname, { path: to, exact: exact, strict: strict });

      return _react2.default.createElement(_Link2.default, _extends({}, props, { to: to, className: isActive ? [className, activeClassName].join(' ') : className }));
    }
  }]);

  return NavLink;
}(_react.Component);

NavLink.propTypes = {
  router: _propTypes2.default.shape({
    history: _propTypes2.default.object.isRequired
  }).isRequired,
  to: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
  exact: _propTypes2.default.bool,
  strict: _propTypes2.default.bool,
  activeClass: _propTypes2.default.string,
  style: _propTypes2.default.object
};
NavLink.defaultProps = {
  activeClassName: 'active'
};
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var router = _ref.router;
  return { router: router };
})(NavLink);
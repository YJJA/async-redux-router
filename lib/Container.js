'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = exports.Container = function (_Component) {
  _inherits(Container, _Component);

  function Container() {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
  }

  _createClass(Container, [{
    key: 'render',
    value: function render() {
      var _props$router = this.props.router,
          history = _props$router.history,
          Components = _props$router.Components,
          match = _props$router.match;

      // Recursive rendering

      var renderComponents = function renderComponents(Components) {
        var _Components = _toArray(Components),
            Component = _Components[0],
            Children = _Components.slice(1);

        var children = null;

        if (!Component) {
          return null;
        }

        if (Children.length) {
          children = renderComponents(Children);
        }

        return _react2.default.createElement(Component, { history: history, match: match, children: children });
      };

      return renderComponents(Components);
    }
  }]);

  return Container;
}(_react.Component);

Container.propTypes = {
  router: _propTypes2.default.shape({
    Components: _propTypes2.default.array,
    match: _propTypes2.default.object,
    history: _propTypes2.default.object.isRequired
  }).isRequired
};


function mapStateToProps(_ref) {
  var router = _ref.router;

  return { router: router };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Container);
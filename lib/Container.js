'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

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

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = function (_Component) {
  (0, _inherits3.default)(Container, _Component);

  function Container() {
    (0, _classCallCheck3.default)(this, Container);
    return (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).apply(this, arguments));
  }

  (0, _createClass3.default)(Container, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        router: {
          history: this.props.router.history
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$router = this.props.router,
          history = _props$router.history,
          Components = _props$router.Components;

      // 递归渲染

      var renderComponents = function renderComponents(Components) {
        var _Components = (0, _toArray3.default)(Components),
            Component = _Components[0],
            Children = _Components.slice(1);

        var children = null;

        if (!Component) {
          return null;
        }

        if (Children.length) {
          children = renderComponents(Children);
        }
        if (children) {
          return _react2.default.createElement(
            Component,
            { history: history },
            children
          );
        }

        return _react2.default.createElement(Component, { history: history });
      };

      return renderComponents(Components);
    }
  }]);
  return Container;
}(_react.Component);

Container.propTypes = {
  Components: _propTypes2.default.array,
  router: _propTypes2.default.shape({
    history: _propTypes2.default.object.isRequired
  }).isRequired
};
Container.childContextTypes = {
  router: _propTypes2.default.object.isRequired
};


function mapStateToProps(_ref) {
  var router = _ref.router;

  return { router: router };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Container);
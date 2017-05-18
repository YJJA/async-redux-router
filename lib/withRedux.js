'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = withRedux;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _noop2 = require('lodash/noop');

var _noop3 = _interopRequireDefault(_noop2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mapSomethingToProps
function mapSomethingToProps() {
  return {};
}

// with redux
function withRedux() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (Component) {
    var ConnectedComponent = _reactRedux.connect.apply(null, args)(Component);

    var WithReduxWrapper = function WithReduxWrapper(props) {
      return _react2.default.createElement(ConnectedComponent, props);
    };

    WithReduxWrapper.getInitialProps = function (_ref) {
      var store = _ref.store,
          location = _ref.location,
          query = _ref.query;
      var _args$ = args[0],
          mapStateToProps = _args$ === undefined ? mapSomethingToProps : _args$,
          _args$2 = args[1],
          mapDispatchToProps = _args$2 === undefined ? mapSomethingToProps : _args$2;


      var dispatch = function dispatch(action) {
        return store.dispatch(action);
      };
      var state = mapStateToProps(store.getState());
      var actions = mapDispatchToProps(dispatch);
      var getInitialProps = Component.getInitialProps || _noop3.default;
      return Promise.all([getInitialProps(_extends({}, actions, state, { location: location, query: query }))]).then(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            data = _ref3[0];

        return data || {};
      });
    };

    return WithReduxWrapper;
  };
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _loadRoutes = require('./loadRoutes');

var _loadRoutes2 = _interopRequireDefault(_loadRoutes);

var _matchRoutes = require('./matchRoutes');

var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

var _routerActions = require('./routerActions');

var _routerActions2 = _interopRequireDefault(_routerActions);

var _querystring = require('./querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unlisten = null;

var asyncContainer = function asyncContainer(store, history, routes) {
  var branch = (0, _matchRoutes2.default)(routes, history.location.pathname);
  var state = store.getState();
  var redirect = getRedirect(state, branch, history.location);

  if (redirect && redirect.to) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('No permission to access this route, redirect to\uFF1A' + redirect.to);
    }
    // if server-side
    if (typeof window === 'undefined') {
      return Promise.resolve(redirect.to);
    }

    // other web site
    if (/^(https?):\/\//.test(redirect.to)) {
      window.location.href = redirect.to;
      return Promise.resolve();
    }

    if (redirect.replace) {
      history.replace(redirect.to);
    } else {
      history.push(redirect.to);
    }

    return asyncContainer(store, history, routes);
  }

  if (!unlisten) {
    unlisten = history.listen(function () {
      return asyncContainer(store, history, routes);
    });
  }

  var dispatch = function dispatch(action) {
    return store.dispatch(action);
  };
  var match = branch[branch.length - 1].match;
  var query = _querystring2.default.parse(history.location.search.substr(1));
  return (0, _loadRoutes2.default)(dispatch, history.location, branch).then(function (Components) {
    store.dispatch((0, _routerActions2.default)(history, Components, _extends({}, match, { query: query })));
  });
};

exports.default = asyncContainer;


function getRedirect(state, branch, from_uri) {
  var redirect = {
    to: '',
    replace: true
  };
  var route = void 0,
      auth = void 0,
      to = void 0,
      i = void 0;
  for (i = 0; i < branch.length; i++) {
    route = branch[i].route;
    auth = route.redirect || route.auth;
    if ((0, _isString3.default)(auth)) {
      to = auth;
    } else if ((0, _isFunction3.default)(auth)) {
      to = auth(state, history.location);
    }

    if (!(0, _isEmpty3.default)(to)) {
      if ((0, _isString3.default)(to)) {
        return _extends({}, redirect, { to: to });
      } else if ((0, _isPlainObject3.default)(to)) {
        return _extends({}, redirect, to);
      }
    }
  }
}
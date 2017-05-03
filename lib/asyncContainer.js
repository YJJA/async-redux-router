'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

  var redirect = getRedirect(branch);

  if (!redirect) {
    var state = store.getState();
    redirect = authorization(state, branch);
    if (redirect) {
      redirect = _querystring2.default.mergeUrl(redirect, { form: history.location.pathname });
    }
  }

  if (redirect) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('No permission to access this route, redirect to\uFF1A' + redirect);
    }
    if (typeof window === 'undefined') {
      return Promise.resolve(redirect);
    }

    if (/^(https?):\/\//.test(redirect)) {
      window.location.href = redirect;
      return Promise.resolve();
    }

    history.replace(redirect);
    // console.log(qs.parse(history.location.search.substr(1)))
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
  return (0, _loadRoutes2.default)(dispatch, history.location, branch).then(function (Components) {
    store.dispatch((0, _routerActions2.default)(history, Components, match));
  });
};

exports.default = asyncContainer;


function authorization(state, branch) {
  var redirect = void 0;
  for (var i = 0; i < branch.length; i++) {
    var route = branch[i].route;
    if (typeof route.auth === 'function') {
      redirect = route.auth(state);
      if (redirect) {
        return redirect;
      }
    }
  }
}

function getRedirect(branch) {
  for (var i = 0; i < branch.length; i++) {
    var route = branch[i].route;
    if (typeof route.redirect === 'string') {
      return route.redirect;
    }
  }
}
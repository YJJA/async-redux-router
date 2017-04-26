'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routerReducer;

var _routerActions = require('./routerActions');

var initialState = {
  history: null,
  Components: [null],
  route: null
};

function routerReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _routerActions.ROUTER_LOCATION_CHANGE:
      return { history: action.history, Components: action.Components, route: action.route };

    default:
      return state;
  }
}
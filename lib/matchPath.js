'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchPath = exports.compilePath = exports.computeMatch = undefined;

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); } // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/matchPath.js

var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var computeMatch = exports.computeMatch = function computeMatch(pathname) {
  return {
    path: '/',
    url: '/',
    params: {},
    isExact: pathname === '/'
  };
};

var compilePath = exports.compilePath = function compilePath(pattern, options) {
  var cacheKey = '' + options.end + options.strict;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) {
    return cache[pattern];
  }

  var keys = [];
  var re = (0, _pathToRegexp2.default)(pattern, keys, options);
  var compiledPattern = { re: re, keys: keys };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
};

var matchPath = exports.matchPath = function matchPath(pathname) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof options === 'string') {
    options = { path: options };
  }

  var _options = options,
      _options$path = _options.path,
      path = _options$path === undefined ? '/' : _options$path,
      _options$exact = _options.exact,
      exact = _options$exact === undefined ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === undefined ? false : _options$strict;

  var _compilePath = compilePath(path, { end: exact, strict: strict }),
      re = _compilePath.re,
      keys = _compilePath.keys;

  var match = re.exec(pathname);

  if (!match) {
    return null;
  }

  var _match = _toArray(match),
      url = _match[0],
      values = _match.slice(1);

  var isExact = pathname === url;

  if (exact && !isExact) {
    return null;
  }

  return {
    path: path, // the path pattern used to match
    url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
    isExact: isExact, // whether or not we matched exactly
    params: keys.reduce(function (memo, key, index) {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
};

exports.default = matchPath;
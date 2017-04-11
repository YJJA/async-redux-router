'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.parse = parse;
exports.stringify = stringify;
exports.merge = merge;
exports.mergeUrl = mergeUrl;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 解析 querystring
function parse(str) {
  if (!str || typeof str !== 'string') {
    return {};
  }
  return str.split('&').reduce(function (obj, item) {
    var key = void 0,
        value = void 0;
    if (~item.indexOf('=')) {
      var _item$split = item.split('=');

      var _item$split2 = (0, _slicedToArray3.default)(_item$split, 2);

      key = _item$split2[0];
      value = _item$split2[1];
    } else if (item) {
      key = item;
      value = true;
    }
    if (typeof obj[key] !== 'undefined') {
      obj[key] = [].concat(obj[key], decodeURIComponent(value));
    } else {
      obj[key] = decodeURIComponent(value);
    }
    return obj;
  }, {});
}

// 序列化
function stringify(obj) {
  if (!obj || (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object') {
    return '';
  }
  return (0, _keys2.default)(obj).map(function (key) {
    if ((0, _typeof3.default)(obj[key]) !== 'object') {
      return key + '=' + encodeURIComponent(obj[key]);
    } else {
      return obj[key].map(function (value) {
        return key + '=' + encodeURIComponent(value);
      }).join('&');
    }
  }).join('&');
}

// 合并 queryString
function merge(str, opts) {
  var query = parse(str);
  var query2 = typeof opts === 'string' ? parse(opts) : opts;
  return stringify((0, _extends3.default)({}, query, query2));
}

// 合并 url 上的 query
function mergeUrl(url, opts) {
  var _url$split = url.split('?'),
      _url$split2 = (0, _slicedToArray3.default)(_url$split, 2),
      pathname = _url$split2[0],
      _url$split2$ = _url$split2[1],
      query = _url$split2$ === undefined ? '' : _url$split2$;

  return pathname + '?' + merge(query, opts);
}

exports.default = {
  parse: parse,
  stringify: stringify,
  merge: merge,
  mergeUrl: mergeUrl
};
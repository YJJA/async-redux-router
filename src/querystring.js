
// 解析 querystring
export function parse(str) {
  if (!str || typeof str !== 'string') {
    return {}
  }
  return str.split('&').reduce((obj, item) => {
    let key, value
    if (~item.indexOf('=')) {
      [key, value] = item.split('=')
    } else if (item) {
      [key, value] = [item, true]
    }
    if (typeof obj[key] !== 'undefined') {
      obj[key] = [].concat(obj[key], decodeURIComponent(value))
    } else {
      obj[key] = decodeURIComponent(value)
    }
    return obj
  }, {})
}

// 序列化
export function stringify(obj) {
  if (!obj || typeof obj !== 'object') {
    return ''
  }
  return Object.keys(obj).map(key => {
    if (typeof obj[key] !== 'object') {
      return `${key}=${encodeURIComponent(obj[key])}`
    } else {
      return obj[key].map(value => {
        return `${key}=${encodeURIComponent(value)}`
      }).join('&')
    }
  }).join('&')
}

// 合并 queryString
export function merge(str, opts) {
  let query = parse(str)
  let query2 = typeof opts === 'string' ? parse(opts) : opts
  return stringify({...query, ...query2})
}

// 合并 url 上的 query
export function mergeUrl(url, opts) {
  let [pathname, query = ''] = url.split('?')
  return pathname + '?' + merge(query, opts)
}

export default {
  parse,
  stringify,
  merge,
  mergeUrl
}

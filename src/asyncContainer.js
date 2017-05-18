import _isString from 'lodash/isString'
import _isFunction from 'lodash/isFunction'
import _isPlainObject from 'lodash/isPlainObject'
import _isEmpty from 'lodash/isEmpty'

import loadRoutes from './loadRoutes'
import matchRoutes from './matchRoutes'
import routerChange from './routerActions'
import qs from './querystring'

let unlisten = null

const asyncContainer = (store, history, routes) => {
  const branch = matchRoutes(routes, history.location.pathname)
  const state = store.getState()
  const redirect = getRedirect(state, branch, history.location)

  if (redirect && redirect.to) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`No permission to access this route, redirect to：${redirect.to}`)
    }
    // if server-side
    if (typeof window === 'undefined') {
      return Promise.resolve(redirect.to)
    }

    // other web site
    if (/^(https?):\/\//.test(redirect.to)) {
      window.location.href = redirect.to
      return Promise.resolve()
    }

    if (redirect.replace) {
      history.replace(redirect.to)
    } else {
      history.push(redirect.to)
    }

    return asyncContainer(store, history, routes)
  }

  if (!unlisten) {
    unlisten = history.listen(() => asyncContainer(store, history, routes))
  }

  const match = branch[branch.length - 1].match
  const query = qs.parse(history.location.search.substr(1))
  return loadRoutes(store, history.location, query, branch)
    .then(Components => {
      store.dispatch(routerChange(history, Components, {...match, query}))
    })
}

export default asyncContainer

function getRedirect(state, branch, from_uri) {
  let redirect = {
    to: '',
    replace: true
  }
  let route, auth, to, i
  for (i = 0; i < branch.length; i++) {
    route = branch[i].route
    auth = route.redirect || route.auth
    if (_isString(auth)) {
      to = auth
    } else if (_isFunction(auth)) {
      to = auth(state, history.location)
    }

    if (!_isEmpty(to)) {
      if (_isString(to)) {
        return {...redirect, to}
      } else if(_isPlainObject(to)) {
        return {...redirect, ...to}
      }
    }
  }
}

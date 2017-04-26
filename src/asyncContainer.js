import loadRoutes from './loadRoutes'
import matchRoutes from './matchRoutes'
import routerChange from './routerActions'
import qs from './querystring'

let unlisten = null

const asyncContainer = (store, history, routes) => {
  const branch = matchRoutes(routes, history.location.pathname)

  let redirect = getRedirect(branch)

  if (!redirect) {
    const state = store.getState()
    redirect = authorization(state, branch)
    if (redirect) {
      redirect = qs.mergeUrl(redirect, {form: history.location.pathname})
    }
  }

  if (redirect) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`No permission to access this route, redirect to：${redirect}`)
    }
    if (typeof window === 'undefined') {
      return Promise.resolve(redirect)
    }

    history.replace(redirect)
    // console.log(qs.parse(history.location.search.substr(1)))
    return asyncContainer(store, history, routes)
  }

  if (!unlisten) {
    unlisten = history.listen(() => asyncContainer(store, history, routes))
  }

  const dispatch = action => store.dispatch(action)
  const route = branch[branch.length - 1]
  return loadRoutes(dispatch, history.location, branch)
    .then(Components => {
      store.dispatch(routerChange(history, Components, route))
    })
}

export default asyncContainer

function authorization(state, branch) {
  let redirect
  for (var i = 0; i < branch.length; i++) {
    let route = branch[i].route
    if (typeof route.auth === 'function') {
      redirect = route.auth(state)
      if (redirect) {
        return redirect
      }
    }
  }
}

function getRedirect(branch) {
  for (var i = 0; i < branch.length; i++) {
    let route = branch[i].route
    if (typeof route.redirect === 'string') {
      return route.redirect
    }
  }
}

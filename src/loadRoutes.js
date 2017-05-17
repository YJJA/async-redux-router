const loadRoutes = (dispatch, location, query, branch) => {
  const promise = branch.map(({match, route}) => {
    if (typeof window !== 'object' && !route.server) {
      return null
    }
    if (route.component) {
      return route.component
    }
    return route.asyncComponent()
  })
  return Promise.all(promise)
    .then((Components) => {
      // Initializing Components data
      const promise = Components.map(Component => {
        if (typeof window !== 'object' && Component && typeof Component.dispatchInitialAction === 'function') {
          return Component.dispatchInitialAction(dispatch, location, query)
        }
        return null
      })
      return Promise.all(promise)
        .then(() => Components)
    })
}

export default loadRoutes

const loadRoutes = (dispatch, location, branch) => {
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
        if (typeof window !== 'object' && Component && typeof Component.getInitialProps === 'function') {
          return Component.getInitialProps(dispatch, location)
        }
        return null
      })
      return Promise.all(promise)
        .then(() => Components)
    })
}

export default loadRoutes

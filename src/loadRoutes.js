const loadRoutes = (store, location, query, branch) => {
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
        if (Component && typeof Component.dispatchInitialAction === 'function') {
          return Component.dispatchInitialAction({store, location, query})
        }
        return null
      })

      const promiseAll = Promise.all(promise)
      if (typeof window === 'undefined') {
        return promiseAll.then(() => Components)
      } else {
        promiseAll.catch(err => console.log(err))
        return Components
      }
    })
}

export default loadRoutes

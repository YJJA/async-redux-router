// 加载路由
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
      // 初始化页面数据
      const promise = Components.map(Component => {
        // 初始化页面数据，只在服务端进行，客户端不初始化
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

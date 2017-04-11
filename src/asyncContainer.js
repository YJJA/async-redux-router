import loadRoutes from './loadRoutes'
import matchRoutes from './matchRoutes'
import routerChange from './routerActions'
import qs from './querystring'

let unlisten = null

// 加载页面
const asyncContainer = (store, history, routes) => {
  // 匹配路由
  const branch = matchRoutes(routes, history.location.pathname)

  // 重定向判断
  let redirect = getRedirect(branch)

  // 判断权限
  if (!redirect) {
    const state = store.getState()
    redirect = authorization(state, branch)
    if (redirect) {
      redirect = qs.mergeUrl(redirect, {form: history.location.pathname})
    }
  }

  // 是否重定向
  if (redirect) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`没有权限访问该路由，重定向到：${redirect}`)
    }
    // 如果是服务端渲染
    if (typeof window === 'undefined') {
      return Promise.resolve(redirect)
    }

    // 客户端渲染
    history.replace(redirect)
    // console.log(qs.parse(history.location.search.substr(1)))
    return asyncContainer(store, history, routes)
  }

  // 监听路由
  if (!unlisten) {
    unlisten = history.listen(() => asyncContainer(store, history, routes))
  }

  // 加载组件
  const dispatch = action => store.dispatch(action)
  return loadRoutes(dispatch, history.location, branch)
    .then(Components => {
      store.dispatch(routerChange(history, Components))
    })
}

export default asyncContainer

// 判断权限
function authorization(state, branch) {
  for (var i = 0; i < branch.length; i++) {
    let route = branch[i].route
    if (typeof route.auth === 'function') {
      return route.auth(state)
    }
  }
}

// 重定向
function getRedirect(branch) {
  for (var i = 0; i < branch.length; i++) {
    let route = branch[i].route
    if (typeof route.redirect === 'string') {
      return route.redirect
    }
  }
}

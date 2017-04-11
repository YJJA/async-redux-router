import React from 'react'
import Index from './containers/Index'

const routes = [
  {
    path: '/',
    exact: true,
    component: props => <div> 这是首页</div>
  },
  {
    path: '/index',
    // 严格匹配
    exact: true,
    // 是否需要服务端渲染
    server: true,
    // 重定向到这个页面
    // redirect: '/redirect',
    // 权限验证，通过验证不返回值，未通过验证返回跳转 URL
    // 默认传入当前 state
    auth: (state) => {
      // return '/login?login=true&this=login'
    },
    // 同步加载组件
    // component: Index,
    // 异步加载组件
    asyncComponent: () => {
      const Component = import('./containers/Index')
        .then(result => result.default)

      return Component
    },
    routes: [
      {
        path: '/index/:id',
        component: props => {
          return <div>关于页面(子页面)</div>
        }
      }
    ]
  },
  {
    path: '*',
    component: props => <div>页面找不到了</div>
  }
]

export default routes

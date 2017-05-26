import React from 'react'

const routes = [
  {
    path: '/',
    exact: true,
    server: true,
    asyncComponent: () => import('../containers/index')
      .then(result => result.default)
  },
  {
    path: '/about',
    exact: true,
    server: true,
    asyncComponent: () => import('../containers/about')
      .then(result => result.default)
  },
  {
    path: '*',
    server: true,
    component: props => <div>页面找不到了</div>
  }
]

export default routes

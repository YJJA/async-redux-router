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
    // Strict matching

    exact: true,
    // Server render

    server: true,

    // Authentication, through the verification does not return the value, not to return to the jump through validation URL
    redirect: (state, location) => {
      // return '/login?login=true&this=login'

      return {
        to: '/login',
        replace: true
      }
    },

    // Synchronous loading component
    // component: Index,

    // Asynchronous load component
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

# async-redux-router
  异步 React Router 加载组件，同时支持客户端和服务端的组件异步加载。

### 安装（Install）
  ```
    npm install async-redux-router --save
  ```

### 特点
  支持异步组件加载
  支持路由重定向
  支持路由访问权限认证
  支持客户端和服务端渲染
  支持路由嵌套

### 使用方式
#### 客户端：
  ```
    // ./client.js
    import React from 'react'
    import ReactDOM from 'react-dom'
    import {Provider} from 'react-redux'
    import configureStore from './store/configureStore'
    import createHistory from 'history/createBrowserHistory'
    import routes from './routes'
    import {asyncContainer, Container} from 'async-redux-router'

    const store = configureStore(window.__INITIAL_STATE__)
    const history = createHistory()

    asyncContainer(store, history, routes).then(() => {
      ReactDOM.render(
        <Provider store={store}>
          <Container />
        </Provider>,
        document.getElementById('app')
      )
    })

    // ./routes.js
    import React from 'react'

    const routes = [
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
          const Component = import('./containers/index')
            .then(result => result.default)

          return Component
        },
        routes: [
          {
            path: '/index/:id',
            component: props => {
              console.log(props)
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

    // ./containers/index.js
    import React from 'react'
    import {Link, NavLink} from '../../router'

    const Index = props => {
      return (
        <div>关于页面
          <div>
            <NavLink to="/" exact>返回首页</NavLink>
            <NavLink to="/about" exact>关于页面</NavLink>
            {props.children}
          </div>
        </div>
      )
    }

    // 初始化 Props, 可异步，或同步
    // 只方法只会在服务端渲染时调用
    Index.getInitialProps = (dispatch, location) => {
      console.log('getInitialProps()')
    }

  ```
#### 服务端
  ```
    // serverRender.js
    import React from 'react'
    import ReactDOMServer from 'react-dom/server'
    import {Provider} from 'react-redux'
    import createHistory from 'history/createMemoryHistory'

    import Html from '../containers/Html'
    import routes from '../routes'
    import {asyncContainer, Container} from '../router'
    import configureStore from '../store/configureStore'

    const serverRender = (req, res, next) => {
      const assets = getAssetsJson()
      const store = configureStore()
      const history = createHistory({
        initialEntries: [req.url]
      })

      asyncContainer(store, history, routes)
        .then((redirect) => {
          if (redirect) {
            console.log('服务端重定向：' + redirect)
            return res.redirect(301, redirect)
          }
          const context = ReactDOMServer.renderToString(
            <Provider store={store}>
              <Container />
            </Provider>
          )
          const html = ReactDOMServer.renderToStaticMarkup(
            <Html title="React Server" assets={assets} context={context} state={store.getState()}/>
          )
          const documentHtml = `<!doctype html>${html}`

          res.send(documentHtml)
        })
        .catch(next)
    }

    export default serverRender

    // app.js
    import express from 'express'
    import serverRender from './serverRender'
    const app = express()
    app.get('*', serverRender)
  ```

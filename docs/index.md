# Async-redux-router
  A async routing for React

## Guides
  * [asyncContainer](guides/asyncContainer.md)
  * [routes Configuration](guides/routesConfiguration.md)
  * [Container](guides/Container.md)
  * [Link](guides/Link.md)
  * [NavLink](guides/NavLink.md)
  * [routerReducer](guides/routerReducer.md)
  * [connect](guides/connect.md)
  * [dispatchInitialAction](guides/dispatchInitialAction.md)

## example
  ```js
    import React from 'react'
    import {createStore} from 'redux'
    import createHistory from 'history/createBrowserHistory'
    import {asyncContainer, Container} from 'async-redux-router'
    import routes from './routes'

    const store = createStore(...)
    const history = createHistory()

    asyncContainer(store, history, routes)
      .then(() => {
        ReactDOM.render(
          <Provider store={store}>
            <Container />
          </Provider>,
          document.getElementById('app')
        )
      })
  ```

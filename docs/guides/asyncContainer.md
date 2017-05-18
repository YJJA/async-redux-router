# asyncContainer
  initial async Container component

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

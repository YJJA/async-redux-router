# Container
  a component for React

  ```js
    import {asyncContainer, Container} from 'async-redux-router'

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

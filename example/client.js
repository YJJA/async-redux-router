import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './configureStore'
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



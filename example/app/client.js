import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'

import asyncContainer from '../../src/asyncContainer'
import Container from '../../src/Container'

import configureStore from './store/configureStore'
import routes from './routes'

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

import fse from 'fs-extra'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {Provider} from 'react-redux'
import createHistory from 'history/createMemoryHistory'

import asyncContainer from '../../../src/asyncContainer'
import Container from '../../../src/Container'

import routes from '../routes'
import configureStore from '../store/configureStore'

const serverRender = (req, res, next) => {
  const store = configureStore()
  const history = createHistory({
    initialEntries: [req.url]
  })

  const indexPath = path.resolve(__dirname, './index.html')

  Promise.all([
    asyncContainer(store, history, routes),
    fse.readFile(indexPath, 'utf8')
  ]).then(([redirect, content]) => {
    if (redirect) {
      console.log('Server redirection: ' + redirect)
      return res.redirect(301, redirect)
    }
    const state = store.getState()
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <Container />
      </Provider>
    )
    const initialScriptStr = `<script>window.__INITIAL_STATE__=${JSON.stringify(state)}</script>`
    content = content.replace('<!--state-->', initialScriptStr)
    content = content.replace('<!--html-->', html)
    res.send(content)
  }).catch(next)
}

export default serverRender

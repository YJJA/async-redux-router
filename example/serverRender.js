import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {Provider} from 'react-redux'
import createHistory from 'history/createMemoryHistory'

import Html from '../containers/Html'
import routes from '../routes'
import {asyncContainer, Container} from 'async-redux-router'
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
        console.log('Server redirection: ' + redirect)
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

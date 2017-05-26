import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const logger = store => next => action => {
  console.log('dispatching', action)
  return next(action)
}

function configureStore(initialState) {
  const middlewares = [
    thunk,
    logger
  ]

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  )
}

export default configureStore

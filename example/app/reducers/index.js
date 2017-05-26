import { combineReducers } from 'redux'
import {routerReducer as router} from '../../../src'
import about from './aboutReducer'

const rootReducer = combineReducers({
  router,
  about
})

export default rootReducer

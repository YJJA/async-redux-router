import {ROUTER_LOCATION_CHANGE} from './routerActions'

const initialState = {
  history: null,
  Components: [null],
  match: null
}

export default function routerReducer(state = initialState, action) {
  switch (action.type) {
    case ROUTER_LOCATION_CHANGE:
      return {history: action.history, Components: action.Components, match: action.match}

    default:
      return state
  }
}

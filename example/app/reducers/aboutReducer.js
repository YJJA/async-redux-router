import {type} from '../actions/aboutActions'

const initialState = {
  isFetching: false,
  error: null,
  list: []
}

export default function aboutReducer(state = initialState, action) {
  switch (action.type) {
    case type.ABOUT_REQUEST:
      return {...state, isFetching: true}

    case type.ABOUT_SUCCESS:
      return {...state, isFetching: false, list: action.data.list}

    case type.ABOUT_FAILURE:
      return {...state, isFetching: false, error: action.error}

    default:
      return state
  }
}

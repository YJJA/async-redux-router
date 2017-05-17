
export const ROUTER_LOCATION_CHANGE = '@ASYNC-REDUX-ROUTER/CHANGE'

const routerChange = (history, Components, match) => {
  return {
    type: ROUTER_LOCATION_CHANGE,
    history,
    Components,
    match
  }
}

export default routerChange


export const ROUTER_LOCATION_CHANGE = 'ROUTER_LOCATION_CHANGE'

const routerChange = (history, Components) => {
  return {
    type: ROUTER_LOCATION_CHANGE,
    history,
    Components
  }
}

export default routerChange

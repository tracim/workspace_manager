import { INIT_WORKSPACE, CREATE_WORKSPACE, UPDATE_WORKSPACE } from '../action-creators.js'

export default function workspace (state = [], action) {
  switch (action.type) {
    case INIT_WORKSPACE:
      return action.wsList

    case CREATE_WORKSPACE:
      return {
        id: 0,
        name: action.name
      }

    case UPDATE_WORKSPACE:
      return {
        id: action.id,
        name: action.name
      }

    default:
      return state
  }
}

import { INIT_ROLE } from '../action-creators.js'

export default function role (state = [], action) {
  switch (action.type) {
    case INIT_ROLE:
      return action.userRole

    default:
      return state
  }
}

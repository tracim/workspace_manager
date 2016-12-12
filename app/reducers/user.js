import { INIT_USER } from '../action-creators.js'

export default function user (state = [], action) {
  switch (action.type) {
    case INIT_USER:
      return action.userList

    default:
      return state
  }
}

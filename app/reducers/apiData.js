import { SET_WS_DATA, ADD_USER_DATA, REMOVE_USER_DATA } from '../action-creators.js'
import reject from 'lodash.reject'
import findIndex from 'lodash.findindex'

export default function apiData (state = {
  workspace: {
    id: 0
  },
  user: [],
  role: []
}, action) {
  switch (action.type) {
    case SET_WS_DATA:
      return {...state, workspace: { id: action.id }}

    case ADD_USER_DATA:
      return findIndex(state.user, { id: action.id }) === -1
        ? {...state, user: [...state.user, { id: action.id, name: action.name }]}
        : state

    case REMOVE_USER_DATA:
      return {...state, user: reject(state.user, { id: action.id })}

    default:
      return state
  }
}

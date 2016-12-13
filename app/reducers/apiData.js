import { SET_WS_DATA, ADD_USER_DATA, REMOVE_USER_DATA, UPDATE_USER_ROLE_DATA, UPDATE_USER_EMAILNOTIF_DATA } from '../action-creators.js'
import reject from 'lodash.reject'
import findIndex from 'lodash.findindex'

export default function apiData (state = {
  workspace: {
    id: 0
  },
  user: []
}, action) {
  switch (action.type) {
    case SET_WS_DATA:
      return {...state, workspace: { id: action.id }}

    case ADD_USER_DATA:
      return findIndex(state.user, { id: action.id }) === -1
        ? {...state, user: [...state.user, { id: action.id, name: action.name, role: 0, emailnotif: false }]}
        : state

    case REMOVE_USER_DATA:
      return {...state, user: reject(state.user, { id: action.id })}

    case UPDATE_USER_ROLE_DATA:
      return {
        ...state,
        user: state.user.map((oneUser) => oneUser.id === action.userId
          ? {...oneUser, role: action.roleId}
          : oneUser
        )
      }

    case UPDATE_USER_EMAILNOTIF_DATA:
      return {
        ...state,
        user: state.user.map((oneUser) => oneUser.id === action.userId
          ? {...oneUser, emailnotif: action.checked}
          : oneUser
        )
      }

    default:
      return state
  }
}

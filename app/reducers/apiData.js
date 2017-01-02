import { SET_WS_DATA, SET_WS_DESCRIPTION, ADD_USER_DATA, RESET_USER_DATA, ADD_NEW_USER_DATA, REMOVE_USER_DATA, UPDATE_USER_ROLE_DATA, UPDATE_USER_EMAILNOTIF_DATA } from '../action-creators.js'
import reject from 'lodash.reject'
import findIndex from 'lodash.findindex'
import { ROLE_LIST, generateNewUserId } from '../lib/helper.js'

export default function apiData (state = {
  workspace: {
    id: -1
  },
  user: []
}, action) {
  switch (action.type) {
    case SET_WS_DATA:
      let tempUser
      const apiDataUserFromWs = action.roleList.reduce((acc, oneRole) => {
        if (oneRole.workspaceId === action.id) {
          tempUser = action.userList.find(oneUser => oneUser.id === oneRole.userId)
          acc.push({ id: tempUser.id, isNew: false, name: tempUser.name, role: oneRole.roleId, subscribeNotif: oneRole.subscribedNotif })
        }
        return acc
      }, [])
      return {...state, workspace: {...state.workspace, id: action.id, name: action.name}, user: apiDataUserFromWs}

    case SET_WS_DESCRIPTION:
      return {...state, workspace: {...state.workspace, description: action.description}}

    case RESET_USER_DATA:
      return {...state, user: []}

    case ADD_USER_DATA:
      return findIndex(state.user, { id: action.id }) === -1
        ? {...state, user: [...state.user, { id: action.id, isNew: false, name: action.name, role: ROLE_LIST.READER.id, subscribeNotif: false }]}
        : state

    case ADD_NEW_USER_DATA:
      const { name, email, pw, canCreateWs, isAdmin, sendEmailNotif } = action
      return {...state, user: [...state.user, { id: generateNewUserId(), isNew: true, name, email, pw, canCreateWs, isAdmin, sendEmailNotif, role: ROLE_LIST.READER.id, subscribeNotif: false }]}

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
          ? {...oneUser, subscribeNotif: action.checked}
          : oneUser
        )
      }

    default:
      return state
  }
}

import {
  SET_WS_DATA,
  SET_WS_DESCRIPTION,
  ADD_USER_DATA,
  RESET_USER_DATA,
  ADD_NEW_USER_DATA,
  REMOVE_USER_DATA,
  UPDATE_USER_ROLE_DATA,
  UPDATE_USER_EMAILNOTIF_DATA
} from '../action-creators.js'
import reject from 'lodash.reject'
import { ROLE_LIST, USER_LOCAL_STATUS, generateNewUserId } from '../lib/helper.js'

export default function apiData (state = {
  workspace: {
    id: -1
  },
  user: []
}, action) {
  const { NO_UPDATE, UPDATED, CREATED, REMOVED } = USER_LOCAL_STATUS

  switch (action.type) {
    case SET_WS_DATA:
      const apiDataUserFromWs = action.roleList.map(oneRole => (
        { id: oneRole.user.id, isNew: false, localStatus: NO_UPDATE, name: oneRole.user.name, role: oneRole.role, subscribeNotif: oneRole.subscribed_to_notif }
      ))
      return {...state, workspace: {...state.workspace, id: action.id, label: action.label}, user: apiDataUserFromWs}

    case SET_WS_DESCRIPTION:
      return {...state, workspace: {...state.workspace, description: action.description}}

    case RESET_USER_DATA:
      return {...state, user: []}

    // note about localStatus : we do not handle the case where, for exemple, a user is already in a ws, then it is removed, then it is added back.
    // Its localStatus should be NO_UPDATE but since we dont keep initial user's state, we can't know that so we will set it's localStatus to UPDATED.
    // So we will send to api a user without modification. No bit deal, backend will handle this case.
    case ADD_USER_DATA:
      // return findIndex(state.user, { id: action.id }) === -1
      return state.user.filter(oneUser => oneUser.id === action.id).length === 0
        ? {...state, user: [...state.user, { id: action.id, isNew: false, localStatus: UPDATED, name: action.name, role: ROLE_LIST.READER.id, subscribeNotif: false }]}
        : state

    case ADD_NEW_USER_DATA:
      const { name, email, pw, timezone, rights, config } = action
      return {...state, user: [...state.user, { id: generateNewUserId(), isNew: true, localStatus: CREATED, name, email, pw, timezone, rights, config, role: ROLE_LIST.READER.id, subscribeNotif: false }]}

    case REMOVE_USER_DATA:
      return action.isNew
        ? {...state, user: reject(state.user, { id: action.id })}
        : {...state, user: state.user.map(oneUser => oneUser.id === action.id ? {...oneUser, localStatus: REMOVED} : oneUser)}

    // note about localStatus : if user is CREATED, keep same localStatus when role change
    case UPDATE_USER_ROLE_DATA:
      return {
        ...state,
        user: state.user.map(oneUser => oneUser.id === action.userId
          ? {...oneUser, localStatus: oneUser.localStatus !== CREATED ? UPDATED : CREATED, role: action.roleId}
          : oneUser
        )
      }

    // note about localStatus : if user is CREATED, keep same localStatus when emailNotif change
    case UPDATE_USER_EMAILNOTIF_DATA:
      return {
        ...state,
        user: state.user.map(oneUser => oneUser.id === action.userId
          ? {...oneUser, localStatus: oneUser.localStatus !== CREATED ? UPDATED : CREATED, subscribeNotif: action.checked}
          : oneUser
        )
      }

    default:
      return state
  }
}

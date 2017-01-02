export const INIT_WORKSPACE = 'INIT_WORKSPACE'
export const ADD_WORKSPACE = 'ADD_WORKSPACE'
export const UPDATE_WORKSPACE = 'UPDATE_WORKSPACE'
export const REMOVE_WORKSPACE = 'REMOVE_WORKSPACE'

export const INIT_USER = 'INIT_USER'
export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const REMOVE_USER = 'REMOVE_USER'

export const INIT_ROLE = 'INIT_ROLE'

export const REQUEST_INITDATA_START = 'REQUEST_INITDATA_START'
export const REQUEST_INITDATA_END = 'REQUEST_INITDATA_END'
export const REQUEST_CHECKWS_START = 'REQUEST_CHECKWS_START'
export const REQUEST_CHECKWS_END = 'REQUEST_CHECKWS_END'
export const REQUEST_CHECKUSER_START = 'REQUEST_CHECKUSER_START'
export const REQUEST_CHECKUSER_END = 'REQUEST_CHECKUSER_END'

export const SWITCH_FORM = 'SWITCH_FORM'

export const SET_WS_DATA = 'SET_WS_DATA'
export const RESET_USER_DATA = 'RESET_USER_DATA'
export const ADD_USER_DATA = 'ADD_USER_DATA'
export const ADD_NEW_USER_DATA = 'ADD_NEW_USER_DATA'
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA'
export const UPDATE_USER_ROLE_DATA = 'UPDATE_USER_ROLE_DATA'
export const UPDATE_USER_EMAILNOTIF_DATA = 'UPDATE_USER_EMAILNOTIF_DATA'

export function initWorkspace (wsList) {
  return { type: INIT_WORKSPACE, wsList }
}
export function addWorkspace (name) {
  return { type: ADD_WORKSPACE, name }
}
export function updateWorkspace (id, name) {
  return { type: UPDATE_WORKSPACE, id, name }
}
export function removeWorkspace (id) {
  return { type: REMOVE_WORKSPACE, id }
}

export function initUser (userList) {
  return { type: INIT_USER, userList }
}
export function addUser (id, name, email, canCreateWs, isAdmin, sendEmailNotif) {
  return { type: ADD_USER, id, name, email, canCreateWs, isAdmin, sendEmailNotif }
}
export function updateUser (id, name, email, canCreateWs, isAdmin, sendEmailNotif) {
  return { type: ADD_USER, id, name, email, canCreateWs, isAdmin, sendEmailNotif }
}
export function removeUser (id) {
  return { type: REMOVE_USER, id }
}

export function initRole (userRole) {
  return { type: INIT_ROLE, userRole }
}

export function requestAsyncInitStart () {
  return { type: REQUEST_INITDATA_START }
}
export function fetchConfig (urlJsonCfg) {
  return function (dispatch) { // returning a function in an action creator is allowed by the middleware redux-thunk to handle asynchronous actions
    dispatch(requestAsyncInitStart()) // set isFetching to true to display a loader
    return fetch(urlJsonCfg, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(json =>
      Promise.all([ // thoses dispatch will update every parts of the store according to the config got by ajax
        dispatch(initWorkspace(json.workspace)),
        json.selectedWs.id !== null && dispatch(setWorkspaceData(json.selectedWs.id, json.selectedWs.name, json.user, json.role)),
        // if (json.selectedWs.id !== null) && dispatch(assignAllUsersFromWorkspaceData(json.selectedWs.id, json.user, json.role)),
        dispatch(initUser(json.user)),
        dispatch(initRole(json.role))
      ])
    )
    .then(() => dispatch(requestAsyncInitEnd())) // set isFetching to false to hide the loader
    .catch((e) => console.log('Error fetching config', e))
  }
}
export function requestAsyncInitEnd () {
  return { type: REQUEST_INITDATA_END }
}

export function switchForm (formId) {
  return { type: SWITCH_FORM, formId }
}

export function setWorkspaceData (id, name, userList, roleList) {
  return { type: SET_WS_DATA, id, name, userList, roleList }
}
export function resetUserData () {
  return { type: RESET_USER_DATA }
}
export function addUserData (id, name) {
  return { type: ADD_USER_DATA, id, name }
}
export function addNewUserData (name, email, pw, canCreateWs, isAdmin, sendEmailNotif) {
  return { type: ADD_NEW_USER_DATA, name, email, pw, canCreateWs, isAdmin, sendEmailNotif }
}
export function removeUserData (id) {
  return { type: REMOVE_USER_DATA, id }
}
export function updateUserRoleData (userId, roleId) {
  return { type: UPDATE_USER_ROLE_DATA, userId, roleId }
}
export function updateUserSubscribeNotifData (userId, checked) {
  return { type: UPDATE_USER_EMAILNOTIF_DATA, userId, checked }
}

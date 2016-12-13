export const INIT_WORKSPACE = 'INIT_WORKSPACE'
export const ADD_WORKSPACE = 'ADD_WORKSPACE'
export const UPDATE_WORKSPACE = 'UPDATE_WORKSPACE'
export const REMOVE_WORKSPACE = 'REMOVE_WORKSPACE'

export const INIT_USER = 'INIT_USER'
export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const REMOVE_USER = 'REMOVE_USER'

export const REQUEST_ASYNC_START = 'REQUEST_ASYNC_START'
export const REQUEST_ASYNC_END = 'REQUEST_ASYNC_END'

export const SWITCH_FORM = 'SWITCH_FORM'

export const SET_WS_DATA = 'SET_WS_DATA'
export const ADD_USER_DATA = 'ADD_USER_DATA'
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA'
export const UPDATE_USER_ROLE_DATA = 'UPDATE_USER_ROLE_DATA'
export const UPDATE_USER_EMAILNOTIF_DATA = 'UPDATE_USER_EMAILNOTIF_DATA'

export const ROLE_LIST = {
  READER: {
    id: 0,
    label: 'Lecteur'
  },
  CONTRIBUTOR: {
    id: 1,
    label: 'Contributeur'
  },
  CONTENT_MANAGER: {
    id: 2,
    label: 'Gestionnaire de contenu'
  },
  IN_CHARGE: {
    id: 3,
    label: 'Responsable'
  },
  ALLOW_MAIL_NOTIF: {
    id: 4,
    label: 'Notification par email'
  }
}

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
export function addUser (id, name, email, canCreateWs, isAdmin, canSendEmail) {
  return { type: ADD_USER, id, name, email, canCreateWs, isAdmin, canSendEmail }
}
export function updateUser (id, name, email, canCreateWs, isAdmin, canSendEmail) {
  return { type: ADD_USER, id, name, email, canCreateWs, isAdmin, canSendEmail }
}
export function removeUser (id) {
  return { type: REMOVE_USER, id }
}

export function requestAsyncStart () {
  return { type: REQUEST_ASYNC_START }
}
export function fetchConfig (urlJsonCfg) {
  return function (dispatch) { // returning a function in an action creator is allowed by the middleware redux-thunk to handle asynchronous actions
    dispatch(requestAsyncStart()) // set isFetching to true to display a loader
    return fetch(urlJsonCfg, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(json =>
      Promise.all([ // thoses dispatch will update every parts of the store according to the config got by ajax
        dispatch(initWorkspace(json.workspace)),
        dispatch(initUser(json.user))
      ])
    )
    .then(() => dispatch(requestAsyncEnd())) // set isFetching to false to hide the loader
    .catch((e) => console.log('Error fetching config', e))
  }
}
export function requestAsyncEnd () {
  return { type: REQUEST_ASYNC_END }
}

export function switchForm (formId) {
  return { type: SWITCH_FORM, formId }
}

export function setWorkspaceData (id, name) {
  return { type: SET_WS_DATA, id, name }
}
export function addUserData (id, name) {
  return { type: ADD_USER_DATA, id, name }
}
export function removeUserData (id) {
  return { type: REMOVE_USER_DATA, id }
}
export function updateUserRoleData (userId, roleId) {
  return { type: UPDATE_USER_ROLE_DATA, userId, roleId }
}
export function updateUserEmailnotifData (userId, checked) {
  return { type: UPDATE_USER_EMAILNOTIF_DATA, userId, checked }
}

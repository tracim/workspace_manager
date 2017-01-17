export const INIT_WORKSPACE = 'INIT_WORKSPACE'

export const INIT_USER = 'INIT_USER'

export const INIT_ROLE = 'INIT_ROLE'

export const SET_TRACIM_CONFIG = 'SET_TRACIM_CONFIG'

export const INIT_TIMEZONE = 'INIT_TIMEZONE'

export const REQUEST_INITDATA_START = 'REQUEST_INITDATA_START'
export const REQUEST_INITDATA_END = 'REQUEST_INITDATA_END'

export const SWITCH_FORM = 'SWITCH_FORM'

export const SET_WS_DATA = 'SET_WS_DATA'
export const SET_WS_DESCRIPTION = 'SET_WS_DESCRIPTION'
export const RESET_USER_DATA = 'RESET_USER_DATA'
export const ADD_USER_DATA = 'ADD_USER_DATA'
export const ADD_NEW_USER_DATA = 'ADD_NEW_USER_DATA'
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA'
export const UPDATE_USER_ROLE_DATA = 'UPDATE_USER_ROLE_DATA'
export const UPDATE_USER_EMAILNOTIF_DATA = 'UPDATE_USER_EMAILNOTIF_DATA'

export function initWorkspace (wsList) {
  return { type: INIT_WORKSPACE, wsList }
}

export function initUser (userList) {
  return { type: INIT_USER, userList }
}

export function initRole (userRole) {
  return { type: INIT_ROLE, userRole }
}

export function setTracimConfig (tracimConfig) {
  return { type: SET_TRACIM_CONFIG, tracimConfig }
}

export function initTimezone (timezoneList) {
  return { type: INIT_TIMEZONE, timezoneList }
}

export function requestAsyncInitStart () {
  return { type: REQUEST_INITDATA_START }
}
export function fetchConfig (apiPath) {
  return function (dispatch) { // returning a function in an action creator is allowed by the middleware redux-thunk to handle asynchronous actions
    dispatch(requestAsyncInitStart()) // set isFetching to true to display a loader
    const fetchCfg = {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    }
    return Promise.all(
      // [
      //   fetch(apiPath + '/tracim_config', fetchCfg)
      //   .then(response => response.json()).then(json => dispatch(setTracimConfig(json.value_list)))
      //   .catch((e) => console.log('Error fetching tracim_config', e)),

      //   fetch(apiPath + '/workspaces', fetchCfg)
      //   .then(response => response.json()).then(json => dispatch(initWorkspace(json.value_list)))
      //   .catch((e) => console.log('Error fetching workspaces', e)),

      //   fetch(apiPath + '/users', fetchCfg)
      //   .then(response => response.json()).then(json => dispatch(initUser(json.value_list)))
      //   .catch((e) => console.log('Error fetching users', e)),

      //   fetch(apiPath + '/users_workspaces', fetchCfg)
      //   .then(response => response.json()).then(json => dispatch(initRole(json.value_list)))
      //   .catch((e) => console.log('Error fetching users_workspaces', e)),

      //   fetch(apiPath + '/timezone', fetchCfg)
      //   .then(response => response.json()).then(json => dispatch(initTimezone(json.value_list)))
      //   .catch((e) => console.log('Error fetching timezone', e))
      // ]

      [{
        endpoint: 'tracim_config',
        callback: setTracimConfig
      }, {
        endpoint: 'workspaces',
        callback: initWorkspace
      }, {
        endpoint: 'users',
        callback: initUser
      }, {
        endpoint: 'users_workspaces',
        callback: initRole
      }, {
        endpoint: 'timezone',
        callback: initTimezone
      }]
      .map((oneFetch) => // this map() will return an array of promises
        fetch(apiPath + oneFetch.endpoint, fetchCfg)
          .then(response => response.json()).then(json => dispatch(oneFetch.callback(json.value_list)))
          .catch((e) => console.log('Error fetchting ' + oneFetch.endpoint, e))
      )

    ).then((allData) =>
      dispatch(setWorkspaceData(allData[0].tracimConfig.selectedWs.id, allData[0].tracimConfig.selectedWs.name, allData[2].userList, allData[3].userRole))
    )
    .then(() => dispatch(requestAsyncInitEnd())) // set isFetching to false to hide the loader
    .catch((e) => console.log('Error fetching data', e))
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
export function setWorkspaceDescription (description) {
  return { type: SET_WS_DESCRIPTION, description }
}
export function resetUserData () {
  return { type: RESET_USER_DATA }
}
export function addUserData (id, name) {
  return { type: ADD_USER_DATA, id, name }
}
export function addNewUserData (name, email, pw, timezone, canCreateWs, isAdmin, config) {
  return { type: ADD_NEW_USER_DATA, name, email, pw, timezone, canCreateWs, isAdmin, config }
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

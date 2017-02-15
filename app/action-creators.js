import { GLOBAL_API_PATH } from './lib/helper.js'

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

export const initWorkspace = wsList => ({ type: INIT_WORKSPACE, wsList })

export const initUser = userList => ({ type: INIT_USER, userList })

export const initRole = userRole => ({ type: INIT_ROLE, userRole })

export const setTracimConfig = tracimConfig => ({ type: SET_TRACIM_CONFIG, tracimConfig })

export const initTimezone = timezoneList => ({ type: INIT_TIMEZONE, timezoneList })

export const requestAsyncInitStart = () => ({ type: REQUEST_INITDATA_START })

// returning a function in an action creator is allowed by the middleware redux-thunk to handle asynchronous actions
export const fetchConfig = () => dispatch => {
  dispatch(requestAsyncInitStart()) // set isFetching to true to display a loader

  const fetchCfg = {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  }

  return Promise.all([
    fetch(GLOBAL_API_PATH + '/users/me', fetchCfg)
    .then(response => response.json()).then(json => dispatch(setTracimConfig(json)))
    .catch(e => console.log('Error fetching tracim_config', e)),

    fetch(GLOBAL_API_PATH + '/workspaces', fetchCfg)
    .then(response => response.json()).then(json => dispatch(initWorkspace(json.value_list)))
    .catch(e => console.log('Error fetching workspaces', e))
  ])
  // .then(() => window.setTimeout(() => dispatch(requestAsyncInitEnd()), 20000)) // delay the callback for testing purpose
  .then(() => dispatch(requestAsyncInitEnd())) // set isFetching to false to hide the loader
  .catch(e => console.log('Error fetching data', e))
}

export const requestAsyncInitEnd = () => ({ type: REQUEST_INITDATA_END })

export const switchForm = formId => ({ type: SWITCH_FORM, formId })

export const setWorkspaceData = (id, label, roleList) => ({ type: SET_WS_DATA, id, label, roleList })
export const setWorkspaceDescription = description => ({ type: SET_WS_DESCRIPTION, description })
export const resetUserData = () => ({ type: RESET_USER_DATA })
export const addUserData = (id, name) => ({ type: ADD_USER_DATA, id, name })
export const addNewUserData = (name, email, pw, timezone, canCreateWs, isAdmin, config) => ({
  type: ADD_NEW_USER_DATA, name, email, pw, timezone, canCreateWs, isAdmin, config
})
export const removeUserData = (id, isNew) => ({ type: REMOVE_USER_DATA, id, isNew })
export const updateUserRoleData = (userId, roleId) => ({ type: UPDATE_USER_ROLE_DATA, userId, roleId })
export const updateUserSubscribeNotifData = (userId, checked) => ({ type: UPDATE_USER_EMAILNOTIF_DATA, userId, checked })

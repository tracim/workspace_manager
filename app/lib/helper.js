import { store } from '../store.js'

export const ROLE_LIST = {
  NOT_APPLICABLE: {
    id: 0,
    label: ''
  },
  READER: {
    id: 'reader',
    label: 'reader'
  },
  CONTRIBUTOR: {
    id: 'contributor',
    label: 'contributor'
  },
  CONTENT_MANAGER: {
    id: 'content_manager',
    label: 'content manager'
  },
  WORKSPACE_MANAGER: {
    id: 'workspace_manager',
    label: 'workspace manager'
  },
  SUBSCRIBE_USER_NOTIF: {
    id: 16,
    label: 'subscribe user to notifications'
  }
}
export function displayRole (roleID) {
  const { READER, CONTRIBUTOR, CONTENT_MANAGER, WORKSPACE_MANAGER, SUBSCRIBE_USER_NOTIF } = ROLE_LIST
  switch (roleID) {
    case READER.id: return READER.label
    case CONTRIBUTOR.id: return CONTRIBUTOR.label
    case CONTENT_MANAGER.id: return CONTENT_MANAGER.label
    case WORKSPACE_MANAGER.id: return WORKSPACE_MANAGER.label
    case SUBSCRIBE_USER_NOTIF.id: return SUBSCRIBE_USER_NOTIF.label
  }
}

export const ROLE_LOCAL_STATUS = {
  NO_UPDATE: 'no_update',
  UPDATED: 'updated',
  CREATED: 'created',
  REMOVED: 'removed_from_workspace'
}

export const WORKSPACE_RESERVED_ID = {
  NO_WORKSPACE_SELECTED: -1,
  NEW_WORKSPACE: -2
}

export function generateNewUserId () {
  return (store.getState().apiData.user.reduce((acc, curUser) => curUser.id >= acc.id ? curUser : acc, {id: 0}).id) + 1
}

export const ASYNC_STATUS = {
  INIT: 0,
  IN_PROGRESS: 1,
  OK: 2,
  ERROR: 3
}

export let GLOBAL_API_PATH
export function setGlobalApiPath (newApiPath) {
  GLOBAL_API_PATH = newApiPath
}

export function createWorkspace (name, description) {
  return fetch(GLOBAL_API_PATH + 'workspaces', {
    method: 'POST',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({name, description})
  })
}

export function createUser ({name, email, timezone, rights, subscribeNotif}) {
  return fetch(GLOBAL_API_PATH + 'users', {
    method: 'POST',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({name, email, timezone, rights, _params: {send_email_notif: subscribeNotif}})
  })
}

export function addRole (workspaceId, userId, role, subscribeNotif) {
  return fetch(GLOBAL_API_PATH + 'workspaces/' + workspaceId + '/users/' + userId + '/role', {
    method: 'POST',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({role, subscribed_to_notif: subscribeNotif})
  })
}

export function updateRole (workspaceId, userId, role, subscribeNotif) {
  // return new Promise((resolve, reject) => { // for debugg purpose, to delay the result of the async call, dont forget to remove the return before fetch
  //   window.setTimeout(() => resolve(
  // => fetch goes here <=
  //   ), Math.random() * 100000)
  // })
  return fetch(GLOBAL_API_PATH + 'workspaces/' + workspaceId + '/users/' + userId + '/role', {
    method: 'PUT',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({role, subscribed_to_notif: subscribeNotif})
  })
}

export function removeRole (workspaceId, userId) {
  return fetch(GLOBAL_API_PATH + 'workspaces/' + workspaceId + '/users/' + userId + '/role', {
    method: 'DELETE',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
  })
}

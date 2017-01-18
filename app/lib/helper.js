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
  switch (roleID) {
    case ROLE_LIST.READER.id: return ROLE_LIST.READER.label
    case ROLE_LIST.CONTRIBUTOR.id: return ROLE_LIST.CONTRIBUTOR.label
    case ROLE_LIST.CONTENT_MANAGER.id: return ROLE_LIST.CONTENT_MANAGER.label
    case ROLE_LIST.WORKSPACE_MANAGER.id: return ROLE_LIST.WORKSPACE_MANAGER.label
    case ROLE_LIST.SUBSCRIBE_USER_NOTIF.id: return ROLE_LIST.SUBSCRIBE_USER_NOTIF.label
  }
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

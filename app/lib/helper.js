import { store } from '../store.js'

export const ROLE_LIST = {
  NOT_APPLICABLE: {
    id: 0,
    label: ''
  },
  READER: {
    id: 1,
    label: 'Lecteur'
  },
  CONTRIBUTOR: {
    id: 2,
    label: 'Contributeur'
  },
  CONTENT_MANAGER: {
    id: 4,
    label: 'Gestionnaire de contenu'
  },
  WORKSPACE_MANAGER: {
    id: 8,
    label: 'Responsable'
  },
  SUBSCRIBE_USER_NOTIF: {
    id: 16,
    label: "Abonner l'utilisateur aux notifications"
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

export const WS_RESERVED_ID = {
  NO_WS_SELECTED: -1,
  NEW_WS: -2
}

export function generateNewUserId () {
  const maxIdUserFromApi = store.getState().user.reduce((acc, curUser) => curUser.id >= acc.id ? curUser : acc, {id: 0})
  const maxIdUserFromNewUsers = store.getState().apiData.user.reduce((acc, curUser) => curUser.id >= acc.id ? curUser : acc, {id: 0})

  // this ensure the unicity of the ids for the store. The ids generated by this function wont be send to the API.
  return Math.max(maxIdUserFromApi.id, maxIdUserFromNewUsers.id) + 1
}

export const ASYNC_STATUS = {
  INIT: 0,
  IN_PROGRESS: 1,
  OK: 2,
  ERROR: 3
}

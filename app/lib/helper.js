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

export const WS_RESERVED_ID = {
  NO_WS_SELECTED: -1,
  NEW_WS: -2
}

export const USER_RESERVED_ID = {
  NEW_USER: -2
}

export const ASYNC_STATUS = {
  INIT: 0,
  IN_PROGRESS: 1,
  OK: 2,
  ERROR: 3
}

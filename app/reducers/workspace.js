import { INIT_WORKSPACE, CREATE_WORKSPACE } from '../action-creators.js'
import { WORKSPACE_RESERVED_ID } from '../lib/helper.js'

export default function workspace (state = [], action) {
  switch (action.type) {
    case INIT_WORKSPACE:
      return action.wsList

    case CREATE_WORKSPACE:
      return {
        id: WORKSPACE_RESERVED_ID.NEW_WORKSPACE,
        label: action.name
      }

    default:
      return state
  }
}

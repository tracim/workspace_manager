import { CHANGE_LANG } from '../action-creators.js'

export default function lang (state = 'fr', action) {
  switch (action.type) {
    case CHANGE_LANG:
      return action.lang

    default:
      return state
  }
}

import { SWITCH_FORM } from '../action-creators.js'

export default function activeForm (state = 0, action) {
  switch (action.type) {
    case SWITCH_FORM:
      if (action.formId > 2) return 2
      else if (action.formId < 0) return 0
      else return action.formId

    default:
      return state
  }
}

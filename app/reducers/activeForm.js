import { SWITCH_FORM } from '../action-creators.js'

export default function activeForm (state = 0, action) {
  switch (action.type) {
    case SWITCH_FORM:
      let newFormId
      if (action.formId > 2) newFormId = 2
      else if (action.formId < 0) newFormId = 0
      else newFormId = action.formId
      return newFormId

    default:
      return state
  }
}

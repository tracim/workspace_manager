import { INIT_TIMEZONE } from '../action-creators.js'

export default function timezone (state = [], action) {
  switch (action.type) {
    case INIT_TIMEZONE:
      return action.timezoneList

    default:
      return state
  }
}

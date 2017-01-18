import { REQUEST_INITDATA_START, REQUEST_INITDATA_END } from '../action-creators.js'

export default function isFetching (state = false, action) {
  switch (action.type) {
    case REQUEST_INITDATA_START:
      return true

    case REQUEST_INITDATA_END:
      return false

    default:
      return state
  }
}

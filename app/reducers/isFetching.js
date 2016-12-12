import { REQUEST_ASYNC_START, REQUEST_ASYNC_END } from '../action-creators.js'

export default function isFetching (state = false, action) {
  switch (action.type) {
    case REQUEST_ASYNC_START:
      return true

    case REQUEST_ASYNC_END:
      // const now = new Date().getTime() // for testing purpose
      // while (new Date().getTime() < now + 2000) null
      return false

    default:
      return state
  }
}

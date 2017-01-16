import { REQUEST_INITDATA_START, REQUEST_INITDATA_END } from '../action-creators.js'

export default function isFetching (state = {
  initData: false
  // checkWs: false,
  // checkUser: false
}, action) {
  switch (action.type) {
    case REQUEST_INITDATA_START:
      return {...state, initData: true}

    case REQUEST_INITDATA_END:
      // const now = new Date().getTime() // for testing purpose
      // while (new Date().getTime() < now + 2000) null
      return {...state, initData: false}

    default:
      return state
  }
}

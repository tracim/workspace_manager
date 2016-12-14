import { REQUEST_INITDATA_START, REQUEST_INITDATA_END } from '../action-creators.js' // , REQUEST_CHECKWS_START, REQUEST_CHECKWS_END, REQUEST_CHECKUSER_START, REQUEST_CHECKUSER_END

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

    // case REQUEST_CHECKWS_START:
    //   return {...state, checkWs: true}

    // case REQUEST_CHECKWS_END:
    //   return {...state, checkWs: false}

    // case REQUEST_CHECKUSER_START:
    //   return {...state, checkUser: true}

    // case REQUEST_CHECKUSER_END:
    //   return {...state, checkUser: false}

    default:
      return state
  }
}

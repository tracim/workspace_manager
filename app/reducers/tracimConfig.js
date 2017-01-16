import { SET_TRACIM_CONFIG } from '../action-creators.js'

export default function tracimConfig (state = {
  lang: 'en',
  login: '',
  email: '',
  canCreateWs: false,
  canCreateUser: false
}, action) {
  switch (action.type) {
    case SET_TRACIM_CONFIG:
      return action.tracimConfig

    default:
      return state
  }
}

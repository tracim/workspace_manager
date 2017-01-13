import { combineReducers } from 'redux'
import lang from './lang.js'
import activeForm from './activeForm.js'
import workspace from './workspace.js'
import user from './user.js'
import role from './role.js'
import isFetching from './isFetching.js'
import apiData from './apiData.js'

const coreReducer = combineReducers({
  lang, activeForm, workspace, user, role, isFetching, apiData
})

export default coreReducer

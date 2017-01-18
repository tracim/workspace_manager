import { combineReducers } from 'redux'
import tracimConfig from './tracimConfig.js'
import activeForm from './activeForm.js'
import workspace from './workspace.js'
import isFetching from './isFetching.js'
import apiData from './apiData.js'
import timezone from './timezone.js'

const coreReducer = combineReducers({
  tracimConfig, activeForm, workspace, isFetching, apiData, timezone
})

export default coreReducer

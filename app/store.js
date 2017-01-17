import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import coreReducer from './reducers/core.js'
import { fetchConfig } from './action-creators.js'

const defaultStore = {
  workspace: [],
  users: [],
  isFetching: false
}

const apiPath = document.getElementById('workspace_manager').getAttribute('apiPath')

export const store = ((middleware, reduxDevTools) =>
  apiPath !== ''
    ? createStore(coreReducer, compose(middleware, reduxDevTools || (f => f)))
    : createStore(coreReducer, defaultStore, reduxDevTools)
)(
  applyMiddleware(thunkMiddleware, createLogger()),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

if (apiPath !== '') store.dispatch(fetchConfig(apiPath))

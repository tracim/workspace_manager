// generate the dynamic webpack publicPath at runtime (must be the first statement of the app)
// it generate the path by taking the path that call the app bundle and remove the app_name.js
// webpack output.publichPath must not be specified in webpack.config.js
const src = document.getElementById('workspace_manager_script').getAttribute('src')
__webpack_public_path__ = src.substr(0, src.lastIndexOf('/') + 1) // eslint-disable-line
// --- beginning of the app :

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css'
require('./css/style.styl')
require('./lib/font-awesome-4.7.0/css/font-awesome.css')

import Modal from './containers/Modal.jsx'

import { store } from './store.js'

ReactDOM.render(
  <Provider store={store}>
    <Modal />
  </Provider>
  , document.getElementById('workspace_manager')
)

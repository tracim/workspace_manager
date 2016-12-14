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
  , document.getElementById('content')
)

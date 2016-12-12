import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css'
require('./css/style.styl')
// require('./font/font-awesome-4.6.3/css/font-awesome.min.css')

import Modal from './containers/Modal.jsx'

import { store } from './store.js'

ReactDOM.render(
  <Provider store={store}>
    <Modal />
  </Provider>
  , document.getElementById('content')
)

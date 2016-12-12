import React from 'react'
import { connect } from 'react-redux'

import { switchForm } from '../action-creators.js'

import Wizard from './Wizard.jsx'

export class Modal extends React.Component {
  render () {
    const { activeForm, dispatch } = this.props

    return (
      <div className='modal' role='dialog'>
        <div className='modal-dialog modal-lg' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={null}>
                <span aria-hidden='true'>&times;</span>
              </button>
              <h4 className='modal-title'>Title</h4>
            </div>
            <div className='modal-body'>

              <Wizard />

            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal' onClick={() => dispatch(switchForm(activeForm - 1))}>
                dialogBtnCancel
              </button>
              <button type='button' className='dialog__btn__validate btn btn-primary' onClick={() => dispatch(switchForm(activeForm + 1))}>
                dialogBtnValidate
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ activeForm }) => ({ activeForm })

export default connect(mapStateToProps)(Modal)

import React from 'react'
import { connect } from 'react-redux'

import Wizard from './Wizard.jsx'

export class Modal extends React.Component {
  render () {
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
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(Modal)

import React from 'react'
import { ASYNC_STATUS } from '../lib/helper.js'
import __ from '../trad.js'

export function SubmitToApiBtn ({ status, handleSaveChanges }) {
  const btnDesign = (status => {
    switch (status) {
      case ASYNC_STATUS.INIT:
        return { icon: 'fa-gear', msg: __('validate') }
      case ASYNC_STATUS.IN_PROGRESS:
        return { icon: 'fa-hourglass', msg: __('in progress') }
      case ASYNC_STATUS.OK:
        return { icon: 'fa-check', msg: __('close the window') }
    }
  })(status)

  return (
    <button className='recap__nextbtn__btn btn btn-default' onClick={handleSaveChanges}>
      <i className={'fa ' + btnDesign.icon} />
      { btnDesign.msg }
    </button>
  )
}

SubmitToApiBtn.propTypes = {
  status: React.PropTypes.number.isRequired,
  handleSaveChanges: React.PropTypes.func.isRequired
}

export default SubmitToApiBtn

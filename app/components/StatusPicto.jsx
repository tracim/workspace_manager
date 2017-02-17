import React from 'react'
import { ASYNC_STATUS } from '../lib/helper.js'

export function StatusPicto ({ status }) { // this is not a reducer
  const { INIT, IN_PROGRESS, OK, ERROR } = ASYNC_STATUS

  switch (status) {
    case INIT:
      return null

    case IN_PROGRESS:
      return <i className='fa fa-spinner fa-spin fa-lg' />

    case OK:
      return <i className='fa fa-check fa-lg' style={{color: 'green'}} />

    case ERROR:
      return <i className='fa fa-close fa-lg' style={{color: 'red'}} />

    default:
      return null
  }
}

StatusPicto.propTypes = {
  status: React.PropTypes.number.isRequired
}

export default StatusPicto

import React from 'react'
import { ASYNC_STATUS } from '../lib/helper.js'

export function StatusPicto ({ status }) {
  switch (status) {
    case ASYNC_STATUS.INIT:
      return null

    case ASYNC_STATUS.IN_PROGRESS:
      return <i className='fa fa-spinner fa-spin fa-lg' />

    case ASYNC_STATUS.OK:
      return <i className='fa fa-check fa-lg' style={{color: 'green'}} />

    case ASYNC_STATUS.ERROR:
      return <i className='fa fa-close fa-lg' style={{color: 'red'}} />

    default:
      return null
  }
}

StatusPicto.propTypes = {
  status: React.PropTypes.number.isRequired
}

export default StatusPicto

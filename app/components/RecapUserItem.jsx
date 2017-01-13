import React from 'react'
import StatusPicto from './StatusPicto.jsx'
import __ from '../trad.js'

export function RecapUserItem ({ type, name, role, status }) {
  return (
    <div className='recap__data__item'>
      <div className='recap__data__item__action'>[{ type }]</div>
      <div className='recap__data__item__name'>{ name } {__('as')} { role }</div>
      <div className='recap__data__item__status'>
        <StatusPicto status={status} />
      </div>
    </div>
  )
}

RecapUserItem.propTypes = {
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  role: React.PropTypes.string.isRequired,
  status: React.PropTypes.number.isRequired
}

export default RecapUserItem

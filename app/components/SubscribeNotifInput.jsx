import React from 'react'
import __ from '../trad.js'

export function SubscribeNotifInput ({ userId, isChecked, onClickSubscribeNotif }) {
  return (
    <div>
      <label htmlFor={'customCheckbox_' + userId} className='roleForm__list__notif__label'>
        { isChecked
          ? <span className='roleForm__list__notif__label__subscribed'>
            <i className='fa fa-envelope-o fa-fw' />{__('subscriber')}
          </span>
          : <span className='roleForm__list__notif__label__not-subscribed'>
            <i className='fa fa-ban fa-fw' />{__('not subscriber')}
          </span>
        }
      </label>
      <input
        type='checkbox'
        className='roleForm__list__notif__checkbox'
        id={'customCheckbox_' + userId}
        onClick={e => onClickSubscribeNotif(e, userId)}
        defaultChecked={isChecked}
      />
    </div>
  )
}

SubscribeNotifInput.propTypes = {
  userId: React.PropTypes.number.isRequired,
  isChecked: React.PropTypes.bool.isRequired,
  onClickSubscribeNotif: React.PropTypes.func.isRequired
}

export default SubscribeNotifInput

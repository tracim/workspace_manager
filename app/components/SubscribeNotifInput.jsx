import React from 'react'

export function SubscribeNotifInput ({ userId, isChecked, onClickSubscribeNotif }) {
  const isCheckedClassName = isChecked ? 'checked' : ''
  return (
    <label htmlFor={'customCheckbox_' + userId} className={'customCheckbox ' + isCheckedClassName}>
      <input type='checkbox' id={'customCheckbox_' + userId} onClick={(e) => onClickSubscribeNotif(e, userId)} defaultChecked={isChecked} />
    </label>
  )
}

SubscribeNotifInput.propTypes = {
  userId: React.PropTypes.number.isRequired,
  isChecked: React.PropTypes.bool.isRequired,
  onClickSubscribeNotif: React.PropTypes.func.isRequired
}

export default SubscribeNotifInput

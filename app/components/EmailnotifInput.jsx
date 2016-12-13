import React from 'react'

export function EmailnotifInput ({ userId, isChecked, onClickEmailnotif }) {
  const isCheckedClassName = isChecked ? 'checked' : ''
  return (
    <label htmlFor={'customCheckbox_' + userId} className={'customCheckbox ' + isCheckedClassName}>
      <input type='checkbox' id={'customCheckbox_' + userId} onClick={(e) => onClickEmailnotif(e, userId)} defaultChecked={isChecked} />
    </label>
  )
}

EmailnotifInput.propTypes = {
  userId: React.PropTypes.number.isRequired,
  isChecked: React.PropTypes.bool.isRequired,
  onClickEmailnotif: React.PropTypes.func.isRequired
}

export default EmailnotifInput

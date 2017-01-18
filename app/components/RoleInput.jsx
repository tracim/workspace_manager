import React from 'react'

export function RoleInput ({ roleId, userId, isChecked, onClickRole }) {
  const isCheckedClassName = isChecked ? 'checked' : ''
  const inputId = 'customRadio_' + roleId + '_' + userId
  return (
    <label htmlFor={inputId} className={'customRadio ' + isCheckedClassName}>
      <input type='radio' id={inputId} onClick={() => onClickRole(userId, roleId)} defaultChecked={isChecked} />
    </label>
  )
}

RoleInput.propTypes = {
  roleId: React.PropTypes.string.isRequired,
  userId: React.PropTypes.number.isRequired,
  isChecked: React.PropTypes.bool.isRequired,
  onClickRole: React.PropTypes.func.isRequired
}

export default RoleInput

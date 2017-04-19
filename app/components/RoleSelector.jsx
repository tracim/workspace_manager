import React from 'react'
import { ROLE_LIST, displayRole, displayPictoForRole } from '../lib/helper.js'
import __ from '../trad.js'

export function RoleSelector ({ userId, selectedRoleId, onClickRole, showList = false }) {
  const { READER, CONTRIBUTOR, CONTENT_MANAGER, WORKSPACE_MANAGER } = ROLE_LIST

  return (
    <div className='roleForm__list__role__selector'>
      <div className='roleForm__list__role__selector__current'>
        <i className={'fa fa-fw ' + displayPictoForRole(selectedRoleId)} /> { __(displayRole(selectedRoleId)) }
        <ul className={'roleForm__list__role__selector__list' + (showList ? ' visible' : '')}>
          <li className='reader' onClick={() => onClickRole(userId, READER.id)}>
            <i className='fa fa-fw fa-eye' />{__(displayRole(READER.id))}
          </li>
          <li className='contributor' onClick={() => onClickRole(userId, CONTRIBUTOR.id)}>
            <i className='fa fa-fw fa-pencil' />{__(displayRole(CONTRIBUTOR.id))}
          </li>
          <li className='content_manager' onClick={() => onClickRole(userId, CONTENT_MANAGER.id)}>
            <i className='fa fa-fw fa-graduation-cap' />{__(displayRole(CONTENT_MANAGER.id))}
          </li>
          <li className='workspace_manager' onClick={() => onClickRole(userId, WORKSPACE_MANAGER.id)}>
            <i className='fa fa-fw fa-legal' />{__(displayRole(WORKSPACE_MANAGER.id))}
          </li>
        </ul>
      </div>
    </div>
  )
}

RoleSelector.propTypes = {
  userId: React.PropTypes.number.isRequired,
  selectedRoleId: React.PropTypes.string.isRequired,
  onClickRole: React.PropTypes.func.isRequired,
  showList: React.PropTypes.bool
}

export default RoleSelector

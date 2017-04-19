import React from 'react'
import { connect } from 'react-redux'
import RoleSelector from '../components/RoleSelector.jsx'
import SubscribeNotifInput from '../components/SubscribeNotifInput.jsx'
import { removeUserData, updateUserRoleData, updateUserSubscribeNotifData, toggleShowRoleList } from '../action-creators.js'
import { ROLE_LOCAL_STATUS } from '../lib/helper.js'
import __ from '../trad.js'

export class RoleForm extends React.Component {
  handleChangeRole = (userId, roleId) => {
    this.props.dispatch(updateUserRoleData(userId, roleId))
  }

  handleChangeSubscribeNotif = (e, userId) => {
    this.props.dispatch(updateUserSubscribeNotifData(userId, e.target.checked))
  }

  shouldDisplayRoleForm = () => this.props.apiData.user.length > 0 ? this.props.visible : false

  render () {
    return (
      <div className='roleForm' style={{display: this.shouldDisplayRoleForm() ? 'block' : 'none'}}>
        <table className='roleForm__list'>
          <tbody>
            <tr>
              <th>#</th>
              <th>Utilisateur</th>
              <th>Rôle</th>
              <th>Notifications</th>
              <th />
            </tr>
            { this.props.apiData.user.map((oneUser, i) => oneUser.localStatus !== ROLE_LOCAL_STATUS.REMOVED &&
              <tr key={'userRoleKey_' + oneUser.userId + '_' + i}>
                <td className='roleForm__list__id'>
                  { oneUser.id }
                </td>
                <td className='roleForm__list__name'>
                  { oneUser.name }
                </td>
                <td className={'roleForm__list__role ' + oneUser.role} onClick={() => this.props.dispatch(toggleShowRoleList(oneUser.id))}>
                  <RoleSelector
                    userId={oneUser.id}
                    selectedRoleId={oneUser.role}
                    showList={oneUser.showRoleList}
                    onClickRole={this.handleChangeRole}
                  />
                </td>
                <td className='roleForm__list__notif'>
                  <SubscribeNotifInput userId={oneUser.id} isChecked={oneUser.subscribeNotif} onClickSubscribeNotif={this.handleChangeSubscribeNotif} />
                </td>
                <td className='roleForm__list__delete'>
                  <button
                    className='btn btn-default btn-xs'
                    onClick={() => this.props.dispatch(removeUserData(oneUser.id, oneUser.isNew))}
                    title={__('remove user from workspace')}
                  >
                    <i className='fa fa-remove fa-fw' />
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ apiData }) => ({ apiData })
export default connect(mapStateToProps)(RoleForm)

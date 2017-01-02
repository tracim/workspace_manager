import React from 'react'
import { connect } from 'react-redux'
import RoleInput from '../components/RoleInput.jsx'
import SubscribeNotifInput from '../components/SubscribeNotifInput.jsx'
import { removeUserData, updateUserRoleData, updateUserSubscribeNotifData } from '../action-creators.js'
import { ROLE_LIST } from '../lib/helper.js'

export class RoleForm extends React.Component {
  handleChangeRole = (userId, roleId) => {
    this.props.dispatch(updateUserRoleData(userId, roleId))
  }

  handleChangeSubscribeNotif = (e, userId) => {
    this.props.dispatch(updateUserSubscribeNotifData(userId, e.target.checked))
  }

  shouldDisplayRoleForm = () => {
    this.props.apiData.user.length > 0 ? this.props.visible : false
  }

  render () {
    const shouldDisplayRoleForm = this.props.apiData.user.length > 0 ? this.props.visible : false
    return (
      <div className='roleForm' style={{display: shouldDisplayRoleForm ? 'block' : 'none'}}>
        <table className='roleForm__tab'>
          <tbody>
            <tr>
              <th />
              <th>{ ROLE_LIST.READER.label }</th>
              <th>{ ROLE_LIST.CONTRIBUTOR.label }</th>
              <th>{ ROLE_LIST.CONTENT_MANAGER.label }</th>
              <th>{ ROLE_LIST.WORKSPACE_MANAGER.label }</th>
              <th>{ ROLE_LIST.SUBSCRIBE_USER_NOTIF.label }</th>
            </tr>
            { this.props.apiData.user.map((oneUser, i) =>
              <tr key={'userRoleKey_' + oneUser.userId + '_' + i}>
                <td>
                  <div className='roleForm__tab__removeuser__wrapper'>
                    <div className='roleForm__tab__removeuser' onClick={() => this.props.dispatch(removeUserData(oneUser.userId))}>x</div>
                  </div>
                  { oneUser.name }
                </td>
                <td>
                  <RoleInput roleId={ROLE_LIST.READER.id} userId={oneUser.id} isChecked={oneUser.role === ROLE_LIST.READER.id} onClickRole={this.handleChangeRole} />
                </td>
                <td>
                  <RoleInput roleId={ROLE_LIST.CONTRIBUTOR.id} userId={oneUser.id} isChecked={oneUser.role === ROLE_LIST.CONTRIBUTOR.id} onClickRole={this.handleChangeRole} />
                </td>
                <td>
                  <RoleInput roleId={ROLE_LIST.CONTENT_MANAGER.id} userId={oneUser.id} isChecked={oneUser.role === ROLE_LIST.CONTENT_MANAGER.id} onClickRole={this.handleChangeRole} />
                </td>
                <td>
                  <RoleInput roleId={ROLE_LIST.WORKSPACE_MANAGER.id} userId={oneUser.id} isChecked={oneUser.role === ROLE_LIST.WORKSPACE_MANAGER.id} onClickRole={this.handleChangeRole} />
                </td>
                <td>
                  <SubscribeNotifInput userId={oneUser.id} isChecked={oneUser.subscribeNotif} onClickSubscribeNotif={this.handleChangeSubscribeNotif} />
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

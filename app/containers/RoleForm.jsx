import React from 'react'
import { connect } from 'react-redux'
import RoleInput from '../components/RoleInput.jsx'
import SubscribeNotifInput from '../components/SubscribeNotifInput.jsx'
import { removeUserData, updateUserRoleData, updateUserSubscribeNotifData } from '../action-creators.js'
import { ROLE_LIST, USER_LOCAL_STATUS } from '../lib/helper.js'
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
        <table className='roleForm__tab'>
          <tbody>
            <tr>
              <th />
              <th>{ __(ROLE_LIST.READER.label) }</th>
              <th>{ __(ROLE_LIST.CONTRIBUTOR.label) }</th>
              <th>{ __(ROLE_LIST.CONTENT_MANAGER.label) }</th>
              <th>{ __(ROLE_LIST.WORKSPACE_MANAGER.label) }</th>
              <th>{ __(ROLE_LIST.SUBSCRIBE_USER_NOTIF.label) }</th>
            </tr>
            { this.props.apiData.user.map((oneUser, i) => oneUser.localStatus !== USER_LOCAL_STATUS.REMOVED &&
              <tr key={'userRoleKey_' + oneUser.userId + '_' + i}>
                <td>
                  <div className='roleForm__tab__removeuser__wrapper'>
                    <div className='roleForm__tab__removeuser' onClick={() => this.props.dispatch(removeUserData(oneUser.id, oneUser.isNew))}>x</div>
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

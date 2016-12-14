import React from 'react'
import { connect } from 'react-redux'
import RoleInput from '../components/RoleInput.jsx'
import EmailnotifInput from '../components/EmailnotifInput.jsx'
import { switchForm, updateUserRoleData, updateUserEmailnotifData } from '../action-creators.js'
import { ROLE_LIST } from '../lib/helper.js'

export class RoleForm extends React.Component {
  handleChangeRole = (userId, roleId) => {
    this.props.dispatch(updateUserRoleData(userId, roleId))
  }

  handleChangeNotifmail = (e, userId) => {
    this.props.dispatch(updateUserEmailnotifData(userId, e.target.checked))
  }

  render () {
    return (
      <div className='roleForm'>
        <button className='roleForm__backbtn btn' onClick={() => this.props.dispatch(switchForm(1))}>Retour</button>

        <table className='roleForm__tab'>
          <tbody>
            <tr>
              <th />
              <th>{ ROLE_LIST.READER.label }</th>
              <th>{ ROLE_LIST.CONTRIBUTOR.label }</th>
              <th>{ ROLE_LIST.CONTENT_MANAGER.label }</th>
              <th>{ ROLE_LIST.IN_CHARGE.label }</th>
              <th>{ ROLE_LIST.ALLOW_MAIL_NOTIF.label }</th>
            </tr>
            { this.props.addedUser.map((oneUser) =>
              <tr key={'userRoleKey_' + oneUser.id}>
                <td>{ oneUser.name }</td>
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
                  <RoleInput roleId={ROLE_LIST.IN_CHARGE.id} userId={oneUser.id} isChecked={oneUser.role === ROLE_LIST.IN_CHARGE.id} onClickRole={this.handleChangeRole} />
                </td>
                <td>
                  <EmailnotifInput userId={oneUser.id} isChecked={oneUser.emailnotif} onClickEmailnotif={this.handleChangeNotifmail} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ apiData }) => ({ addedUser: apiData.user })
export default connect(mapStateToProps)(RoleForm)

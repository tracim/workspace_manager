import React from 'react'
import { connect } from 'react-redux'

export class RoleForm extends React.Component {
  render () {
    return (
      <div className='roleForm'>
        <table className='roleForm__tab'>
          <tbody>
            <tr>
              <th />
              <th>Lecteur</th>
              <th>Contributeuer</th>
              <th>Gestionnaire de contenu</th>
              <th>Resonsable</th>
              <th>Notifications par email</th>
            </tr>
            { this.props.apiData.user.map((item) =>
              <tr key={'userRoleKey_' + item.id}>
                <td>{ item.name }</td>
                <td>
                  <input type='radio' name={'userRole_' + item.id} />
                </td>
                <td>
                  <input type='radio' name={'userRole_' + item.id} />
                </td>
                <td>
                  <input type='radio' name={'userRole_' + item.id} />
                </td>
                <td>
                  <input type='radio' name={'userRole_' + item.id} />
                </td>
                <td>
                  <input type='checkbox' />
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

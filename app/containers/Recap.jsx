import React from 'react'
import { connect } from 'react-redux'
import { ASYNC_STATUS, WS_RESERVED_ID, displayRole } from '../lib/helper.js'
import RecapUserItem from '../components/RecapUserItem.jsx'
import StatusPicto from '../components/StatusPicto.jsx'
import { switchForm } from '../action-creators.js'

export class Recap extends React.Component {
  constructor () {
    super()
    this.state = {
      workspaceAsyncstatus: {},
      userWithAsyncStatus: []
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      ...this.state,
      userWithAsyncStatus: nextProps.user.map((oneUser) => ({...oneUser, asyncStatus: ASYNC_STATUS.INIT}))
    })
  }

  handleSaveChanges = () => {
    this.setState({
      ...this.state,
      userWithAsyncStatus: this.state.userWithAsyncStatus.map((oneUser) => ({...oneUser, asyncStatus: ASYNC_STATUS.IN_PROGRESS}))
    })

    window.setTimeout(() => {
      this.setState({
        ...this.state,
        userWithAsyncStatus: this.state.userWithAsyncStatus.map((oneUser) => ({...oneUser, asyncStatus: ASYNC_STATUS.OK}))
      })
    }, 2000)
  }

  render () {
    const { workspace, dispatch } = this.props

    return (
      <div className='recap'>
        <div className='col-sm-2'>
          <button className='userForm__backbtn btn' onClick={() => dispatch(switchForm(1))}>
            <i className='fa fa-chevron-left' />
          </button>
        </div>

        <div className='col-sm-9'>
          <div className='recap__title'>Résumé</div>
          <div className='recap__subtitle'>Workspace</div>

          <div className='recap__data'>
            <div className='recap__data__item'>
              <div className='recap__data__item__action'>[{ workspace.id === WS_RESERVED_ID.NEW_WS ? 'Création' : 'Sélection' }]</div>
              <div className='recap__data__item__name'>{ workspace.name }</div>
              <div className='recap__data__item__status'>
                <StatusPicto status={ASYNC_STATUS.IN_PROGRESS} />
              </div>
            </div>
          </div>

          <div className='recap__subtitle'>Utilisateurs</div>

          <div className='recap__data'>
            {
              this.state.userWithAsyncStatus.map((oneUser) =>
                <RecapUserItem type={oneUser.isNew ? 'Création' : 'Invitation'} name={oneUser.name} role={displayRole(oneUser.role)} status={oneUser.asyncStatus} key={oneUser.id} />
              )
            }
          </div>

          <button className='recap__nextbtn btn' onClick={this.handleSaveChanges}>
            <i className='fa fa-gear' />
          </button>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ apiData }) => ({ workspace: apiData.workspace, user: apiData.user })

export default connect(mapStateToProps)(Recap)

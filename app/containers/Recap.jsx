import React from 'react'
import { connect } from 'react-redux'
import Collapse from 'react-collapse'
import { ASYNC_STATUS, WORKSPACE_RESERVED_ID, ROLE_LOCAL_STATUS, displayRole,
  createWorkspace, createUser, addRole, updateRole, removeRole } from '../lib/helper.js'
import RecapUserItem from '../components/RecapUserItem.jsx'
import StatusPicto from '../components/StatusPicto.jsx'
import { switchForm, setWorkspaceAsyncStatus } from '../action-creators.js'
import __ from '../trad.js'

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
      userWithAsyncStatus: nextProps.user.map(oneUser => ({...oneUser, asyncStatus: ASYNC_STATUS.INIT}))
    })
  }

  setUserAsyncStatus = (userId, asyncStatus) => this.setState({
    ...this.state,
    userWithAsyncStatus: this.state.userWithAsyncStatus.map(oneUser => oneUser.id === userId ? {...oneUser, asyncStatus} : oneUser)
  })

  sendAllUsersToApi = (workspaceId, userList) => {
    const { NO_UPDATE, UPDATED, CREATED, REMOVED } = ROLE_LOCAL_STATUS
    const { OK, ERROR } = ASYNC_STATUS

    return userList.map(oneUser => {
      // return window.setTimeout(() => { // surround the switch with this function for testing purpose. Dont forget to add 'return' in front of 'switch'
      // }, Math.random() * 1000)
      switch (oneUser.localStatus) {
        case CREATED: // case : role has been created (user selected from autocomplete)
          return (oneUser.isNew
              ? createUser(oneUser).then(response => response.json())
              : Promise.resolve({id: oneUser.id})
            )
            .then(jsonNewUser => addRole(workspaceId, jsonNewUser.id, oneUser.role, oneUser.subscribeNotif))
            .then(() => this.setUserAsyncStatus(oneUser.id, OK))
            .catch(e => this.setUserAsyncStatus(oneUser.id, ERROR))
        case UPDATED: // case : role has been updated (user already in role list when selecting the workspace)
          return updateRole(workspaceId, oneUser.id, oneUser.role, oneUser.subscribeNotif)
            .then(() => this.setUserAsyncStatus(oneUser.id, OK))
            .catch(e => this.setUserAsyncStatus(oneUser.id, ERROR))
        case REMOVED: // case : role has been removed (user already in role list when selecting the workspace then role removed)
          return removeRole(workspaceId, oneUser.id)
            .then(() => this.setUserAsyncStatus(oneUser.id, OK))
            .catch(e => this.setUserAsyncStatus(oneUser.id, ERROR))
        case NO_UPDATE:
          return Promise.resolve(null)
      }
    })
  }

  handleSaveChanges = () => {
    const { workspace, dispatch } = this.props
    const { userWithAsyncStatus } = this.state
    const { IN_PROGRESS, OK, ERROR } = ASYNC_STATUS
    const { NEW_WORKSPACE } = WORKSPACE_RESERVED_ID

    this.setState({
      ...this.state,
      userWithAsyncStatus: userWithAsyncStatus.map(oneUser => ({...oneUser, asyncStatus: IN_PROGRESS}))
    })

    // about Promise.all : sendAllUsersToApi returns an array of promise (from the map). If we return that array in the then(jsonNewWorkspace => ...),
    // it will be a promise with a value equals to an array of promise which is wrong ; we need the actual array of promise.
    workspace.id === NEW_WORKSPACE
      ? createWorkspace(workspace.name, workspace.description)
        .then(response => {
          dispatch(setWorkspaceAsyncStatus(OK))
          return response.json()
        })
        .catch(e => dispatch(setWorkspaceAsyncStatus(ERROR)))
        .then(jsonNewWorkspace => Promise.all(this.sendAllUsersToApi(jsonNewWorkspace.id, userWithAsyncStatus)))

      : Promise.all(this.sendAllUsersToApi(workspace.id, userWithAsyncStatus))

    .then(() => console.log('all requests successfull'))
  }

  displayLocalStatus = (user) => {
    const { UPDATED, CREATED, REMOVED } = ROLE_LOCAL_STATUS

    // isNew the user has been created with the workspace manager. Its added role will have to be creacted since the user doesn't exists
    if (user.isNew) return __('creation')
    // CREATED means the role has been created for an existing user.
    else if (user.localStatus === UPDATED) return __('modification')
    else if (user.localStatus === CREATED) return __('invitation')
    else if (user.localStatus === REMOVED) return __('suppression')
    else return ''
  }

  render () {
    const { activeForm, workspace, dispatch } = this.props
    const { NEW_WORKSPACE } = WORKSPACE_RESERVED_ID
    const { NO_UPDATE } = ROLE_LOCAL_STATUS

    return (
      <Collapse isOpened={activeForm === 2} className='recap form-horizontal' springConfig={{stiffness: 190, damping: 30}}>
        <div className='recap__content'>
          <div className='form-group'>
            <div className='col-sm-2'>
              <button className='userForm__backbtn btn' onClick={() => dispatch(switchForm(1))}>
                <i className='fa fa-chevron-left' />
              </button>
            </div>

            <div className='col-sm-9'>
              <div className='recap__title'>{__('summary')}</div>
              <div className='recap__subtitle'>{__('workspace')}</div>

              <div className='recap__data'>
                <div className='recap__data__item'>
                  <div className='recap__data__item__action'>[{ workspace.id === NEW_WORKSPACE ? __('creation') : __('selection') }]</div>
                  <div className='recap__data__item__name'>{ workspace.label }</div>
                  <div className='recap__data__item__status'>
                    <StatusPicto status={workspace.asyncStatus} />
                  </div>
                </div>
              </div>

              <div className='recap__subtitle'>{__('users')}</div>

              <div className='recap__data'>
                { this.state.userWithAsyncStatus.map(oneUser => oneUser.localStatus !== NO_UPDATE &&
                  <RecapUserItem
                    type={this.displayLocalStatus(oneUser)}
                    name={oneUser.name}
                    role={displayRole(oneUser.role)}
                    status={oneUser.asyncStatus}
                    key={oneUser.id}
                  />
                )}
              </div>

              <div className='recap__nextbtn'>
                <button className='recap__nextbtn__btn btn' onClick={this.handleSaveChanges}>
                  <i className='fa fa-gear' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    )
  }
}

const mapStateToProps = ({ activeForm, apiData }) => ({ activeForm, workspace: apiData.workspace, user: apiData.user })

export default connect(mapStateToProps)(Recap)

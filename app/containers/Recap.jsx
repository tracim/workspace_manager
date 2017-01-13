import React from 'react'
import { connect } from 'react-redux'
import Collapse from 'react-collapse'
import { ASYNC_STATUS, WS_RESERVED_ID, displayRole } from '../lib/helper.js'
import RecapUserItem from '../components/RecapUserItem.jsx'
import StatusPicto from '../components/StatusPicto.jsx'
import { switchForm } from '../action-creators.js'
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
    const { activeForm, workspace, dispatch } = this.props

    return (
      <Collapse isOpened={activeForm === 2} keepCollapsedContent className='recap form-horizontal' springConfig={{stiffness: 190, damping: 30}}>
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
                  <div className='recap__data__item__action'>[{ workspace.id === WS_RESERVED_ID.NEW_WS ? __('creation') : __('selection') }]</div>
                  <div className='recap__data__item__name'>{ workspace.name }</div>
                  <div className='recap__data__item__status'>
                    <StatusPicto status={ASYNC_STATUS.IN_PROGRESS} />
                  </div>
                </div>
              </div>

              <div className='recap__subtitle'>{__('users')}</div>

              <div className='recap__data'>
                {
                  this.state.userWithAsyncStatus.map((oneUser) =>
                    <RecapUserItem type={oneUser.isNew ? __('creation') : __('invitation')} name={oneUser.name} role={displayRole(oneUser.role)} status={oneUser.asyncStatus} key={oneUser.id} />
                  )
                }
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

import React from 'react'
import { connect } from 'react-redux'
import Collapse from 'react-collapse'
import { switchForm, addUserData, addNewUserData } from '../action-creators.js'
import { ASYNC_STATUS, GLOBAL_API_PATH } from '../lib/helper.js'
import StatusPicto from '../components/StatusPicto.jsx'
import RoleForm from './RoleForm.jsx'
import __ from '../trad.js'

const newUserInit = {
  name: '',
  email: '',
  checkEmailStatus: ASYNC_STATUS.INIT,
  pw: '',
  timezone: '',
  rights: {
    canCreateWorkspace: false,
    isAdmin: false
  },
  config: {
    sendEmailNotif: false
  }
}

export class UserForm extends React.Component {
  constructor () {
    super()
    this.state = {
      searchedUser: '',
      matchingUser: [],
      searchedTimezone: '',
      matchingTimezone: [],
      formHeight: '0px',
      formMaxHeight: '356px', // magic number equals to the total height of the form (must be updated if form's html change)
      roleFormVisibility: true,
      newUser: newUserInit,
      nameValid: true,
      emailValid: true
    }
  }

  showForm = () => {
    this.state.formHeight === '0px'
      ? this.setState({...this.state, selectedUser: '', formHeight: this.state.formMaxHeight, roleFormVisibility: false, newUser: newUserInit})
      : this.setState({...this.state, formHeight: '0px', roleFormVisibility: true})
  }

  handleSearchUser = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    if (searchTerm.length <= 2) {
      this.setState({...this.state, searchedUser: searchTerm, matchingUser: []})
      return
    }

    fetch(GLOBAL_API_PATH + 'users/acp/temp_name', { // @TODO: remplace tempa_name by '?q=' + searchTerm
      'method': 'GET',
      'headers': { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(json => this.setState({...this.state, searchedUser: searchTerm, matchingUser: json}))
    .catch(e => this.setState({...this.state, searchedUser: searchTerm, matchingUser: []}))
  }

  assignUser = (user) => {
    this.setState({...this.state, selectedUser: user.id, formHeight: '0px', roleFormVisibility: true, searchedUser: '', matchingUser: []})

    if (user === '') return
    this.props.dispatch(addUserData(user.id, user.name))
  }

  handleSearchTimezone = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const matchingTimezone = this.props.timezone.filter((oneTimezone) => oneTimezone.toLowerCase().includes(searchTerm))

    this.setState({...this.state, searchedTimezone: searchTerm, matchingTimezone: matchingTimezone})
  }

  assignTimezone = (timezone) => {
    this.setState({...this.state, searchedTimezone: timezone, matchingTimezone: [], newUser: {...this.state.newUser, timezone}})
  }

  // handle click on canCreateWorkspace and isAdmin
  handleClickCheckboxNewUser = (checkboxName) => {
    this.setState({...this.state, newUser: {...this.state.newUser, rights: {...this.state.newUser.rights, [checkboxName]: !this.state.newUser[checkboxName]}}})
  }

  handleClickSendEmailNotif = () => {
    this.setState({...this.state, newUser: {...this.state.newUser, config: {...this.state.newUser.config, sendEmailNotif: !this.state.newUser.config.sendEmailNotif}}})
  }

  handleChangeEmailInput = (e) => {
    const newEmail = e.target.value

    if (newEmail === '' || newEmail.includes('@') === false || newEmail.includes('.') === false) {
      this.setState({...this.state, emailValid: false, newUser: {...this.state.newUser, email: newEmail}})
      return
    }

    this.setState({
      ...this.state,
      newUser: {
        ...this.state.newUser,
        email: newEmail,
        checkEmailStatus: ASYNC_STATUS.IN_PROGRESS
      }
    })

    fetch('/temp_check_async.json', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(json => this.setState({
      ...this.state,
      emailValid: true,
      newUser: {
        ...this.state.newUser,
        checkEmailStatus: json.can_be_used === true ? ASYNC_STATUS.OK : ASYNC_STATUS.ERROR
      }
    }))
    .catch((e) => console.log('Error fetching user data', e))
  }

  handleChangeNameInput = (e) => {
    this.setState({...this.state, newUser: {...this.state.newUser, name: e.target.value}})
  }

  handleChangePwInput = (e) => {
    this.setState({...this.state, newUser: {...this.state.newUser, pw: e.target.value}})
  }

  handleClickAddNewUser = () => {
    const { name, email, pw, timezone, rights, config } = this.state.newUser

    if (name === '' || email === '' || this.state.nameValid === false || this.state.emailValid === false) return

    this.props.dispatch(addNewUserData(name, email, pw, timezone, rights, config))

    this.setState({
      ...this.state,
      formHeight: '0px',
      roleFormVisibility: true,
      newUser: newUserInit,
      nameValid: true,
      emailValid: true
    })
  }

  render () {
    const { tracimConfig, activeForm, addedUser, dispatch } = this.props
    const { searchedUser, matchingUser, searchedTimezone, matchingTimezone, newUser, nameValid, emailValid, formHeight, roleFormVisibility } = this.state

    const canCreateWorkspaceClass = newUser.rights.canCreateWorkspace ? ' checked' : ''
    const isAdminClass = newUser.rights.isAdmin ? ' checked' : ''
    const sendEmailNotifClass = newUser.config.sendEmailNotif ? ' checked' : ''
    const isNameValid = nameValid ? '' : ' has-error'
    const isEmailValid = emailValid ? '' : ' has-error'

    const isBtnNextAllowed = (addedUser.length >= 1)

    return (
      <Collapse isOpened={activeForm === 1} keepCollapsedContent className='userForm form-horizontal' springConfig={{stiffness: 190, damping: 30}}>
        <div className='userForm__form'>

          <div className='userForm__item form-group'>
            <div className='col-sm-1'>
              <button className='userForm__backbtn btn' onClick={() => dispatch(switchForm(0))}>
                <i className='fa fa-chevron-left' />
              </button>
            </div>
            <div className='col-sm-10'>
              {/*
              <select className='form-control' value={this.state.selectedUser} onChange={(e) => this.assignUser(e.target.value)}>
                <option value=''>Choisir un utilisateur</option>
                { user.map((item, i) => <option value={item.id} key={'user_' + i}>{item.name}</option>) }
              </select>
              */}
              <div className='userForm__searchUser'>
                <input type='text' className='userForm__searchUser__input form-control' id='searchUser' placeholder={__('search for a user')} onChange={this.handleSearchUser} value={searchedUser} />
                <div className='userForm__searchUser__autocomplete generic-autocomplete' style={{display: matchingUser.length > 0 ? 'block' : 'none'}}>
                  { matchingUser.map((oneUser, i) =>
                    <div className='userForm__searchUser__autocomplete__item generic-autocomplete__item' key={'user_' + i} onClick={() => this.assignUser(oneUser)}>
                      {oneUser.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          { tracimConfig.rights.canCreateUser && (
            <div className='workspaceForm__formwrapper'>

              <div className='workspaceForm__item__separator form-group'>
                <div className='col-sm-offset-1 col-sm-10'>{__('or')}</div>
              </div>

              <div className='userForm__item__text-link form-group'>
                <div className='col-sm-offset-1 col-sm-10'>
                  <span onClick={this.showForm}>{ roleFormVisibility ? __('create a new user') : __('cancel') }</span>
                </div>
              </div>

              <div className='userForm__wrapper-hidden' style={{height: formHeight}}>

                <div className={'userForm__item form-group' + isNameValid}>
                  <label className='col-sm-2 control-label' htmlFor='newUserName'>{__('name')}</label>
                  <div className='col-sm-9'>
                    <input type='text' className='form-control' id='newUserName' placeholder={__('name')} onChange={this.handleChangeNameInput} value={newUser.name} />
                  </div>
                </div>

                <div className={'userForm__item form-group' + isEmailValid}>
                  <label className='col-sm-2 control-label' htmlFor='newUserEmail'>{__('email')}</label>
                  <div className='col-sm-9'>
                    <input type='text' className='form-control' id='newUserEmail' placeholder={__('email')} onChange={this.handleChangeEmailInput} value={newUser.email} />
                  </div>
                  <div className='userForm__wrapper-hidden__picto col-sm-1'>
                    <StatusPicto status={newUser.checkEmailStatus} />
                  </div>
                </div>

                <div className='userForm__item form-group'>
                  <label className='col-sm-2 control-label' htmlFor='newUserPasssword'>{__('password')}</label>
                  <div className='col-sm-9'>
                    <input type='password' className='form-control' id='newUserPasssword' placeholder={__('password optional')} onChange={this.handleChangePwInput} value={newUser.pw} />
                  </div>
                </div>

                <div className='userForm__item form-group'>
                  <label className='col-sm-2 control-label' htmlFor='newUserTimezone'>{__('timezone')}</label>
                  <div className='col-sm-9'>
                    <input type='text' className='form-control' id='newUserTimezone' placeholder={__('search for a timezone')} onChange={this.handleSearchTimezone} value={searchedTimezone} />
                    <div className='userForm__item__timezone generic-autocomplete' style={{display: matchingTimezone.length > 0 ? 'block' : 'none'}}>
                      { matchingTimezone.map((oneTimezone, i) =>
                        <div className='userForm__item__timezone generic-autocomplete__item' key={'user_' + i} onClick={() => this.assignTimezone(oneTimezone)}>
                          {oneTimezone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='col-sm-offset-2 col-sm-9'>
                  <div className='userForm__item checkbox'>
                    <label className={'customCheckbox' + canCreateWorkspaceClass} htmlFor='newUserCanCreateWorkspace'>
                      <input type='checkbox' id='newUserCanCreateWorkspace' onClick={() => this.handleClickCheckboxNewUser('canCreateWorkspace')} value={newUser.rights.canCreateWorkspace} />
                      {__('this user can create workspace')}
                    </label>
                  </div>
                </div>

                <div className='col-sm-offset-2 col-sm-9'>
                  <div className='userForm__item checkbox'>
                    <label className={'customCheckbox' + isAdminClass} htmlFor='newUserIsAdmin'>
                      <input type='checkbox' id='newUserIsAdmin' onClick={() => this.handleClickCheckboxNewUser('isAdmin')} value={newUser.rights.isAdmin} />
                      {__('this user is admin')}
                    </label>
                  </div>
                </div>

                <div className='col-sm-offset-2 col-sm-9'>
                  <div className='userForm__item checkbox'>
                    <label className={'customCheckbox' + sendEmailNotifClass} htmlFor='newUserSendEmailNotif'>
                      <input type='checkbox' id='newUserSendEmailNotif' onClick={() => this.handleClickSendEmailNotif()} value={newUser.config.sendEmailNotif} />
                      {__('notify by email the user about his account creation')}
                    </label>
                  </div>
                </div>

                <button className='col-sm-offset-9 col-sm-2 btn' onClick={this.handleClickAddNewUser}>
                  {__('add')}
                </button>
              </div>
            </div>
          )}

        </div>

        <RoleForm visible={roleFormVisibility} />

        <div className='userForm__nextbtn'>
          <button className='userForm__nextbtn__btn btn' onClick={() => dispatch(switchForm(2))} disabled={!isBtnNextAllowed}>
            <i className='fa fa-chevron-right' />
          </button>
        </div>
      </Collapse>
    )
  }
}

const mapStateToProps = ({ tracimConfig, activeForm, apiData, timezone }) => ({ tracimConfig, activeForm, addedUser: apiData.user, timezone })
export default connect(mapStateToProps)(UserForm)

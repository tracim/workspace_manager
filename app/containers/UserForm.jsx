import React from 'react'
import { connect } from 'react-redux'
import { switchForm, addUserData, addNewUserData } from '../action-creators.js'
import { ASYNC_STATUS } from '../lib/helper.js'
import StatusPicto from '../components/StatusPicto.jsx'
import findIndex from 'lodash.findindex'
import RoleForm from './RoleForm.jsx'

export class UserForm extends React.Component {
  constructor () {
    super()
    this.state = {
      formHeight: '0px',
      formMaxHeight: '323px', // magic number equals to the total height of the form (must be updated if form's html change)
      roleFormVisibility: true,
      newUser: {
        name: '',
        checkNameStatus: ASYNC_STATUS.INIT,
        email: '',
        checkEmailStatus: ASYNC_STATUS.INIT,
        pw: '',
        canCreateWs: false,
        isAdmin: false,
        sendEmailNotif: false
      },
      nameValid: true,
      emailValid: true
    }
  }

  showForm = () => {
    this.state.formHeight === '0px'
      ? this.setState({...this.state, formHeight: this.state.formMaxHeight, roleFormVisibility: false})
      : this.setState({...this.state, formHeight: '0px', roleFormVisibility: true})
  }

  assignUser = (userId, userName = '') => {
    this.setState({...this.state, formHeight: '0px', roleFormVisibility: true})

    if (userId === '') return
    const intUserId = parseInt(userId)

    if (userName === '') {
      userName = this.props.user[findIndex(this.props.user, {id: intUserId})].name
      this.props.dispatch(addUserData(intUserId, userName))
    }
  }

  handleClickCheckboxNewUser = (checkboxName) => {
    this.setState({...this.state, newUser: {...this.state.newUser, [checkboxName]: !this.state.newUser[checkboxName]}})
  }

  handleChangeEmailInput = (e) => {
    this.setState({
      ...this.state,
      newUser: {
        ...this.state.newUser,
        email: e.target.value,
        checkEmailStatus: ASYNC_STATUS.IN_PROGRESS
      }
    })

    fetch('/temp_check_async.json', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(json => this.setState({...this.state, newUser: {...this.state.newUser, checkEmailStatus: json.response}}))
    .catch((e) => console.log('Error fetching user data', e))
  }

  handleChangeNameInput = (e) => {
    this.setState({...this.state, newUser: {...this.state.newUser, name: e.target.value}})
  }

  handleChangePwInput = (e) => {
    this.setState({...this.state, newUser: {...this.state.newUser, pw: e.target.value}})
  }

  handleClickAddNewUser = () => {
    const { name, email, pw, canCreateWs, isAdmin, sendEmailNotif } = this.state.newUser

    if (name === '' || email === '') {
      this.setState({...this.state, nameValid: name !== '', emailValid: email !== ''})
      return
    }

    this.props.dispatch(addNewUserData(name, email, pw, canCreateWs, isAdmin, sendEmailNotif))

    this.setState({
      ...this.state,
      formHeight: '0px',
      roleFormVisibility: true,
      newUser: {
        name: '',
        checkNameStatus: ASYNC_STATUS.INIT,
        email: '',
        checkEmailStatus: ASYNC_STATUS.INIT,
        pw: '',
        canCreateWs: false,
        isAdmin: false,
        sendEmailNotif: false
      },
      nameValid: true,
      emailValid: true
    })
  }

  render () {
    const { user, addedUser, dispatch } = this.props
    const { newUser, nameValid, emailValid, formHeight, roleFormVisibility } = this.state

    const canCreateWsClass = newUser.canCreateWs ? ' checked' : ''
    const isAdminClass = newUser.isAdmin ? ' checked' : ''
    const sendEmailNotifClass = newUser.sendEmailNotif ? ' checked' : ''
    const isNameValid = nameValid ? '' : ' has-error'
    const isEmailValid = emailValid ? '' : ' has-error'

    const isBtnNextAllowed = (addedUser.length >= 1)

    return (
      <div className='userForm form-horizontal'>

        <div className='userForm__form'>

          <div className='userForm__item form-group'>
            <div className='col-sm-2'>
              <button className='userForm__backbtn btn' onClick={() => dispatch(switchForm(0))}>
                <i className='fa fa-chevron-left' />
              </button>
            </div>
            <div className='col-sm-9'>
              <select className='form-control' onChange={(e) => this.assignUser(e.target.value)}>
                <option value=''>Choisir un utilisateur</option>
                { user.map((item, i) => <option value={item.id} key={'user_' + i}>{item.name}</option>) }
              </select>
            </div>
          </div>

          <div className='userForm__item__text-link form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <span onClick={this.showForm}>Créer un nouvel utilisateur</span>
            </div>
          </div>

          <div className='userForm__wrapper-hidden' style={{height: formHeight}}>

            <div className={'userForm__item form-group' + isNameValid}>
              <label className='col-sm-2 control-label' htmlFor='newUserName'>Nom : </label>
              <div className='col-sm-8'>
                <input type='text' className='form-control' id='newUserName' placeholder='Nom' onChange={this.handleChangeNameInput} value={newUser.name} />
              </div>
            </div>

            <div className={'userForm__item form-group' + isEmailValid}>
              <label className='col-sm-2 control-label' htmlFor='newUserEmail'>Email : </label>
              <div className='col-sm-8'>
                <input type='text' className='form-control' id='newUserEmail' placeholder='Email' onChange={this.handleChangeEmailInput} value={newUser.email} />
              </div>
              <div className='userForm__wrapper-hidden__picto col-sm-1'>
                <StatusPicto status={newUser.checkEmailStatus} />
              </div>
            </div>

            <div className='userForm__item form-group'>
              <label className='col-sm-2 control-label' htmlFor='newUserPasssword'>Mot de passe : </label>
              <div className='col-sm-8'>
                <input type='password' className='form-control' id='newUserPasssword' placeholder='Mot de passe (facultatif)' onChange={this.handleChangePwInput} value={newUser.pw} />
              </div>
            </div>

            <div className='col-sm-offset-2 col-sm-9'>
              <div className='userForm__item checkbox'>
                <label className={'customCheckbox' + canCreateWsClass} htmlFor='newUserCanCreateWs'>
                  <input type='checkbox' id='newUserCanCreateWs' onClick={() => this.handleClickCheckboxNewUser('canCreateWs')} value={newUser.canCreateWs} />
                  Cet utilisateur peut créer des espaces de travail
                </label>
              </div>
            </div>

            <div className='col-sm-offset-2 col-sm-9'>
              <div className='userForm__item checkbox'>
                <label className={'customCheckbox' + isAdminClass} htmlFor='newUserIsAdmin'>
                  <input type='checkbox' id='newUserIsAdmin' onClick={() => this.handleClickCheckboxNewUser('isAdmin')} value={newUser.isAdmin} />
                  Cet utilisateur est un administrateur
                </label>
              </div>
            </div>

            <div className='col-sm-offset-2 col-sm-9'>
              <div className='userForm__item checkbox'>
                <label className={'customCheckbox' + sendEmailNotifClass} htmlFor='newUserSendEmailNotif'>
                  <input type='checkbox' id='newUserSendEmailNotif' onClick={() => this.handleClickCheckboxNewUser('sendEmailNotif')} value={newUser.sendEmailNotif} />
                  Notifier par mail l'utilisateur de la création de son compte
                </label>
              </div>
            </div>

            <button className='col-sm-offset-9 col-sm-2 btn' onClick={this.handleClickAddNewUser}>
              Ajouter
            </button>

          </div>

        </div>

        <RoleForm visible={roleFormVisibility} />

        <button className='userForm__nextbtn btn' onClick={() => dispatch(switchForm(2))} disabled={!isBtnNextAllowed}>
          <i className='fa fa-chevron-right' />
        </button>

      </div>
    )
  }
}

const mapStateToProps = ({ user, apiData }) => ({ user, addedUser: apiData.user })
export default connect(mapStateToProps)(UserForm)

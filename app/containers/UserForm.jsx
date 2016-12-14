import React from 'react'
import { connect } from 'react-redux'
import { switchForm, addUserData, addNewUserData, removeUserData } from '../action-creators.js'
import { ASYNC_STATUS } from '../lib/helper.js'
import StatusPicto from '../components/StatusPicto.jsx'
import findIndex from 'lodash.findindex'

export class UserForm extends React.Component {
  constructor () {
    super()
    this.state = {
      formHeight: '0px',
      formMaxHeight: '323px', // magic number equals to the total height of the form (must be updated if form's html change)
      newUser: {
        name: '',
        checkNameStatus: ASYNC_STATUS.INIT,
        email: '',
        checkEmailStatus: ASYNC_STATUS.INIT,
        pw: '',
        canCreateWs: false,
        isAdmin: false,
        canSendEmail: false
      }
    }
  }

  showForm = () => {
    this.setState({...this.state, formHeight: this.state.formHeight === '0px' ? this.state.formMaxHeight : '0px'})
  }

  assignUser = (userId, userName = '') => {
    this.setState({...this.state, formHeight: '0px'})

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

  handleChangeInput = (e) => {
    let checkedInput
    if (e.target.id === 'newUserName') checkedInput = { editedField: 'name', asyncCheck: 'checkNameStatus' }
    else if (e.target.id === 'newUserEmail') checkedInput = { editedField: 'email', asyncCheck: 'checkEmailStatus' }
    else return

    this.setState({
      ...this.state,
      newUser: {
        ...this.state.newUser,
        [checkedInput.editedField]: e.target.value,
        [checkedInput.asyncCheck]: ASYNC_STATUS.IN_PROGRESS
      }
    })

    fetch('/temp_check_async.json', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(json => this.setState({...this.state, newUser: {...this.state.newUser, [checkedInput.asyncCheck]: json.response}}))
    .catch((e) => console.log('Error fetching user data', e))
  }

  handleChangePw = (e) => {
    this.setState({...this.state, newUser: {...this.state.newUser, pw: e.target.value}})
  }

  handleClickAddNewUser = () => {
    const { name, email, pw, canCreateWs, isAdmin, canSendEmail } = this.state.newUser
    this.props.dispatch(addNewUserData(name, email, pw, canCreateWs, isAdmin, canSendEmail))

    this.setState({
      ...this.state,
      newUser: {
        name: '',
        checkNameStatus: ASYNC_STATUS.INIT,
        email: '',
        checkEmailStatus: ASYNC_STATUS.INIT,
        pw: '',
        canCreateWs: false,
        isAdmin: false,
        canSendEmail: false
      }
    })
  }

  render () {
    const { user } = this.props

    const canCreateWsClass = this.state.newUser.canCreateWs ? ' checked' : ''
    const isAdminClass = this.state.newUser.isAdmin ? ' checked' : ''
    const canSendEmailClass = this.state.newUser.canSendEmail ? ' checked' : ''

    return (
      <div className='userForm form-horizontal'>

        <div className='userForm__form'>

          <div className='userForm__item form-group'>
            <div className='col-sm-2'>
              <button className='userForm__backbtn btn' onClick={() => this.props.dispatch(switchForm(0))}>Retour</button>
            </div>
            <div className='col-sm-offset-1 col-sm-8'>
              <select className='form-control' onChange={(e) => this.assignUser(e.target.value)}>
                <option value=''>Choisir un utilisateur</option>
                { user.map((item, i) => <option value={item.id} key={'user_' + i}>{item.name}</option>) }
              </select>
            </div>
          </div>

          <div className='userForm__item__text-link form-group'>
            <div className='col-sm-offset-3 col-sm-9'>
              <span onClick={this.showForm}>Créer un nouvel utilisateur</span>
            </div>
          </div>

          <div className='userForm__wrapper-hidden' style={{height: this.state.formHeight}}>

            <div className='userForm__item form-group'>
              <label className='col-sm-3 control-label' htmlFor='newUserName'>Nom : </label>
              <div className='col-sm-7'>
                <input type='text' className='form-control' id='newUserName' placeholder='Nom' onChange={this.handleChangeInput} value={this.state.newUser.name} />
              </div>
              <div className='userForm__wrapper-hidden__picto col-sm-1'>
                <StatusPicto status={this.state.newUser.checkNameStatus} />
              </div>
            </div>

            <div className='userForm__item form-group'>
              <label className='col-sm-3 control-label' htmlFor='newUserEmail'>Email : </label>
              <div className='col-sm-7'>
                <input type='text' className='form-control' id='newUserEmail' placeholder='Email' onChange={this.handleChangeInput} value={this.state.newUser.email} />
              </div>
              <div className='userForm__wrapper-hidden__picto col-sm-1'>
                <StatusPicto status={this.state.newUser.checkEmailStatus} />
              </div>
            </div>

            <div className='userForm__item form-group'>
              <label className='col-sm-3 control-label' htmlFor='newUserPasssword'>Mot de passe : </label>
              <div className='col-sm-7'>
                <input type='password' className='form-control' id='newUserPasssword' placeholder='Mot de passe (facultatif)' onChange={this.handleChangePw} value={this.state.newUser.pw} />
              </div>
            </div>

            <div className='col-sm-offset-3 col-sm-8'>
              <div className='userForm__item checkbox'>
                <label className={'customCheckbox' + canCreateWsClass} htmlFor='newUserCanCreateWs'>
                  <input type='checkbox' id='newUserCanCreateWs' onClick={() => this.handleClickCheckboxNewUser('canCreateWs')} value={this.state.canCreateWs} />
                  Cet utilisateur peut créer des espaces de travail
                </label>
              </div>
            </div>

            <div className='col-sm-offset-3 col-sm-8'>
              <div className='userForm__item checkbox'>
                <label className={'customCheckbox' + isAdminClass} htmlFor='newUserIsAdmin'>
                  <input type='checkbox' id='newUserIsAdmin' onClick={() => this.handleClickCheckboxNewUser('isAdmin')} value={this.state.isAdmin} />
                  Cet utilisateur est un administrateur
                </label>
              </div>
            </div>

            <div className='col-sm-offset-3 col-sm-8'>
              <div className='userForm__item checkbox'>
                <label className={'customCheckbox' + canSendEmailClass} htmlFor='newUserCanSendEmail'>
                  <input type='checkbox' id='newUserCanSendEmail' onClick={() => this.handleClickCheckboxNewUser('canSendEmail')} value={this.state.canSendEmail} />
                  Cet utilisateur peut envoyer des email aux utilisateurs
                </label>
              </div>
            </div>

            <button className='col-sm-offset-9 col-sm-2 btn' onClick={this.handleClickAddNewUser}>
              Ajouter
            </button>

          </div>

        </div>

        <div className='userForm__recap'>
          <div className='userForm__recap__title'>Utilisateurs sélectionnés</div>
          <div className='userForm__recap__list'>
            { this.props.addedUser.map((item) =>
              <div
                className='userForm__recap__list__item clearfix'
                key={'addedUser_' + item.id}
                onClick={() => this.props.dispatch(removeUserData(item.id))}>
                <div className='userForm__recap__list__item__delete'>x</div>
                <div className='userForm__recap__list__item__name'>{ item.name }</div>
              </div>
            ) }
          </div>

          <button
            className='userForm__recap__nextbtn btn'
            onClick={() => this.props.dispatch(switchForm(2))}
            style={{display: this.props.addedUser.length > 0 ? 'block' : 'none'}}>Suite</button>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ user, apiData }) => ({ user, addedUser: apiData.user })
export default connect(mapStateToProps)(UserForm)

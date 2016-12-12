import React from 'react'
import { connect } from 'react-redux'
import { switchForm, addUserData, removeUserData } from '../action-creators.js'

export class UserForm extends React.Component {
  constructor () {
    super()
    this.state = {
      formHeight: '0px',
      formMaxHeight: '273px'
    }
  }

  showForm = () => {
    this.setState({...this.state, formHeight: this.state.formHeight === '0px' ? this.state.formMaxHeight : '0px'})
  }

  assignUser = (e) => {
    this.setState({...this.state, formHeight: '0px'})

    const userId = e.target.value
    if (userId === '') return

    const userName = e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text

    this.props.dispatch(addUserData(userId, userName))
  }

  render () {
    const { user } = this.props

    return (
      <div className='userForm form-horizontal'>

        <div className='userForm__form'>

          <div className='userForm__item form-group'>
            <div className='col-sm-2'>
              <button className='userForm__backbtn btn' onClick={() => this.props.dispatch(switchForm(0))}>Retour</button>
            </div>
            <div className='col-sm-offset-1 col-sm-8'>
              <select className='form-control' onChange={this.assignUser}>
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
              <div className='col-sm-8'>
                <input type='text' className='form-control' id='newUserName' placeholder='Nom' />
              </div>
            </div>

            <div className='userForm__item form-group'>
              <label className='col-sm-3 control-label' htmlFor='newUserEmail'>Email : </label>
              <div className='col-sm-8'>
                <input type='text' className='form-control' id='newUserEmail' placeholder='Email' />
              </div>
            </div>

            <div className='userForm__item form-group'>
              <label className='col-sm-3 control-label' htmlFor='newUserPasssword'>Mot de passe : </label>
              <div className='col-sm-8'>
                <input type='password' className='form-control' id='newUserPasssword' placeholder='Mot de passe' />
              </div>
            </div>

            <div className='col-sm-offset-3 col-sm-8'>
              <div className='userForm__item checkbox'>
                <label htmlFor='newUserCanCreateWs'>
                  <input type='checkbox' id='newUserCanCreateWs' />
                  Cet utilisateur peut créer des espaces de travail
                </label>
              </div>
            </div>

            <div className='col-sm-offset-3 col-sm-8'>
              <div className='userForm__item checkbox'>
                <label htmlFor='newUserIsAdmin'>
                  <input type='checkbox' id='newUserIsAdmin' />
                  Cet utilisateur est un administrateur
                </label>
              </div>
            </div>

            <div className='col-sm-offset-3 col-sm-8'>
              <div className='userForm__item checkbox'>
                <label htmlFor='newUserCanSendEmail'>
                  <input type='checkbox' id='newUserCanSendEmail' />
                  Cet utilisateur peut envoyer des email aux utilisateurs
                </label>
              </div>
            </div>

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

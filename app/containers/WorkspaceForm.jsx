import React from 'react'
import { connect } from 'react-redux'
import { switchForm, setWorkspaceData } from '../action-creators.js'

export class WorkspaceForm extends React.Component {
  constructor () {
    super()
    this.state = {
      formHeight: '0px',
      formMaxHeight: '49px'
    }
  }

  showForm = () => {
    this.setState({formHeight: this.state.formHeight === '0px' ? this.state.formMaxHeight : '0px'})
  }

  assignWorkspace = (e) => {
    const workspaceId = e.target.value
    const workspaceName = e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text

    this.setState({...this.state, formHeight: '0px'})
    if (workspaceId === '') return

    this.props.dispatch(setWorkspaceData(workspaceId, workspaceName))
    this.props.dispatch(switchForm(1))
  }

  render () {
    return (
      <div className='workspaceForm form-horizontal'>

        <div className='workspaceForm__item form-group'>
          <div className='col-sm-offset-1 col-sm-10'>
            <select className='form-control' value={this.props.workspace.id} onChange={this.assignWorkspace}>
              <option value=''>Choisir un workspace</option>
              { this.props.workspace.map((item, i) => <option value={item.id} key={'ws_' + i}>{item.name}</option>) }
            </select>
          </div>
        </div>

        <div className='workspaceForm__item__separator form-group'>
          <div className='col-sm-offset-1 col-sm-10'>Ou</div>
        </div>

        <div className='workspaceForm__item__text-link form-group'>
          <div className='col-sm-offset-1 col-sm-10'>
            <span onClick={this.showForm}>Créer un nouveau workspace</span>
          </div>
        </div>

        <div className='workspaceForm__wrapper-hidden' style={{height: this.state.formHeight}}>
          <div className='workspaceForm__item  form-group'>
            <label className='col-sm-2 control-label' htmlFor='newWs'>Nom : </label>
            <div className='col-sm-9'>
              <input type='text' className='form-control' id='newWs' />
            </div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ workspace }) => ({ workspace })
export default connect(mapStateToProps)(WorkspaceForm)

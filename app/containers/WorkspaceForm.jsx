import React from 'react'
import { connect } from 'react-redux'
import { switchForm, setWorkspaceData, setWorkspaceDescription } from '../action-creators.js'
import StatusPicto from '../components/StatusPicto.jsx'
import { ASYNC_STATUS, WS_RESERVED_ID } from '../lib/helper.js'

export class WorkspaceForm extends React.Component {
  constructor () {
    super()

    this.state = {
      formHeight: '0px',
      formMaxHeight: '98px', // magic number equals to the total height of the form (must be updated if form's html change)
      checkWsStatus: ASYNC_STATUS.INIT
    }
  }

  handleShowForm = () => {
    this.setState({formHeight: this.state.formHeight === '0px' ? this.state.formMaxHeight : '0px', checkWsStatus: ASYNC_STATUS.INIT})
    this.props.dispatch(setWorkspaceData(WS_RESERVED_ID.NEW_WS, '', [], []))
  }

  handleAssignWorkspace = (e) => {
    const workspaceId = parseInt(e.target.value)
    this.setState({...this.state, formHeight: '0px'})

    if (workspaceId === WS_RESERVED_ID.NO_WS_SELECTED) return

    const workspaceName = e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text

    this.props.dispatch(setWorkspaceData(workspaceId, workspaceName, this.props.user, this.props.role))
    this.props.dispatch(switchForm(1))
  }

  handleChangeWsName = (e) => {
    e.persist()
    this.setState({...this.state, checkWsStatus: ASYNC_STATUS.IN_PROGRESS})

    fetch('/temp_check_async.json', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({...this.state, checkWsStatus: json.can_be_used === true ? ASYNC_STATUS.OK : ASYNC_STATUS.ERROR})
      this.props.dispatch(setWorkspaceData(WS_RESERVED_ID.NEW_WS, e.target.value, [], []))
    })
    .catch((e) => console.log('Error fetching workspace', e))
  }

  handleChangeWsDesc = (e) => {
    this.props.dispatch(setWorkspaceDescription(e.target.value))
  }

  render () {
    const { workspace, selectedWs, dispatch } = this.props

    const isBtnNextAllowed = (selectedWs.id !== WS_RESERVED_ID.NO_WS_SELECTED && selectedWs.id !== WS_RESERVED_ID.NEW_WS) || this.state.checkWsStatus === ASYNC_STATUS.OK

    return (
      <div className='workspaceForm form-horizontal'>

        <div className='workspaceForm__item form-group'>
          <div className='col-sm-offset-1 col-sm-10'>
            <select className='form-control' value={selectedWs.id} onChange={this.handleAssignWorkspace}>
              <option value={WS_RESERVED_ID.NO_WS_SELECTED}>Choisir un workspace</option>
              { workspace.map((item, i) => <option value={item.id} key={'ws_' + i}>{item.name}</option>) }
            </select>
          </div>
        </div>

        <div className='workspaceForm__item__separator form-group'>
          <div className='col-sm-offset-1 col-sm-10'>Ou</div>
        </div>

        <div className='workspaceForm__item__text-link form-group'>
          <div className='col-sm-offset-1 col-sm-10'>
            <span onClick={this.handleShowForm}>Créer un nouveau workspace</span>
          </div>
        </div>

        <div className='workspaceForm__wrapper-hidden' style={{height: this.state.formHeight}}>
          <div className='workspaceForm__item  form-group'>
            <label className='col-sm-2 control-label' htmlFor='newWsName'>Nom : </label>
            <div className='col-sm-9'>
              <input type='text' className='form-control' id='newWsName' onChange={this.handleChangeWsName} />
            </div>
            <div className='workspaceForm__wrapper-hidden__picto col-sm-1'>
              <StatusPicto status={this.state.checkWsStatus} />
            </div>
          </div>

          <div className='workspaceForm__item  form-group'>
            <label className='col-sm-2 control-label' htmlFor='newWsDesc'>Description : </label>
            <div className='col-sm-9'>
              <input type='text' className='form-control' id='newWsDesc' onChange={this.handleChangeWsDesc} />
            </div>
          </div>
        </div>

        <button className='workspaceForm__nextbtn btn' onClick={() => dispatch(switchForm(1))} disabled={!isBtnNextAllowed}>
          <i className='fa fa-chevron-right' />
        </button>

      </div>
    )
  }
}

const mapStateToProps = ({ workspace, user, role, apiData }) => ({ workspace, user, role, selectedWs: apiData.workspace })
export default connect(mapStateToProps)(WorkspaceForm)

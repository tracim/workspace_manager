import React from 'react'
import { connect } from 'react-redux'
import Collapse from 'react-collapse'
import { switchForm, setWorkspaceData, setWorkspaceDescription } from '../action-creators.js'
import NewWorkspaceForm from '../components/NewWorkspaceForm.jsx'
import { ASYNC_STATUS, WS_RESERVED_ID } from '../lib/helper.js'
import __ from '../trad.js'

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
    const newWsName = e.target.value
    this.setState({...this.state, checkWsStatus: ASYNC_STATUS.IN_PROGRESS})

    fetch('/temp_check_async.json', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({...this.state, checkWsStatus: json.can_be_used === true ? ASYNC_STATUS.OK : ASYNC_STATUS.ERROR})
      this.props.dispatch(setWorkspaceData(WS_RESERVED_ID.NEW_WS, newWsName, [], []))
    })
    .catch((e) => console.log('Error fetching workspace', e))
  }

  handleChangeWsDesc = (e) => {
    this.props.dispatch(setWorkspaceDescription(e.target.value))
  }

  render () {
    const { tracimConfig, activeForm, workspace, selectedWs, dispatch } = this.props

    const isBtnNextAllowed = (selectedWs.id !== WS_RESERVED_ID.NO_WS_SELECTED && selectedWs.id !== WS_RESERVED_ID.NEW_WS) || this.state.checkWsStatus === ASYNC_STATUS.OK

    return (
      <Collapse isOpened={activeForm === 0} keepCollapsedContent className='workspaceForm form-horizontal' springConfig={{stiffness: 190, damping: 30}}>
        <div className='workspaceForm__item form-group'>
          <div className='col-sm-offset-1 col-sm-10'>
            <select className='form-control' value={selectedWs.id} onChange={this.handleAssignWorkspace}>
              <option value={WS_RESERVED_ID.NO_WS_SELECTED}>{ __('choose a workspace') }</option>
              { workspace.map((item, i) => <option value={item.id} key={'ws_' + i}>{item.name}</option>) }
            </select>
          </div>
        </div>

        { tracimConfig.canCreateWs && (
          <NewWorkspaceForm
            onClickBtnNewWorkspace={this.handleShowForm}
            onChangeWsName={this.handleChangeWsName}
            onChangeWsDescription={this.handleChangeWsDesc}
            wsAvailableStatus={this.state.checkWsStatus}
            formHeight={this.state.formHeight} />
        )}

        <div className='workspaceForm__nextbtn'>
          <button className='workspaceForm__nextbtn__btn btn' onClick={() => dispatch(switchForm(1))} disabled={!isBtnNextAllowed}>
            <i className='fa fa-chevron-right' />
          </button>
        </div>
      </Collapse>
    )
  }
}

const mapStateToProps = ({ tracimConfig, activeForm, workspace, user, role, apiData }) => ({ tracimConfig, activeForm, workspace, user, role, selectedWs: apiData.workspace })
export default connect(mapStateToProps)(WorkspaceForm)

import React from 'react'
import StatusPicto from './StatusPicto.jsx'
import __ from '../trad.js'

export function NewWorkspaceForm ({ onClickBtnNewWorkspace, onChangeWsName, onChangeWsDescription, wsAvailableStatus, formHeight }) {
  return (
    <div className='workspaceForm__formwrapper'>
      { formHeight === '0px' &&
        <div>
          <div className='workspaceForm__item__separator form-group'>
            <div className='col-sm-offset-1 col-sm-10'>{ __('or') }</div>
          </div>

          <div className='workspaceForm__item__text-link form-group'>
            <div className='col-sm-offset-1 col-sm-10'>
              <span onClick={onClickBtnNewWorkspace}>{ __('create a new workspace') }</span>
            </div>
          </div>
        </div>
      }

      <div className='workspaceForm__wrapper-hidden' style={{height: formHeight}}>
        <div className='workspaceForm__item  form-group'>
          <label className='col-sm-2 control-label' htmlFor='newWsName'>{ __('name') }</label>
          <div className='col-sm-9'>
            <input type='text' className='form-control' id='newWsName' onChange={onChangeWsName} />
          </div>
          <div className='workspaceForm__wrapper-hidden__picto col-sm-1'>
            <StatusPicto status={wsAvailableStatus} />
          </div>
        </div>

        <div className='workspaceForm__item  form-group'>
          <label className='col-sm-2 control-label' htmlFor='newWsDesc'>{ __('description') }</label>
          <div className='col-sm-9'>
            <textarea className='form-control' rows='4' id='newWsDesc' onChange={onChangeWsDescription} />
          </div>
        </div>
      </div>
    </div>
  )
}

NewWorkspaceForm.propTypes = {
  onClickBtnNewWorkspace: React.PropTypes.func.isRequired,
  onChangeWsName: React.PropTypes.func.isRequired,
  onChangeWsDescription: React.PropTypes.func.isRequired,
  wsAvailableStatus: React.PropTypes.number.isRequired,
  formHeight: React.PropTypes.string.isRequired // string because it is the css value with 'px'
}

export default NewWorkspaceForm

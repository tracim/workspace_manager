import React from 'react'
import { connect } from 'react-redux'
import WorkspaceForm from './WorkspaceForm.jsx'
import UserForm from './UserForm.jsx'
import Recap from './Recap.jsx'

export class Wizard extends React.Component {
  render () {
    return (
      <div className='wizard'>
        <div className='wizard__view' style={{left: -868 * this.props.activeForm}}>
          <WorkspaceForm />
          <UserForm />
          <Recap />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ activeForm }) => ({ activeForm })

export default connect(mapStateToProps)(Wizard)

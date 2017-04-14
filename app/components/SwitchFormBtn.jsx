import React from 'react'
import __ from '../trad.js'

export function SwitchFormBtn ({ side, onClick, specificClass = '', disabled = false, isFetching = false }) {
  const allowedSides = ['left', 'right']

  if (!allowedSides.includes(side)) {
    console.error(`In component SwitchFormBtn, allowed side values are ${allowedSides.toString()}. You gave ${side}`)
    return <span />
  }

  return (
    <button className={specificClass + ' btn btn-default'} onClick={onClick} disabled={disabled}>
      { isFetching ? <i className={'fa fa-spinner fa-spin'} /> : <i className={'fa fa-chevron-' + side} /> }
      { side === 'left' && !isFetching && __('previous') }
      { side === 'right' && !isFetching && __('next') }
    </button>
  )
}

SwitchFormBtn.propTypes = {
  side: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  specificClass: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  isFetching: React.PropTypes.bool
}

export default SwitchFormBtn

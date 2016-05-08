import React, { Component, PropTypes } from 'react'

export default class Checkbox extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {id, question, onCheckboxChange} = this.props
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" onChange={ (e) => onCheckboxChange(id, e.target.checked) } /> {question}
        </label>
      </div>
    )
  }
}

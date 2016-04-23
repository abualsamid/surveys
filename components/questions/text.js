import React, { Component, PropTypes } from 'react'


export default class TextBox extends Component  {
  constructor(props) {
    super(props)
  }
  render() {
    const {i, id, question, onChange} = this.props
    return (
      <div className="form-group">
        <label><strong>{i}. </strong> {question}</label>
        <textarea className="form-control"
          defaultValue=""
          onChange={ (e) => onChange(id, e.target.value)}></textarea>
      </div>
    )
  }
}

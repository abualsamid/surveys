import React, { Component, PropTypes } from 'react'


export default class TextBox extends Component  {
  constructor(props) {
    super(props)
  }
  render() {
    const {i, id, question, onChange} = this.props
    function prefix(i) {
      return i ? <strong>{i}. </strong> : ""
    }
    return (
      <div className="form-group">
        <p className="lead">
          {prefix(i)}
          {question}
        </p>
        <textarea className="form-control" rows="6"
          defaultValue=""
          onChange={ (e) => onChange(id, e.target.value)}></textarea>
      </div>
    )
  }
}

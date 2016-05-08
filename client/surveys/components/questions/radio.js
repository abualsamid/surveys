import React, { Component, PropTypes } from 'react'

export default class RadioButton extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {id, question, onChange} = this.props
    return (
      <div className="form-group">
        <label for={id}>
          {question}
        </label>
        <br/>
        <div className="btn-group" data-toggle="buttons">
          <label className="radio-inline">
            <input type='radio' name={id}  value="1" onChange={ (e) => onChange(id, e.target.checked,e.target.value) } /> Yes
          </label>
          { }
          <label className="radio-inline">
            <input type='radio' name={id}  value="2" onChange={ (e) => onChange(id, e.target.checked,e.target.value) } /> No
          </label>
          { }
          <label className="radio-inline">
            <input type='radio' name={id}  value="3"  onChange={ (e) => onChange(id, e.target.checked,e.target.value) } /> Sometimes
          </label>
        </div>

      </div>
    )
  }
}

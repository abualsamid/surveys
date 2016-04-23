import React, { Component, PropTypes } from 'react'


export default class DropDown extends Component  {
  constructor(props) {
    super(props)
  }
  render() {
    const { id, question, pleaseSelect,options, onChange} = this.props


    return (
      <div className="form-group">
        <label>{question}</label>
          <select required defaultValue="" className="form-control"
          onChange={ (e) => onChange(id,e.target.value) } >
            <option value="" key={question} >({pleaseSelect})</option>
            {
              options.map(
                (one) => <option key={one.key} value={one.key}>{one.value}</option>
              )
            }
          </select>
      </div>
    )

  }
}

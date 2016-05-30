import React, { Component, PropTypes } from 'react'

export default class RadioButton extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {id, question, onChange, options } = this.props
    return (
      <div className="form-group">
        <label for={id}>
          {question}
        </label>
        <br/>
        <div className="btn-group" data-toggle="buttons">
          {
            options.map(item => (
              <label className="radio-inline">
                <input key={"q_" + id + item.v} type="radio" name={"q_" + id} value={item.v} onChange={  (e) => onChange(id, e.target.checked,e.target.value) } /> {item.caption}
              </label>
              )
            )
          }
        </div>

      </div>
    )
  }
}

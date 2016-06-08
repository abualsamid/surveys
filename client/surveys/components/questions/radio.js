import React, { Component, PropTypes } from 'react'

export default class RadioButton extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {id, question, onChange, options } = this.props
    return (
      <div className="form-group">
        <p className="lead">
          {question}
        </p>
        <label>
        </label>
        <div className="btn-group" data-toggle="buttons">
          {
            options.map(item => (
              <label className="btn" key={"l_" + id + item.v}>
                <input key={"q_" + id + item.v} type="radio" name={"q_" + id} value={item.v} onChange={  (e) => onChange(id, e.target.checked,e.target.value) } />
                <i className="fa fa-circle-o fa-2x"></i><i className="fa fa-check-circle-o fa-2x"></i>
                <span>
                  {item.caption}
                </span>
              </label>
              )
            )
          }
        </div>

      </div>
    )
  }
}

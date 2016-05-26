import React, { Component, PropTypes } from 'react'


export default class DropDown extends Component  {
  constructor(props) {
    super(props)
    this.state = {value:""}
    this.changeMe = this.changeMe.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    try {
      this.select.selectedIndex=0
      this.setState({value:""})
    } catch(x) {console.log("in drop down: ", x)}
  }
  changeMe(e) {

    this.setState({value: e.target.value})
    this.props.onChange(this.props.id, e.target.value)
  }
  render() {
    const { id, question, pleaseSelect,options, onChange} = this.props

    return (
        <div className="form-group">
          <label>{question}</label>
          <br/>
            <select value={this.state.value} className="form-control"
              ref={(ref) => this.select = ref }
            onChange={ this.changeMe } >
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

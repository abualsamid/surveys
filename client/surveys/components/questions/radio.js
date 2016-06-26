import React, { Component, PropTypes } from 'react'

class OneButton extends Component {
    constructor(props) {
      super(props)
      this.handleChange=this.handleChange.bind(this)
      this.state = {checked: this.props.checked}
    }
    componentwillreceiveprops(props) {
      this.setState({checked: props.checked})
    }
    render() {
      const {name, value, checked, label }  = this.props
      return (
        <label>
          <input
            type='radio'
            name={name}
            value={value}
            defaultChecked={this.props.checked}
            checked={this.state.checked}
            onChange={this.handleChange }
            ref = { (e) => this.radio=e }
          />
        {label}
        </label>
      )
    }
    handleChange(e) {
      const {name, value,  label, onChange, id }  = this.props
      this.setState({checked: this.radio.checked})
      onChange(id, this.radio.checked, value)

    }
}
export default class RadioButton extends Component {
  constructor(props) {
    super(props)
    this._onChange=this._onChange.bind(this)
    this.state = {options: this.props.options}
  }

  _onChange(id, value) {

    let options = this.state.options
    options.forEach( (item, index, options) => {
      options[index].checked = value==item.v //  false
    } )
    this.setState({options: options})

    try {
      this.props.onChange(id,  value )
    } catch(x) {
      console.log(x);
    }
  }
  render() {
    const {id, question, onChange, options } = this.props
    const self = this
    return (
      <div className="form-group">
        <p className="lead">
          <strong>{question}</strong>
        </p>
        <label>
        </label>
        <div className="btn-group" >
          {
            this.state.options.map( (choice,index) => {
              const {v, caption, checked,className, checkedClassName} = choice
              let c = checked ? checkedClassName :  className
              let s = checked ? {fontWeight: "bold"} : {}
              return (
                <div style={{margin: "0.25em"}} className="btn-group" key={id + '_' + index}>
                  <button className={c} onClick={ (e)=> this._onChange(id,v) }>
                    <span style={s}>
                      {caption}
                    </span>
                  </button>
                </div>
              )

            })
          }
        </div>

      </div>
    )
  }
}

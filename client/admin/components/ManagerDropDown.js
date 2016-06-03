import React, { Component, PropTypes } from 'react'

export default class ManagerDropDown extends Component {
  constructor(props) {
    super(props)
    this.handleChange=this.handleChange.bind(this)
  }
  componentDidMount() {
    this.handleChange()
  }

  componentWillReceiveProps(nextProps) {

  }
  handleChange() {
    try {
      const { setManagerId} = this.props
      if (this.managerId && this.managerId.options && this.managerId.options.length) {
        setManagerId(this.managerId.value || this.managerId.options[0].value, this.managerId.options[this.managerId.selectedIndex||0].text)
      }
    } catch(x) {
      console.log(x)
    }

  }

  render() {
    const { storeId, managers, caption, selectedManager } = this.props
    return (
        <div className="form-group">
          <label>{caption}</label>

          <select className="form-control" value={selectedManager} 
              ref={(managerId) => this.managerId=managerId} onChange={this.handleChange} >
            {
              managers
              .filter( m => m.homeLocationId==storeId)
              .map( m => (
                <option key={m.id} value={m.id}>{m.lastName}, {m.firstName}</option>
              ))
            }
          </select>
          <br/>
          {
            false &&  <button type="submit" className="btn btn-primary" onClick={ (e) => {  this.handleChange(); }} >Select Manager</button>
          }
        </div>

    )

  }
}

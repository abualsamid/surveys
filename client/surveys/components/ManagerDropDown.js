import React, { Component, PropTypes } from 'react'

export default class ManagerDropDown extends Component {
  constructor(props) {
    super(props)
    this.handleChange=this.handleChange.bind(this)
  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }
  handleChange() {
    try {
      const { setManagerId} = this.props
      const m = this.managerId.value || this.managerId.options[0].value
      const c = this.managerId.options[this.managerId.selectedIndex||0].text
      console.log('sup o ', m, c)

      setManagerId(m, c)
      console.log('sup yo yo ', this.managerId)

    } catch(x) {
      console.log(x)
    }
    return false; // do not submit the form.
  }

  render() {
    const { storeId, managers, caption } = this.props
    return (
        <div className="form-group">
          <label>{caption}</label>

          <select className="form-control" ref={(managerId) => this.managerId=managerId} >
            {
              managers
              .filter( m => m.homeLocationId==storeId)
              .map( m => (
                <option key={m.id} value={m.id}>{m.lastName}, {m.firstName}</option>
              ))

            }


          </select>
          <br/>
          <button type="submit" className="btn btn-primary"
            onClick={ (e) => {  e.preventDefault(); this.handleChange(); }} >Select Manager</button>
        </div>

    )

  }
}

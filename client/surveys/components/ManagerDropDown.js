import React, { Component, PropTypes } from 'react'
import * as languageHelper  from '../../../common/helpers/language'

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
      const managerId = this.managerId.value || this.managerId.options[0].value
      const caption = this.managerId.options[this.managerId.selectedIndex||0].text
      setManagerId(managerId, caption)
    } catch(x) {
      console.log(x)
    }
    return false; // do not submit the form.
  }
  handleSubmit() {
    try {
      const { setManagerId} = this.props
      const managerId = this.managerId.value || this.managerId.options[0].value
      const caption = this.managerId.options[this.managerId.selectedIndex||0].text
      if(!managerId) {
        return false
      }
      setManagerId(managerId, caption)
    } catch(x) {
      console.log(x)
    }
    return false; // do not submit the form.
  }


  render() {
    const { storeId, managers, caption, language, showButton, selectText, filterZero } = this.props
    console.log('ManagerDropDown::render: ', storeId, managers)
    return (
        <div className="form-group">
          <label>{caption}</label>
          <select className="form-control" ref={(managerId) => this.managerId=managerId}
                  onChange={this.handleChange}
          >
            <option key={0} value="">{languageHelper.tr( selectText || "Select Manager", language)}</option>
            {
              managers
              .filter( (m => m.homeLocationId==storeId && (filterZero==false || m.id) ) )
              .sort()
              .map( m => (
                <option key={m.id} value={m.id}>{m.firstName} {m.lastName}</option>
              ))
            }
          </select>
          <br/>
          {
            showButton &&
            <button type="submit" className="btn btn-primary btn-block btn-lg"
              onClick={ (e) => {  e.preventDefault(); this.handleChange(); }} >
              {languageHelper.tr("Select Manager",language)}
            </button>
          }

        </div>

    )

  }
}

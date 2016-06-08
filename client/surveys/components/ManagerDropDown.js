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
      const m = this.managerId.value || this.managerId.options[0].value
      const c = this.managerId.options[this.managerId.selectedIndex||0].text

      if (!m) {
        return false;
      }
      setManagerId(m, c)

    } catch(x) {
      console.log(x)
    }
    return false; // do not submit the form.
  }

  render() {
    const { storeId, managers, caption, language } = this.props
    return (
        <div className="form-group">
          <label>{caption}</label>
          <select className="form-control" ref={(managerId) => this.managerId=managerId} >
            <option key={0} value="">{languageHelper.tr("Select Manager", language)}</option>
            {
              managers
              .filter( m => m.homeLocationId==storeId)
              .map( m => (
                <option key={m.id} value={m.id}>{m.lastName}, {m.firstName}</option>
              ))
            }
          </select>
          <br/>
          <button type="submit" className="btn btn-primary btn-block btn-lg"
            onClick={ (e) => {  e.preventDefault(); this.handleChange(); }} >
            {languageHelper.tr("Select Manager",language)}
          </button>
        </div>

    )

  }
}

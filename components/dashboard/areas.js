import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as languageHelper  from '../../helpers/language'
import * as api from '../../middleware/botengine'

function addArea(newArea) {
  newArea = newArea.trim()

  console.log("dispatching area action...", newArea)

  // optimistic caching. push to server, fire and forget.
  api
  .addArea("leye", "2016", newArea)
  .then(function(good) {
    console.log("all is good.")
  });

  return {
    type: "ADD_AREA",
    area: newArea
  }
}


class Areas extends Component {
  constructor(props) {
    super(props)
    this.state = {areas: props.areas || []}
  }
  handleClick(e) {
    e.preventDefault();
    const { addArea } = this.props
    addArea(this.area.value)
    this.area.value=""
    // this.props.callBack(this.area.value)
  }
  componentDidMount() {
    var self = this;
    api.getAreas("leye", "2016").then(function(areas) {
      self.setState({areas: areas})
    })
  }
  render() {
    const {language} = this.props
    return (
      <div className="col-md-12">
        <div>
          <form className="form-horizontal" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>{languageHelper.tr("Areas", language)}</label>
              <input type="text" className="form-control" ref={(area) => this.area = area} />
            </div>
            <button type="submit"  className="btn btn-primary btn-lg" onClick={this.handleClick.bind(this)}>
              {languageHelper.tr("Add Area",language)}
            </button>
          </form>
          <br/>
          <br/>
        </div>
        <div>
          <h3>Current List of Areas</h3>
          <ul>
            {this.state.areas.map( (one) =>  <li>{one}</li> )}
          </ul>
        </div>
        <br/>
      </div>
    )
  }
}

export default connect(
  (state) => (
    {
      token: state.login.token,
      email: state.login.email,
      language: state.login.language || "en",
      areas: state.admin.areas,
      locations: state.admin.locations
    }

  ),
  {
    addArea
  }
)(Areas)

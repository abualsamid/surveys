import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as api from '../middleware/botengine'

import Areas from '../components/dashboard/areas'

class Admin extends Component {
    constructor(props) {
      super(props)
      this.state = { DashboarData: {}};
    }
    addArea(areaName) {
      console.log("adding area ", areaName)
    }


    render() {
      const {email, token} = this.props

      return (
        <div>
          <h2>
            Admin
          </h2>

          <br/>
          <br/>
          <div>
            <Areas  language={this.props.language} />
          </div>
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

  )

)(Admin)

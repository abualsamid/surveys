import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class NotFound extends Component {
  render() {
    return <div>
      <h2>
        What can i say dude?
      </h2>
    </div>
  }
}

export default connect(
  (state) => (
    {
      token: state.login.token || "",
      email: state.login.email ||"",
      language: state.login.language || "en",
    }

  )

)(NotFound)

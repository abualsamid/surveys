import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Container extends Component {
  render() {
    return (
      <div>The survey you are looking for is not found or is closed. </div>
    )
  }
}

export default connect(
  (state) => ({
    language: state.login.language,
  }),
  {
  }
)(Container)

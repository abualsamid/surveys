import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Footer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {language} = this.props
    return(
      <div className="col-md-12 text-center">
        {languageHelper.tr("disclaimer", language)}
      </div>
    )
  }
}

export default connect(
  (state)=>({language: state.login.language || "en"})
)(Footer)

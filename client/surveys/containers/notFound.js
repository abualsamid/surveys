import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as languageHelper  from '../../../common/helpers/language'

class Container extends Component {
  render() {
    return (
      <div>
        <h3>
          { languageHelper.tr("The survey you are looking for is not found or is closed.",this.props.language)}

        </h3>
      </div>
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

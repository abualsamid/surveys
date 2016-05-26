import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as languageHelper  from '../../../common/helpers/language'

class Container extends Component {
    render() {
      const {language} = this.props
      return   (
        <div>
          {
            languageHelper.tr("Thank you for participating. Your feedback is appreciated.", language)
          }
        </div>
      )
    }
}

export default connect(
  (state) => ({
    language: state.login.language,
  })
)(Container)

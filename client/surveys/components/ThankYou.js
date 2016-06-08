import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as languageHelper  from '../../../common/helpers/language'

class Container extends Component {
    render() {
      const {language} = this.props
      return   (
        <div>
          <h3>
            {
              languageHelper.tr("Thank you for participating. Your feedback is appreciated.", language)
            }  
          </h3>

        </div>
      )
    }
}

export default connect(
  (state) => ({
    language: state.login.language,
  })
)(Container)

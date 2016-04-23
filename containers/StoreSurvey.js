import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import  StoreSurvey from '../components/StoreSurvey'
import { submitStoreAnswers } from '../actions'

class Container extends Component {
  constructor(props) {
    super(props)
    console.log("Container props: ", props )
  }

  handleSkip() {
    console.log("moving on...")
    browserHistory.push("/ManagerSurvey")
  }
  handleSubmit(answers) {
    const { dispatch } = this.props
    const { storeId } = this.props.params

    console.log("submit n next ", answers)
    console.log("this.props ", this.props)
    dispatch(submitStoreAnswers(storeId, answers))
    this.handleSkip()
  }

  handleCancel() {
    browserHistory.push("/")
  }

  render() {

    const {language, handleSubmit, handleSkip} = this.props
    return(
      <div>
        <StoreSurvey language={language} handleSubmit={this.handleSubmit.bind(this)}
          handleSkip={this.handleSkip.bind(this)} handleCancel={this.handleCancel.bind(this)} />
      </div>
    )
  }
}


export default connect(
  (state) => ({
    language: state.login.language
  })
)(Container)

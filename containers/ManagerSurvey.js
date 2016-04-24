import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import  ManagerSurvey from '../components/ManagerSurvey'
import { submitManagerAnswers } from '../actions'

class Container extends Component {
  constructor(props) {
    super(props)
    this.handleDone = this.handleDone.bind(this)
  }

  handleCancel() {
    browserHistory.push("/")
  }
  handleDone(answers) {
    const {dispatch} = this.props
    console.log("handleDone => ", answers)
    dispatch(submitManagerAnswers(answers))
    this.handleCancel()
  }
  handleSubmit(answers) {
    const {dispatch} = this.props
    dispatch(submitManagerAnswers(answers))

  }

  render() {
    return(
      <div>
        <h2>Manager Survey </h2>
        <ManagerSurvey
          handleCancel={this.handleCancel.bind(this)}
          handleDone={this.handleDone}
          managers = {this.props.managers}
          storeId = {this.props.storeId}
          storeCaption = {this.props.storeCaption}
           />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    language: state.login.language,
    managers: state.admin.managers ||[],
    storeId : state.survey.storeId ||"",
    storeCaption: state.survey.storeCaption ||""
  })
)(Container)

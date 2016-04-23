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
    const {language} = this.props
    return(
      <div>
        <h2>Manager Survey </h2>
        <ManagerSurvey language={language} handleCancel={this.handleCancel.bind(this)} handleDone={this.handleDone} />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    language: state.login.language
  })
)(Container)

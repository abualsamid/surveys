import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import  ManagerSurvey from '../components/ManagerSurvey'
import { submitManagerAnswers } from '../actions'
import * as languageHelper  from '../helpers/language'

class Container extends Component {
  constructor(props) {
    super(props)
    this.handleDone = this.handleDone.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {managers: this.props.managers.filter( (m) => m.storeId==props.storeId )}
  }

  handleCancel() {
    browserHistory.push("/")
  }
  handleDone(managerId, answers, stayInPlace) {
    const {submitManagerAnswers, reviewId, storeId} = this.props
    submitManagerAnswers(reviewId, storeId, {managerId: managerId, answers: answers})
    if (stayInPlace) {
      let m = this.state.managers.filter( one => one.id !== managerId)
      if (m.length==0) {
        setTimeout(this.handleCancel(), 10)
      } else {
        this.setState({managers: m})
        window.scrollTo(0, 0)
      }
    } else {
      setTimeout(this.handleCancel(), 10)
    }
  }
  handleSubmit(answers) {

    const {submitManagerAnswers, reviewId, storeId} = this.props
    submitManagerAnswers(reviewId, storeId, {managerId: managerId, answers: answers})

  }

  render() {
    return(
      <div>

        <ManagerSurvey
          handleCancel={this.handleCancel}
          handleDone={this.handleDone}
          handleSubmit={this.handleSubmit}
          managers = {this.state.managers}
          storeId = {this.props.storeId}
          storeCaption = {this.props.storeCaption}
          language={this.props.language}
           />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    language: state.login.language,
    managers: state.admin.managers ||[],
    reviewId: state.admin.reviewId,
    storeId : state.survey.storeId ||"",
    storeCaption: state.survey.storeCaption ||""
  }),
  {
    submitManagerAnswers
  }
)(Container)

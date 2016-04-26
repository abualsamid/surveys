import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import  StoreSurvey from '../components/StoreSurvey'
import { submitStoreAnswers } from '../actions'

class Container extends Component {
  constructor(props) {
    super(props)
  }

  handleSkip() {
    browserHistory.push("/ManagerSurvey")
  }
  handleSubmit(answers) {
    const { dispatch, reviewId } = this.props
    const { storeId } = this.props.params
    console.log("dispatching to submit store answers ", answers)
    dispatch(submitStoreAnswers(reviewId, storeId, answers))
    this.handleSkip()
  }

  handleCancel() {
    browserHistory.push("/")
  }

  render() {

    const {language, storeId, storeCaption} = this.props
    return(
      <div>
        <StoreSurvey language={language} handleSubmit={this.handleSubmit.bind(this)}
          handleSkip={this.handleSkip.bind(this)} handleCancel={this.handleCancel.bind(this)}
          storeId={storeId}
          storeCaption={storeCaption}
        />
      </div>
    )
  }
}


export default connect(
  (state) => ({
    language: state.login.language,
    reviewId: state.admin.reviewId,
    storeId: state.survey.storeId || "",
    storeCaption: state.survey.storeCaption || ("hmmm " + state.survey.storeId)
  })
)(Container)

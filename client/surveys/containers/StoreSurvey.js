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
    console.log('about to dispatch submitting ... ', answers)
    const { dispatch, storeId } = this.props
    dispatch(submitStoreAnswers( storeId,0, answers))
    this.handleSkip()
  }

  handleCancel() {
    browserHistory.push("/ThankYou")
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
    campaignId: state.admin.campaignId,
    customerId: state.admin.customerId,
    storeId: state.admin.locationId || state.survey.storeId || 0,
    storeCaption: state.survey.storeCaption || ("hmmm " + state.survey.storeId), 
    code: state.admin.Code,
    surveyId: state.admin.surveyId
  })
)(Container)

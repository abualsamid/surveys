import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import  StoreSurvey from '../components/StoreSurvey'
import { submitStoreAnswers } from '../actions'
import { browserHistory } from 'react-router'
import * as api from '../../../common/middleware/botengine'
import * as actions  from '../actions'

class Container extends Component {
  constructor(props) {
    super(props)
  }

  handleSkip() {
    browserHistory.push("/ManagerSurvey")
  }
  handleSubmit(answers) {
    const {  submitStoreAnswers, storeId } = this.props
    for(var index in answers) {
      let a = answers[index]
      if (!a.value && !a.choice && !a.isAnswered) {
        alert("Please answer all questions in order to proceed.");
        console.log('failed to validate ',index, a)
        return false;
      }
    }
    console.log('submitting store answers ', answers)
    submitStoreAnswers( storeId,0, answers)
    this.handleSkip()
  }

  componentDidMount() {
    const self = this
    try {
      const any = [{firstName:" -- Any ", lastName:" Manager -- ", id: 0, homeLocationId: self.props.storeId}]
      api.getManagers(this.props.customerId, self.props.storeId)
      .then(function(managers) {
        self.props.loadedManagers(any.concat(managers.filter(m => m.homeLocationId==self.props.storeId)))
      })
      .catch(function(doh) {
        console.log(doh)
      })

    } catch(x) {
      console.log('x...', x)
    }
  }
  handleCancel() {
    browserHistory.push("/ThankYou")
  }



  render() {

    const {language, storeId, storeCaption} = this.props
    return(
      <div>
        <StoreSurvey handleSubmit={this.handleSubmit.bind(this)}
          handleSkip={this.handleSkip.bind(this)} handleCancel={this.handleCancel.bind(this)}
          {...this.props}
        />
      </div>
    )
  }
}


export default connect(
  (state, ownProps ) => ({
    language: state.login.language || "en",
    campaignId: state.admin.campaignId || 1,
    customerId: state.admin.customerId || 1,
    storeId: state.admin.locationId || state.survey.storeId || ownProps.params.storeId,
    storeCaption: state.survey.storeCaption || state.admin.locationId || state.survey.storeId || ownProps.params.storeId,
    code: state.admin.Code,
    surveyId: state.admin.surveyId,
    managers: state.admin.managers || []
  }),
  actions

)(Container)

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import  ManagerSurvey from '../components/ManagerSurvey'
import { submitStoreAnswers } from '../actions'

class Container extends Component {
  constructor(props) {
    super(props)
    this.handleDone = this.handleDone.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.state = {managers: this.props.managers.filter( (m) => m.homeLocationId==props.storeId )}
  }

  handleCancel() {
    browserHistory.push("/ThankYou")
  }



  handleDone(managerId, answers, stayInPlace) {

    const {submitStoreAnswers,  storeId} = this.props
    submitStoreAnswers( storeId,managerId, answers)


    if (stayInPlace) {
      let m = this.state.managers.filter( one => one.id != managerId)
      if (m.length==0) {
        setTimeout(this.handleCancel, 10)
      } else {
        this.setState({managers: m})
        window.scrollTo(0, 0)
      }
    } else {
      setTimeout(this.handleCancel, 10)
    }
  }

  render() {
    return(
      <div className="row">
        <ManagerSurvey
          handleCancel={this.handleCancel}
          handleDone={this.handleDone}
          managers = {this.state.managers}
          storeId = {this.props.storeId}
          storeCaption = {this.props.storeCaption}
          language={this.props.language}
           />
         <div>
           <br/>
           <br/>
         </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    language: state.login.language,
    managers: state.admin.managers ||[],
    campaignId: state.admin.campaignId,
    storeId : state.survey.storeId ||0 ,
    storeCaption: state.survey.storeCaption ||""
  }),
  {
    submitStoreAnswers
  }
)(Container)

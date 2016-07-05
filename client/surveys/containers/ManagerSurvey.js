import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import  ManagerSurvey from '../components/ManagerSurvey'
import { submitStoreAnswers } from '../actions'
import * as api from '../../../common/middleware/botengine'

class Container extends Component {
  constructor(props) {
    super(props)
    console.log('incoming props are: ', props)
    this.handleDone = this.handleDone.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.state = {managers: this.props.managers }
  }

  handleCancel() {
    browserHistory.push("/ThankYou")
  }

  componentDidMount() {
    const self = this;
    if (!this.state.managers || !this.state.managers.length) {
      api.getManagers(this.props.customerId, this.props.storeId)
      .then(function(managers) {
        self.setState({managers: managers.filter( (m) => (m.homeLocationId==props.storeId) && m.id )})
      })
      .catch(function(doh) {
        console.log(doh)
      })
    }

    // window.onbeforeunload = function(e) {
    //   console.log('triggering  the window unload event')
    //   var dialogText = 'Please do not use browser navigation buttons till you have completed the survey.';
    //   e.returnValue = dialogText;
    //   return dialogText;
    // };

  }

  handleDone(managerId, answers, stayInPlace) {

    const {submitStoreAnswers,  storeId} = this.props
    submitStoreAnswers( storeId,managerId, answers)


    if (stayInPlace) {
      let m = this.state.managers.filter( one => one.id != managerId)
      console.log('filtered managers and now have: ', m)
      if (m.length==0) {
        setTimeout(this.handleCancel, 10)
      } else {
        console.log('setting state managers to ', m)
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
          language= {this.props.language}
          customerId= {this.props.customerId}
          campaignId= {this.props.campaignId}
          storeId = {this.props.storeId}
          storeCaption= {this.props.storeCaption}
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
    customerId: state.admin.customerId,
    campaignId: state.admin.campaignId,
    storeId : state.survey.storeId ||0 ,
    storeCaption: state.survey.storeCaption ||""
  }),
  {
    submitStoreAnswers
  }
)(Container)

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import  ManagerSurvey from '../components/ManagerSurvey'
import { submitStoreAnswers } from '../actions'
import * as api from '../../../common/middleware/botengine'

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

  componentDidMount() {
    const self = this;
    api.getManagers(this.props.customerId, this.props.storeId)
    .then(function(managers) {
      self.setState({managers: managers})
    })
    .catch(function(doh) {
      console.log(doh)
    })

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
          {...this.props}
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

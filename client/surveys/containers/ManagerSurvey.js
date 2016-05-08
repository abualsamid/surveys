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
      console.log("staying in place, filtering out ", managerId , " from ", this.state.managers)
      let m = this.state.managers.filter( one => one.id != managerId)
      if (m.length==0) {
        console.log("done with my peeps...")
        setTimeout(this.handleCancel, 10)
      } else {
        console.log("few more peeps? ", m)
        this.setState({managers: m})
        window.scrollTo(0, 0)
      }
    } else {
      console.log("adios.")
      setTimeout(this.handleCancel, 10)
    }
  }

  render() {
    return(
      <div>
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

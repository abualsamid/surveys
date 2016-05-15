import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as api from '../../../common/middleware/botengine'
import ChooseLanguage from './home/chooseLanguage'

import * as actionCreators from '../actions'



class Home extends Component {

  constructor(props) {
    super(props)
    this.state = { step: 1, language: "" , answers: {}, storeCode: "", manager: "", period: "2016"}
  }


  componentDidMount() {
    const self = this;
    const {loadedAreas, loadedStores, loadedManagers, setReviewId} = this.props;

    console.log("loading admin state")
    api.ensureReview("Manager Review","2016")
    .then(function(reviewId) {
      setReviewId(reviewId)
    })
    .catch(function(doh){
      console.log(doh)
      setReviewId("")
    })

    api.getAreas("")
    .then(function(areas) {
      loadedAreas(areas)
    })
    .catch(function(doh) {
      console.log(doh)
      loadedAreas([])
    })

    api.getStores("leye")
    .then(function(stores) {
      loadedStores(stores)
    })
    .catch(function(doh) {
      console.log(doh)
      loadedStores([])
    })

    api.getManagers()
    .then(function(managers) {
      loadedManagers(managers)
    })
    .catch(function(doh) {
      console.log(doh)
      loadedManagers([])
    })
  }




  Done(next) {
    console.log("Submitting ", this.state)
    const self = this

    api
    .saveAnswers(this.state)
    .then(
      self.setState({step:next})
    )


  }
  OneMore(next) {
    this.setState({step: next, answers: {}})
  }
  Cancel(next) {
    this.setState({step: next, answers: {}, language:""})
  }

  validateCode(storeCode) {
    this.setState({storeCode: storeCode, step: 3})
  }


  render() {
    return (
      <div>
        <ChooseLanguage />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    language:  "en",
    areas: state.admin.areas || [],
    storesList: state.admin.stores || []
  }
}

export default connect(mapStateToProps,actionCreators)(Home)

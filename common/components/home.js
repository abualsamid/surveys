import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as api from '../middleware/botengine'
import StoresDropDown from './StoresDropDown'
import ChooseLanguage from './home/chooseLanguage'
import Footer from './home/footer'

if ( 'undefined' !== typeof window ) {
	const styles=require( '../../client/assets/css/home.css' );
}

import * as languageHelper  from '../helpers/language'

import * as actionCreators from '../actions/dashboard.js'





class Body extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {step, language} = this.props

    switch(step) {
      case 1:
          return  (
            <div className="container text-center">
              <div className="row"><ChooseLanguage /></div>
            </div>
          )
        break;
      case 2:
          return  (
            <div className="container text-center">
              <div className="row">
                <div className="col-md-12">
                  {languageHelper.tr("This is an anonymous survey. All questions are optional.",language)}
                  <br/>
                  <br/>
                </div>
              </div>
              <div className="row">
              </div>
            </div>
          )
        break;

      case 99:
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                languageHelper.tr("Thank you for submitting the survey. You may now close this window.", languae)
              </div>
            </div>
          </div>
        )
      default:
          return  (
            <div className="container text-center">
              <div className="row"><ChooseLanguage/></div>
            </div>
          )
        break;
    }
  }
}


class Home extends Component {

  constructor(props) {
    super(props)
    this.state = { step: 1, language: "" , answers: {}, storeCode: "", manager: "", period: "2016"}
  }


  componentDidMount() {
    const self = this;
    const {loadedAreas, loadedStores, loadedManagers, setReviewId} = this.props;

    api.ensureReview("2016 Manager Survey","2016")
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
    token: state.login.token,
    email: state.login.email,
    language: state.login.language || "en",
    areas: state.admin.areas || [],
    storesList: state.admin.stores || []
  }
}

export default connect(mapStateToProps,actionCreators)(Home)

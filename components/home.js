import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as api from '../middleware/botengine'
import StoresDropDown from './StoresDropDown'
import ChooseLanguage from './home/chooseLanguage'
import Footer from './home/footer'
const styles = require("../css/home.css");

import * as languageHelper  from '../helpers/language'

import * as actionCreators from '../actions/index.js'





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
      case 3:
          return (
            <div>
              <div className="container">
                <div className="row">{this.TakeManagerSurvey()}</div>
              </div>
              <hr/>
              <div className="container">
                <div className="row">{this.TakeGeneralSurvey()}</div>
              </div>
              <br/>
                <br/>
              <hr/>
              <div className="container text-center">
                <button type="submit" className="btn btn-success btn-lg" onClick={this.Done.bind(this,99)}>
                  {languageHelper.tr("Submit - I am done", language)}</button>
                  <span>&nbsp; &nbsp; &nbsp;</span>
                <button type="submit" className="btn btn-Info btn-lg" onClick={this.OneMore.bind(this,1)}>
                  {languageHelper.tr("Submit - and review another manager", language)}</button>
                <span>&nbsp; &nbsp; &nbsp;</span>
                <button type="submit" className="btn btn-danger btn-lg" onClick={this.Cancel.bind(this,1)}>
                {languageHelper.tr("Cancel", language)}
                </button>
              </div>
              <br/>
              <hr/>
              <div className="container text-center">
                <br/>
                <div className="row">
                  <Footer language={language} />
                </div>
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
    console.log("props are: ", this.props)
    const {loadedAreas, loadedStores} = this.props;
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
  }


  dropDownQuestion(id, Q) {
    const ex = languageHelper.tr("5")
    const g = languageHelper.tr("6")
    const f = languageHelper.tr("7")
    const n = languageHelper.tr("8")
    const ns = languageHelper.tr("9")

    function v(id) {
        try {
          return this.state.answers[id] || "0"
        } catch(x) {
          console.log(x);
          return "0";
        }
    }
    function selectAnswer(event) {
      try {

        var a = this.state.answers;
        a[event.target.id] = event.target.value;
        this.setState({answers: a})

      } catch(x) {
        console.log('doh! selecting answer: ', x)
      }
    }
    return (
      <div className="form-group">
        <label>{languageHelper.tr(Q)}</label>
          <select className="form-control" name={id} id={id} value={v.bind(this,id)()} onChange={selectAnswer.bind(this)}>
            <option value="0"> ({languageHelper.tr("Please Select")})</option>
            <option value="5">5 - {ex}</option>
            <option value="4">4 - {g} </option>
            <option value="3">3 - {f} </option>
            <option value="2">2 - {n} </option>
            <option value="1">1 - {ns} </option>
          </select>
      </div>
    )
  }

  dropDownManager(Q,managers) {

    function v() {
        try {
          return this.state.manager || ""
        } catch(x) {
          console.log(x);
          return "0";
        }
    }
    function selectAnswer(event) {
      try {
        this.setState({manager: event.target.value})
      } catch(x) {
        console.log('doh! selecting manager: ', x)
      }
    }
    let options=[]
    for(var i=0;i<managers.length;i++) {
      var o = managers[i]
      options.push(<option key={i} value={o.key}>{o.value}</option>)
    }
    return (
      <div className="form-group">
        <label>{languageHelper.tr(Q)}</label>
          <select required defaultValue="" className="form-control"  value={v.bind(this)()} onChange={selectAnswer.bind(this)}>
            <option value="" >({languageHelper.tr("Please Select")})</option>
            {options}
          </select>
      </div>
    )
  }

  CheckBoxQuestion(id,q) {
    function flipBox(event) {
      var a = this.state.answers;
      a[event.target.id] = event.target.checked==undefined ? false : event.target.checked;
      this.setState({answers: a})
    }
    function v(id) {
      return this.state.answers[id] || false
    }
    return(
      <div className="checkbox">
        <label>
          <input type="checkbox" name={id} id={id} key={id} checked={v.bind(this,id)()} onChange={flipBox.bind(this)} />{this.tr(q)}
        </label>
      </div>
    )
  }


  textQuestion(id,i,q) {
    function change(event) {
      var a = this.state.answers;
      a[event.target.id] = event.target.value==undefined ? "" : event.target.value;
      this.setState({answers: a})
    }

    return (
      <div className="form-group">
        <label><strong>{i}. </strong> {this.tr(q)}</label>
        <textarea className="form-control" name={id} id={id}
          defaultValue="" value={this.state.answers[id] || ""}
          onChange={change.bind(this)}></textarea>
      </div>
    )
  }

  TakeGeneralSurvey() {
    return (
      <div className="col-md-12">
        <div>
          <h3>{this.tr("In General")}</h3>
          <form>
            {this.CheckBoxQuestion("g1","Our work environment is positive")}
            {this.CheckBoxQuestion("g2","The communication is clear and effective")}
            {this.CheckBoxQuestion("g3","We have the tools/supplies we need to do our job")}
            {this.CheckBoxQuestion("g4","My training was thorough and effective")}
            {this.CheckBoxQuestion("g5","I have opportunities to learn and grow at work")}
          </form>
        </div>
        <hr/>
        <div>
          {this.textQuestion("g6",1,"What do you like most about working for LEYE?")}
          {this.textQuestion("g7",2,"What do you like least about working for LEYE?")}
          {this.textQuestion("g8",3,"If you need something, who is the person you are most comfortable going to?")}
          {this.textQuestion("g9",4,"Have you noticed any improvements over the past 6 months to one year? Explain your answer.")}
        </div>
      </div>
    )
  }
  TakeManagerSurvey() {
    let managers = [ {key: "Manager 1", value:"Manager 1"},{key: "Manager 2", value:"Manager 2"}, {key: "Manager 3", value:"Manager 3"} ]

    return (
      <div className="col-md-12">
        <div className="text-center">
          <h2>Big Bowl - Downtown Chicago</h2>

        </div>
        <form>
          {this.dropDownManager("Manager's Name", managers)}

          {this.dropDownQuestion("m1","Friendly and easy to approach")}

          {this.dropDownQuestion("m2","Treats all employees equally and fairly")}

          {this.dropDownQuestion("m3","Listens to what we have to say")}
          {this.dropDownQuestion("m4","Cares about us personally and professionally appreciates us")}
          {this.dropDownQuestion("m5","Backs and supports us")}
          {this.dropDownQuestion("m6","Treats us with dignity and respect")}
          {this.dropDownQuestion("m7","Is an effective teacher, coach and manager")}
          {this.dropDownQuestion("m8","Gives clear directions")}
          {this.dropDownQuestion("m9","Keeps us informed")}
          {this.dropDownQuestion("m10","Motivates us to go good job")}
          {this.dropDownQuestion("m11","Rewards good performance")}
          {this.dropDownQuestion("m12","Handles issues and people well")}
          {this.dropDownQuestion("m13","Follows through on promises")}

        </form>
      </div>
    )
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

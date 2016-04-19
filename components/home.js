import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { API_ROOT } from '../middleware/botengine'

const rawFaq = require("../templates/faq.html");
const whatWeDo = require("../templates/whatwedo.html");
const styles = require("../css/home.css");

import * as languageHelper  from '../helpers/language'


class EnterCode extends Component {
  constructor(props) {
    super(props)
  }
  handleClick(e) {
    e.preventDefault();
    this.props.callBack(this.storeCode.value, this.location.value)
  }
  render() {
    var language = this.props.language
    return (
      <div className="col-md-12 text-center">
        <div>
          <br/>
          <span style={{fontWeight: "bold", fontSize: "large"}}> { languageHelper.tr("Please select your location",language)} </span>
          <br/>
          <br/>
          <select ref={(location) => this.location = location?location.value:""} >
            <option value="">{ languageHelper.tr("Please select your location",language)}</option>
            <optgroup label="Chicago Area - IL">
              <option>
                Antico Posto
              </option>
              <option>
                Big Bowl
              </option>
            </optgroup>

            <optgroup label="Minneapolis - St. Paul Area, MN">
              <option>
                Big Bowl
              </option>
              <option>
                Magic Pan Crepe Stand
              </option>
              <option>
                Tucci Italian
              </option>
            </optgroup>
          </select>
          <br/>
        </div>
        <div>
          <br/>
          <span style={{fontWeight: "bold", fontSize: "large"}}> { languageHelper.tr("Please enter the code assigned to you",language)} </span>
          <br/>
          <br/>
          <input type="text"  ref={(ref) => this.storeCode = ref } ></input>
        </div>
        <div>
          <br/>
          <br/>
          <button className="btn btn-primary btn-lg" onClick={this.handleClick.bind(this)}>
            { languageHelper.tr("4",language)}
          </button>
        </div>
      </div>
    )
  }
}

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = { step: 1, language: "" , answers: {}, storeCode: "", manager: "", client: "LEYE", period: "2016"};
  }


  trOne(code, language) {
    try {
      if (!languageHelper.languageText[code]) {
        return code;
      }
      if (Array.isArray(languageHelper.languageText[code][language])) {
        return languageHelper.languageText[code][language].join(languageHelper.languageText[code].sep || "")
      } else {
        return  languageHelper.languageText[code][language]
      }

    } catch(x) {
      return "n/a!";
    }
  }

  tr(code, language) {
    if (!code) {
      return "";
    }
    if(!language) {
      language=""
      try {
        language = this.state.language;
      } catch(x){
        console.log("setting language ", x)
      }
    }
    try {
      return language=="" ?
        languageHelper.languageText[code]["en"] + ( languageHelper.languageText[code].sep || " / " ) + languageHelper.languageText[code]["es"]
        :
        languageHelper.trOne(code, language)

    } catch(x) {
      console.log(x)
      return "n/a." + " " + x;
    }
  }


  chooseLanguage(language) {
      this.setState({step: 2, language: language})
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





  footer() {
    return(
      <div className="col-md-12 text-center">
        {this.tr("disclaimer")}
      </div>
    )
  }

  Logo() {
    return (

      <div className="col-md-12 text-center">
        <div>
          <button className="btn btn-primary btn-lg" onClick={this.chooseLanguage.bind(this,"en")}> English </button>
          <span>&nbsp; &nbsp; &nbsp;</span>
          <button className="btn btn-primary btn-lg" onClick={this.chooseLanguage.bind(this,"es")}> Español </button>

        </div>
      </div>
    )
  }
  Done(next) {
    console.log("Submitting ", this.state)
    fetch(API_ROOT + "api/v1/survey/saveAnswers",{
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log("received back: ", json)
    }).catch(function(ex) {
      console.log("failed to post: ", ex)
    })
    this.setState({step: next})
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

  TheBody() {


    switch(this.state.step) {
      case 1:
          return  (
            <div className="container text-center">
              <div className="row">{this.Logo()}</div>
            </div>
          )
        break;
      case 2:
          return  (
            <div className="container text-center">
              <div className="row">
                <div className="col-md-12">
                  {languageHelper.tr("This is an anonymous survey. All questions are optional.",this.state.language)}
                  <br/>
                  <br/>
                </div>
              </div>
              <div className="row">
                <EnterCode language={this.state.language} callBack={this.validateCode.bind(this)} />
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
                <button type="submit" className="btn btn-success btn-lg" onClick={this.Done.bind(this,99)}>{this.tr("Submit - I am done")}</button>
                  <span>&nbsp; &nbsp; &nbsp;</span>
                <button type="submit" className="btn btn-Info btn-lg" onClick={this.OneMore.bind(this,1)}>{this.tr("Submit - and review another manager")}</button>
                <span>&nbsp; &nbsp; &nbsp;</span>
                <button type="submit" className="btn btn-danger btn-lg" onClick={this.Cancel.bind(this,1)}>
                {this.tr("Cancel")}
                </button>
              </div>
              <br/>
              <hr/>
              <div className="container text-center">
                <br/>
                <div className="row">{this.footer()}</div>
              </div>
            </div>

          )
        break;
      case 99:
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                Thank you for submitting the survey. You may now close this window.
              </div>
            </div>
          </div>
        )
      default:
          return  (
            <div className="container text-center">
              <div className="row">{this.Logo()}</div>
            </div>
          )
        break;
    }

  }

  header() {
    if (this.state.step > 10 ) {
      return null
    }
    return (
      <header className="hero-section container {styles.topStyle}" visible={this.state.step!=4} >
        <div className="row">
          <div className="col-md-12">
            <h2>
              {
                this.tr.bind(this,2)()
              }
            </h2>
            <br/>
            <br/>
            <div style={{whiteSpace: "pre-line"}}>
              {
                this.tr.bind(this,3)()
              }
            </div>
            <div>
              <br/>
            </div>
          </div>
        </div>
        <hr/>
        <br/>

      </header>
    )
  }
  display() {
    return (
      <div>
        {this.header()}
        <section className="container">
          {this.TheBody()}
        </section>
      </div>

    )
  }
  render() {
    return (
      <div>
        {this.display()}
        <br/>
      </div>
    )
  }
}

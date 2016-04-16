import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

const rawFaq = require("../templates/faq.html");
const whatWeDo = require("../templates/whatwedo.html");
const styles = require("../css/home.css")







export default class Home extends Component {
  constructor(props) {
      super(props)
      this.state = { step: 1, language: "en" };
    }

  chooseLanguage(language) {
      console.log("choosing ", language );
      this.setState({step: 2, language: language})
  }
  dropDownQuestion(Q) {
    const ex = this.tr(5)
    const g = this.tr(6)
    const f = this.tr(7)
    const n = this.tr(8)
    const ns = this.tr(9)

    return (
      <div className="form-group">
        <label>{Q}</label>
          <select className="form-control">
            <option value="0"> (Please Select)</option>
            <option value="5">5 - {ex}</option>
            <option value="4">4 - {g} </option>
            <option value="3">3 - {f} </option>
            <option value="2">2 - {n} </option>
            <option value="1">1 - {ns} </option>
          </select>
      </div>
    )
  }
  CheckBoxQuestion(Q) {
    return(
      <div className="checkbox">
        <label>
          <input type="checkbox" />{Q}
        </label>
      </div>
    )
  }
  textQuestion(i,q) {
    return (
      <div className="form-group">
        <label><strong>{i}. </strong> {q}</label>
        <textarea className="form-control"></textarea>
      </div>
    )
  }
  TakeGeneralSurvey() {
    return (
      <div className="col-md-12">
        <div>
          <h3>In General</h3>
          <form>
            {this.CheckBoxQuestion("Our work environment is positive")}
            {this.CheckBoxQuestion("The communication is clear and effective")}
            {this.CheckBoxQuestion("We have the tools/supplies we need to do our job")}
            {this.CheckBoxQuestion("My training was thorough and effective")}
            {this.CheckBoxQuestion("I have opportunities to learn and grow at work")}
          </form>
        </div>
        <hr/>
        <div>
          {this.textQuestion(1,"What do you like most about working for LEYE?")}
          {this.textQuestion(2,"What do you like least about working for LEYE?")}
          {this.textQuestion(3,"If you need something, who is the person you are most comfortable going to?")}
          {this.textQuestion(4,"Have you noticed any improvements over the past 6 months to one year? Explain your answer.")}
        </div>
      </div>
    )
  }
  TakeManagerSurvey() {
    return (
      <div className="col-md-12">
        <div className="text-center">
          <h2>Big Bowl - Downtown Chicago</h2>

        </div>
        <form>
          <div className="form-group">
            <label>Manager Name</label>
            <select className="form-control">
              <option>Manager 1</option>
                <option>Manager 2</option>
              <option>Manager 3</option>
            </select>
          </div>
          {this.dropDownQuestion("Friendly and easy to approach")}

          {this.dropDownQuestion("Treats all employees equally and fairly")}

          {this.dropDownQuestion("Listens to what we have to say")}
          {this.dropDownQuestion("Cares about us personally and professionally appreciates us")}
          {this.dropDownQuestion("Backs and supports us")}
          {this.dropDownQuestion("Treats us with dignity and respect")}
          {this.dropDownQuestion("Is an effective teacher, coach and manager")}
          {this.dropDownQuestion("Gives clear directions")}
          {this.dropDownQuestion("Keeps us informed")}
          {this.dropDownQuestion("Motivates us to go good job")}
          {this.dropDownQuestion("Rewards good performance")}
          {this.dropDownQuestion("Handles issues and people well")}
          {this.dropDownQuestion("Follows through on promises")}



        </form>

      </div>
    )
  }

  validateCode() {
    this.setState({step:3})
  }
  tr(code) {
    switch(code) {
      case 0:
        return this.state.language=="en" ?
          "This is an anonymous survey. All questions are optional." :
          "Esta es una encuesta anónima . Todas las preguntas son opcionales .";
      case 1:
        return this.state.language=="en" ?
          "Please enter the code assigned to you":
          "Por favor, introduzca el código asignado a usted";
      case 2:
        return this.state.language=="en" ?
        "EMPLOYEE SUREY FOR LEYE EMPLOYEES":
        "ENCUESTA PARA EMPLEADOS LEYE";
      case 3: return this.state.language=="en"?
          "Please take a moment to fill this out. Your feedback is important to us. We welcome both positive feedback and areas where we can improve. Your response to this survey will be kept anonymous and confidential." :
          "Por favor, tome un momento para liener este documento. Su opinion es importante para nosotros. Queremos saber donde estamon bien y done podemos mejorar. La participacion en esta encuesta es anonima y confidential.";
      case 4: return this.state.language=="en"?"Continue" : "Continuar";
      case 5: return this.state.language=="en"?"Excellent" : "Excelente";
      case 6: return this.state.language=="en"?"Good" : "Bueno";
      case 7: return this.state.language=="en"?"Fair" : "Mas o Menos";
      case 8: return this.state.language=="en"?"Needs Improvement" : "Necesita Mejorar";
      case 9: return this.state.language=="en"?"Needs Significant Improvement" : "Necesita Mejorar Mucho";
    }
  }
  EnterCode() {
    return (
      <div className="col-md-12 text-center">
        <div>
          {this.tr.bind(this,0)()}
          <br/>
          <br/>
        </div>
        <div>
          <br/>
          <span style={{fontWeight: "bold", fontSize: "large"}}> { this.tr.bind(this,1)()} </span>
          <br/>
          <br/>
          <input type="text"></input>
        </div>
        <div>
          <br/>
          <br/>
          <button className="btn btn-primary btn-lg" onClick={this.validateCode.bind(this)}>
            { this.tr.bind(this,4)()}
          </button>
        </div>
      </div>

    )
  }

  footer() {
    return(
      <div className="col-md-12 text-center">
        Should you have specific concerns or feeling that you would like to discuss further, please call Susie Southgate-Fox at 773-878-7698.
        <br/>
        Thank you for taking the time to complete this survey. We appreciate your commitment to our growth.
      </div>
    )
  }

  Logo() {
    return (

      <div className="col-md-12 text-center">
        <div>
          <button className="btn btn-primary btn-lg" onClick={this.chooseLanguage.bind(this,"en")}> English </button>
          <span>&nbsp; &nbsp; &nbsp;</span>
          <button className="btn btn-primary btn-lg" onClick={this.chooseLanguage.bind(this,"sp")}> Español </button>

        </div>
      </div>
    )
  }
  Done() {
    this.setState({step: 1})
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
              <div className="row">{this.EnterCode()}</div>
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
                <button type="submit" className="btn btn-success btn-lg" onClick={this.Done.bind(this)}>Submit - I am done</button>
                  <span>&nbsp; &nbsp; &nbsp;</span>
                <button type="submit" className="btn btn-Info btn-lg" onClick={this.Done.bind(this)}>Submit - and review another manager</button>
                <span>&nbsp; &nbsp; &nbsp;</span>
                <button type="submit" className="btn btn-danger btn-lg" onClick={this.Done.bind(this)}>
                  Cancel
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
      default:
          return  (
            <div className="container text-center">
              <div className="row">{this.Logo()}</div>
            </div>
          )
        break;
    }

  }

  MyHeader() {
    return (
      <div>
        <header className="hero-section container {styles.topStyle}"  >
          <div className="row">
            <div className="col-md-12">
              <h1>
                {
                  this.tr.bind(this,2)()
                }

              </h1>
              <div>
                {
                  this.tr.bind(this,3)()
                }
              </div>
              <div>

              </div>
            </div>
          </div>

          <hr/>
        </header>
        <section className="container">
          {this.TheBody()}
        </section>
      </div>

    )
  }
  render() {
    return (
      <div>
        {this.MyHeader()}
        <br/>
      </div>
    )
  }
}

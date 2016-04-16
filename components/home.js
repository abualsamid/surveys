import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

const rawFaq = require("../templates/faq.html");
const whatWeDo = require("../templates/whatwedo.html");
const styles = require("../css/home.css");

const languageText = {
  "0" : {
    "en": "This is an anonymous survey. All questions are optional.",
    "es": "Esta es una encuesta anónima . Todas las preguntas son opcionales ."
  },

  "1": {
    "en": "Please enter the code assigned to you",
    "es":"Por favor, introduzca el código asignado a usted"
  },

  "2": {
    "en": "EMPLOYEE SUREY FOR LEYE EMPLOYEES",
    "es":  "ENCUESTA PARA EMPLEADOS LEYE"
  },
  "3": {
    "en": "Please take a moment to fill this out. Your feedback is important to us. We welcome both positive feedback and areas where we can improve. Your response to this survey will be kept anonymous and confidential.",
    "es": "Por favor, tome un momento para liener este documento. Su opinion es importante para nosotros. Queremos saber donde estamon bien y done podemos mejorar. La participacion en esta encuesta es anonima y confidential.",
    "sep": "\n"
  },
  "4": {
    "en": "Continue",
    "es": "Continuar"
  },
  "5": {
    "en": "Excellent",
    "es": "Excelente"
  },
  "6": {
    "en": "Good",
    "es": "Bueno"
  },
  "7": {
    "en": "Fair",
    "es": "Mas o Menos"
  },
  "8": {
    "en": "Needs Improvement",
    "es": "Necesita Mejorar"
  },
  "9": {
    "en": "Needs Significant Improvement",
    "es": "Necesita Mejorar Mucho"
  },
  "Manager's Name": {
    "en": "Manager's Name",
    "es": "Nombre de Gerente"
  },
  "Please Select": {
    "en": "Please Select",
    "es": "Por favor seleccione"
  },
  "disclaimer": {
    "en": "Should you have specific concerns or feeling that you would like to discuss further, please call " +
          "Susie Southgate-Fox at 773-878-7698.  " +
          "Thank you for taking the time to complete this survey. We appreciate your commitment to our growth.",
    "es": "En caso de que tenga algun problema o asunto que quiera que sea discutido especificamente, por favor " +
    "llame a Susie Southgate-Fox a 773-878-7698.  " +
    "Gracias por su atencion en completar la encuesta. Agradecemos su compromiso con nuestro crecimiento."
  }
};





export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = { step: 1, language: "" , answers: {}};
  }

    trOne(code, language) {
      try {
        return languageText[code] ? languageText[code][language]  : code

      } catch(x) {
        return "n/a!";
      }
    }

    tr(code) {
      try {
        return this.state.language=="" ?
          languageText[code].en + ( languageText[code].sep || " / " ) + languageText[code].es
          :
          this.trOne(code, this.state.language)

      } catch(x) {
        return "n/a.";
      }

    }


  chooseLanguage(language) {
      console.log("choosing ", language );
      this.setState({step: 2, language: language})
  }
  dropDownQuestion(id, Q) {
    const ex = this.tr("5")
    const g = this.tr("6")
    const f = this.tr("7")
    const n = this.tr("8")
    const ns = this.tr("9")

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
        <label>{Q}</label>
          <select className="form-control" name={id} id={id} value={v.bind(this,id)()} onChange={selectAnswer.bind(this)}>
            <option value="0"> ({this.tr("Please Select")})</option>
            <option value="5">5 - {ex}</option>
            <option value="4">4 - {g} </option>
            <option value="3">3 - {f} </option>
            <option value="2">2 - {n} </option>
            <option value="1">1 - {ns} </option>
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
          <input type="checkbox" name={id} id={id} key={id} checked={v.bind(this,id)()} onChange={flipBox.bind(this)} />{q}
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
        <label><strong>{i}. </strong> {q}</label>
        <textarea className="form-control" name={id} id={id}
          defaultValue="" value={this.state.answers[id]||""}
          onChange={change.bind(this)}></textarea>
      </div>
    )
  }

  TakeGeneralSurvey() {
    return (
      <div className="col-md-12">
        <div>
          <h3>In General</h3>
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
    return (
      <div className="col-md-12">
        <div className="text-center">
          <h2>Big Bowl - Downtown Chicago</h2>

        </div>
        <form>
          <div className="form-group">
            <label>{this.tr("Manager's Name")}</label>
            <select className="form-control">
              <option>Manager 1</option>
                <option>Manager 2</option>
              <option>Manager 3</option>
            </select>
          </div>
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

  validateCode() {
    this.setState({step:3})
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
    this.setState({step: next})
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
                <button type="submit" className="btn btn-success btn-lg" onClick={this.Done.bind(this,99)}>Submit - I am done</button>
                  <span>&nbsp; &nbsp; &nbsp;</span>
                <button type="submit" className="btn btn-Info btn-lg" onClick={this.Done.bind(this,1)}>Submit - and review another manager</button>
                <span>&nbsp; &nbsp; &nbsp;</span>
                <button type="submit" className="btn btn-danger btn-lg" onClick={this.Done.bind(this,1)}>
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

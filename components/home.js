import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { API_ROOT } from '../middleware/botengine'

const rawFaq = require("../templates/faq.html");
const whatWeDo = require("../templates/whatwedo.html");
const styles = require("../css/home.css");

const languageText = {
  "This is an anonymous survey. All questions are optional." : {
    "en": "This is an anonymous survey. All questions are optional.",
    "es": "Esta es una encuesta anónima . Todas las preguntas son opcionales ."
  },

  "Please enter the code assigned to you": {
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
    "sep": "\n \n"
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
  },
  "Friendly and easy to approach": {
    "en": "Friendly and easy to approach",
    "es": "Cordial y fácil de acercarse"
  },
  "Treats all employees equally and fairly" : {
    "en": "Treats all employees equally and fairly",
    "es": "Trata a todos los empleados de forma igual y justa"
  },
  "Listens to what we have to say" : {
    "en": "Listens to what we have to say",
    "es": "Escucha lo que tenemos que decir"
  },
  "Cares about us personally and professionally appreciates us" : {
    "en": "Cares about us personally and professionally appreciates us",
    "es": "Le improto como persona y empleado, nos aprecia"
  },
  "Backs and supports us" : {
    "en": "Backs and supports us",
    "es": "Nos apoya"
  },
  "Treats us with dignity and respect" : {
    "en": "Treats us with dignity and respect",
    "es": "Nos trata con dignidad y respeto"
  },
  "Is an effective teacher, coach and manager" : {
    "en": "Is an effective teacher, coach and manager",
    "es": "Es us buen instructor, motivador y gerente"
  },
  "Gives clear directions" : {
    "en": "Gives clear directions",
    "es": "Da instrucciones claras"
  },
  "Keeps us informed" : {
    "en": "Keeps us informed",
    "es": "Nos mantiene informados"
  },
  "Handles issues and people well" : {
    "en": "Handles issues and people well",
    "es": "Sabe enfrentar situaciones y trabajar bien con personas"
  },
  "Motivates us to go good job" : {
    "en": "Motivates us to go good job",
    "es": "Nos motiva a hacer un buen trabajo"
  },
  "Rewards good performance" : {
    "en": "Rewards good performance",
    "es": "Sabe reconocer un trabajo bien hecho"
  },
  "Follows through on promises" : {
    "en": "Follows through on promises",
    "es": "Cumple con sus promesas"
  },
  "In General" : {
    "en": "In General...",
    "es": "Por Lo General..."
  },
  "Our work environment is positive": {
    "en": "Our work environment is positive",
    "es": "Nuestro ambiente do trabajo es positivo"
  },
  "The communication is clear and effective": {
    "en": "The communication is clear and effective",
    "es": "La comunicacion es clara y efectiva"
  },
  "We have the tools/supplies we need to do our job": {
    "en": "We have the tools/supplies we need to do our job",
    "es": "Tenemos los materiales necesarios para hacer nuestro trabajo"
  },
  "My training was thorough and effective": {
    "en": "My training was thorough and effective",
    "es": "Mi entrenamiento fue suficiente para prepararme para trabajar en mi posición"
  },
  "I have opportunities to learn and grow at work": {
    "en": "I have opportunities to learn and grow at work",
    "es": "Trengo oportunidades de aprender y avanzer en mi trabajo"
  },
  "What do you like most about working for LEYE?": {
    "en": "What do you like most about working for LEYE?",
    "es": "¿Qué es lo que le gusta más de trabajar para Lettuce?"
  },
  "What do you like least about working for LEYE?": {
    "en": "What do you like least about working for LEYE?",
    "es": "¿Qué es lo que le gusta menos de trabajar para Lettuce?"
  },
  "If you need something, who is the person you are most comfortable going to?": {
    "en": "If you need something, who is the person you are most comfortable going to?",
    "es": "Si necesita algo, ¿con quién se siente más comodo en ir a hablar?"
  },
  "Have you noticed any improvements over the past 6 months to one year? Explain your answer.": {
    "en": "Have you noticed any improvements over the past 6 months to one year? Explain your answer.",
    "es": "¿Ha notado alguna mejora en los ultimos 6 meses un ano? Explique por que."
  },
  "Submit - I am done": {
    "en": "Submit - I am done",
    "es": "Enviar - he terminado"
  },
  "Cancel": {
    "en": "Cancel",
    "es": "Cancelar"
  },
  "Submit - and review another manager": {
    "en": "Submit - and review another manager",
    "es": "Enviar - y revisar otro gestor"
  }

};

function trOne(code, language) {
  try {
    if (!languageText[code]) {
      return code;
    }
    if (Array.isArray(languageText[code][language])) {
      return languageText[code][language].join(languageText[code].sep || "")
    } else {
      return  languageText[code][language]
    }

  } catch(x) {
    return "n/a!";
  }
}

function tr(code, language) {
  if (!code) {
    return "";
  }
  if(!language) {
    language=""
  }
  try {
    return language=="" ?
      languageText[code]["en"] + ( languageText[code].sep || " / " ) + languageText[code]["es"]
      :
      trOne(code, language)

  } catch(x) {
    return "n/a.";
  }
}

class EnterCode extends Component {
  constructor(props) {
    super(props)
  }
  handleClick(e) {
    e.preventDefault();
    this.props.callBack(this.storeCode.value)
  }
  render() {
    var language = this.props.language
    console.log("enter code with language ", language);
    return (
      <div className="col-md-12 text-center">
        <div>
          {tr("This is an anonymous survey. All questions are optional.",language)}
          <br/>
          <br/>
        </div>
        <div>
          <br/>
          <span style={{fontWeight: "bold", fontSize: "large"}}> { tr("Please enter the code assigned to you",language)} </span>
          <br/>
          <br/>
          <input type="text"  ref={(ref) => this.storeCode = ref } ></input>
        </div>
        <div>
          <br/>
          <br/>
          <button className="btn btn-primary btn-lg" onClick={this.handleClick.bind(this)}>
            { tr("4",language)}
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
      if (!languageText[code]) {
        return code;
      }
      if (Array.isArray(languageText[code][language])) {
        return languageText[code][language].join(languageText[code].sep || "")
      } else {
        return  languageText[code][language]
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
        languageText[code]["en"] + ( languageText[code].sep || " / " ) + languageText[code]["es"]
        :
        trOne(code, language)

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
        <label>{this.tr(Q)}</label>
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
        console.log("select manager: ", event.target.value)
      } catch(x) {
        console.log('doh! selecting manager: ', x)
      }
    }
    console.log("Managers are ", managers)
    let options=[]
    for(var i=0;i<managers.length;i++) {
      var o = managers[i]
      options.push(<option key={i} value={o.key}>{o.value}</option>)
    }
    return (
      <div className="form-group">
        <label>{this.tr(Q)}</label>
          <select required defaultValue="" className="form-control"  value={v.bind(this)()} onChange={selectAnswer.bind(this)}>
            <option value="" >({this.tr("Please Select")})</option>
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
    console.log("picked... stored code ", storeCode, this.state)
    this.setState({storeCode: storeCode, step: 3})
    console.log("setting state for store code. ", storeCode, this.state)
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

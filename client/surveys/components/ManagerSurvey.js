import React, { Component, PropTypes } from 'react'
import Checkbox from './questions/checkbox'
import TextQuestion from './questions/text'
import DropDown from './questions/dropDown.js'
import ManagerDropDown from './ManagerDropDown'
import * as languageHelper  from '../../../common/helpers/language'

class managerQuestions extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h2>Hello</h2>
      </div>
    )
  }
}
export default class ManagerSurvey extends Component {
  constructor(props) {
    super(props)
    this.state = {questions:[], managerId:0, managerCaption:"" }

    this.answers = {}
    let a = {}
    for (var i=19;i<30;i++) {
      a[i]={ customerId:0, surveyId: 0, choice: 0, checked: false, value: ""}
    }
    this.answers = a

    this.handleCheckboxChange=this.handleCheckboxChange.bind(this)
    this.handleTextChange=this.handleTextChange.bind(this)
    this.handleRadio=this.handleRadio.bind(this)
  }


  componentWillReceiveProps(nextProps) {
    this.answers = {}
  }

  componentDidMount() {
    const {language} = this.props
    const dropDownOptions = [
      { key: "5", value: languageHelper.tr("5",language)},
      { key: "4", value: languageHelper.tr("6",language)},
      { key: "3", value: languageHelper.tr("7",language)},
      { key: "2", value: languageHelper.tr("8",language)},
      { key: "1", value: languageHelper.tr("9",language)}
    ]
    this.setState({
      questions: [
          {id:"15", question: languageHelper.tr("Friendly and easy to approach", language), options: dropDownOptions },
          {id:"16", question: languageHelper.tr("Treats all employees equally and fairly", language), options: dropDownOptions },
          {id:"17", question: languageHelper.tr("Listens to what we have to say", language), options: dropDownOptions },
          {id:"18", question: languageHelper.tr("Cares about us personally and professionally/appreciates us", language), options: dropDownOptions},
          {id:"19", question: languageHelper.tr("Backs and supports us", language), options: dropDownOptions },
          {id:"20", question: languageHelper.tr("Treats us with dignity and respect", language), options: dropDownOptions },
          {id:"21", question: languageHelper.tr("Is an effective teacher, coach and manager", language), options: dropDownOptions },
          {id:"22", question: languageHelper.tr("Motivates us to do a good job", language), options: dropDownOptions },
          {id:"23", question: languageHelper.tr("Handles issues and people well", language), options: dropDownOptions },
          {id:"24", question: languageHelper.tr("Follows through on promises/requests", language), options: dropDownOptions }
        ]
    })
  }

  handleAnswer(id, value) {
    this.answers[id]={customerId:1, surveyId: 1, choice: parseInt(value)}
  }
  handleCheckboxChange(id, value) {
    this.answers[id]={customerId: 1, surveyId: 1, checked: value}
  }
  handleTextChange(id, value ) {
    this.answers[id]={customerId:1, surveyId: 1, value: value}
  }
  handleRadio(id, checked, value) {
    this.answers[id]={customerId: 1, surveyId: 1, choice: parseInt(value)}
  }



  setManagerId(id, caption) {
    this.setState({managerId: id, managerCaption: caption})
  }

  handleSubmit(stayInPlace) {
    this.props.handleDone(this.state.managerId, this.answers, stayInPlace)
    this.setState({managerId: 0, managerCaption: ""})
  }

  render() {
    const {language, handleCancel, handleDone, handleSubmit, storeId, managers,storeCaption }  = this.props

    if (this.state.managerId  ) {
      return (
        <div className="col-md-12">
          <div className="text-center" style={{color: "#B80000", fontWeight: "bold"}}>
            <h2>{storeCaption}</h2>
            <h3>{this.state.managerCaption}</h3>
          </div>
          <br/>
          <div>
            <div>
              <h3>
                {
                  languageHelper.tr("Please feel free to review as many managers as you wish.", language)
                }
              </h3>
            </div>
              <article className="survey-page survey-page-white">

                <header className="survey-page-header">
                  <div className="survey-title-container clearfix survey-title-align-left has-survey-title">
                    <div className="survey-title-table-wrapper text-center">
                        <h2>{languageHelper.tr("Manager Survey", language)}</h2>
                        <br/>
                      </div>
                  </div>
                </header>
                <section className="survey-page-body">
                  {
                    this.state.questions.map(
                      (one) => {
                        return (
                          <div className="minorcard" key={one.id}>
                            <DropDown id={one.id} question={one.question}
                            key={one.id}
                            pleaseSelect={languageHelper.tr("Please Select", language)}
                            options={one.options} onChange={this.handleAnswer.bind(this)} />
                          </div>
                        )
                      }
                    )
                  }
                  <div className="minorcard" key={"comments"}>
                      <TextQuestion id={"29"} key={"29"} i={""} onChange={this.handleTextChange}
                        question={languageHelper.tr("Comments", language)} />
                  </div>

                </section>
                <footer className="survey-footer">
                  <div>
                      <button type="submit"
                          onClick={(e) => { e.preventDefault(); this.handleSubmit.bind(this)(false) }}
                          className="btn-lg btn-primary btn btn-block">
                        {
                          languageHelper.tr("Submit - I am done",language)
                        }
                      </button>
                      <button type="submit"
                        onClick={(e) => { e.preventDefault(); this.handleSubmit.bind(this)(true) }}
                        className="btn-block btn-lg btn-info btn">
                        {
                          languageHelper.tr("Submit - I want to review another manager", language)
                        }

                      </button>
                      <button type="submit" className="btn-lg btn-danger btn btn-block"
                        onClick={(e)=>{e.preventDefault();handleCancel()}}>
                        {
                          languageHelper.tr("Cancel", language)
                        }
                      </button>
                  </div>
                    <div className="text-center">
                      <br/>
                      <h3>
                        {
                          languageHelper.tr("please feel free to review as many managers as you wish", language)
                        }
                      </h3>

                    </div>

                  <br/>
                  <br/>
                </footer>
              </article>
          </div>
          <div>

          </div>
        </div>
      )
    } else {
      return (
        <div className="col-md-12">
          <div className="text-center" style={{color: "#B80000", fontWeight: "bold"}}>
            <h2>{storeCaption}</h2>
          </div>

          <div>
            <h3>{languageHelper.tr("Manager Survey", language)}</h3>
            <br/>
            <div>
              <h3>
                {languageHelper.tr("Please feel free to review as many managers as you wish.", language)}
              </h3>
            </div>

              <div className="card" >
                <ManagerDropDown storeId={storeId}  managers={managers} language={language}
                  caption={languageHelper.tr("Manager", language)}
                  setManagerId={this.setManagerId.bind(this)} showButton={true} />
              </div>

                <div><br/></div>
                <div><br/></div>
                <div><br/></div>
          </div>

        </div>
      )
    }

  }
}

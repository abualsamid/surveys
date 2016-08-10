import React, { Component, PropTypes } from 'react'
import Checkbox from './questions/checkbox'
import TextQuestion from './questions/text'
import DropDown from './questions/dropDown.js'
import ManagerDropDown from './ManagerDropDown'
import * as languageHelper  from '../../../common/helpers/language'
import {GetSurveyQuestions}from '../../../common/middleware/botengine'

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
      const dropDownOptions = [
        { key: "5", value: languageHelper.tr("5",props.language)},
        { key: "4", value: languageHelper.tr("6",props.language)},
        { key: "3", value: languageHelper.tr("7",props.language)},
        { key: "2", value: languageHelper.tr("8",props.language)},
        { key: "1", value: languageHelper.tr("9",props.language)},
        { key: "0", value: languageHelper.tr("N/A", props.language)}
      ]

    this.state = {questions:[], managerId:0, managerCaption:"" , dropDownOptions: dropDownOptions, managers:props.managers}

    this.answers = {}
    // let a = {}
    // for (var i=19;i<30;i++) {
    //   a[i]={ customerId:0, surveyId: 0, choice: 0, checked: false, value: ""}
    // }
    // this.answers = a

    this.handleCheckboxChange=this.handleCheckboxChange.bind(this)
    this.handleTextChange=this.handleTextChange.bind(this)
    this.handleRadio=this.handleRadio.bind(this)
  }


  componentWillReceiveProps(nextProps) {
    this.answers = {}
    console.log('receiving props ', nextProps.managers)
    this.setState({managers: nextProps.managers})
  }

  componentDidMount() {
    const {customerId, surveyId, campaignId, language} = this.props
    const self = this
    let qs = []
    GetSurveyQuestions(customerId,campaignId, surveyId)
    .then(function(questions) {
      // console.log('received the following qs ',customerId,campaignId, surveyId, questions)
      for(var i=0;i<questions.length;i++) {
        const q = questions[i]
        if (q.Language==language && q.SectionId==3) {
          qs.push(q)
        }
      }
      self.setState({questions: qs})
    })
  }

  // componentDidMount() {
  //   const {language} = this.props
  //   const dropDownOptions = [
  //     { key: "5", value: languageHelper.tr("5",language)},
  //     { key: "4", value: languageHelper.tr("6",language)},
  //     { key: "3", value: languageHelper.tr("7",language)},
  //     { key: "2", value: languageHelper.tr("8",language)},
  //     { key: "1", value: languageHelper.tr("9",language)}
  //   ]
  //   this.setState({
  //     questions: [
  //         {id:"15", question: languageHelper.tr("Friendly and easy to approach", language), options: dropDownOptions },
  //         {id:"16", question: languageHelper.tr("Treats all employees equally and fairly", language), options: dropDownOptions },
  //         {id:"17", question: languageHelper.tr("Listens to what we have to say", language), options: dropDownOptions },
  //         {id:"18", question: languageHelper.tr("Cares about us personally and professionally/appreciates us", language), options: dropDownOptions},
  //         {id:"19", question: languageHelper.tr("Backs and supports us", language), options: dropDownOptions },
  //         {id:"20", question: languageHelper.tr("Treats us with dignity and respect", language), options: dropDownOptions },
  //         {id:"21", question: languageHelper.tr("Is an effective teacher, coach and manager", language), options: dropDownOptions },
  //         {id:"22", question: languageHelper.tr("Motivates us to do a good job", language), options: dropDownOptions },
  //         {id:"23", question: languageHelper.tr("Handles issues and people well", language), options: dropDownOptions },
  //         {id:"24", question: languageHelper.tr("Follows through on promises/requests", language), options: dropDownOptions }
  //       ]
  //   })
  // }

  handleAnswer(id, value) {
    this.answers[id]={customerId:1, surveyId: 1, choice: parseInt(value), value: ""}
  }
  handleCheckboxChange(id, value) {
    this.answers[id]={customerId: 1, surveyId: 1, checked: value, choice: 0, value: ""}
  }
  handleTextChange(id, value ) {
    this.answers[id]={customerId:1, surveyId: 1, value: value, choice: 0, checked: false }
  }
  handleRadio(id, checked, value) {
    this.answers[id]={customerId: 1, surveyId: 1, choice: parseInt(value), checked: false, value: ""}
  }



  setManagerId(id, caption) {
    this.setState({managerId: id, managerCaption: caption})
  }

  handleSubmit(stayInPlace) {
    try {
      // console.log('answers are: ', this.answers)
    } catch(x) {
      console.log(x)
    }
    let allGood=true;
    for(var key in this.answers) {
      let one = this.answers[key]
      if (!one.value && one.choice==-1) {
        allGood = false
      }
    }

    if(!allGood) {
      alert("Please answer all ratings questions to continue.")
      return false;

    }
    this.props.handleDone(this.state.managerId, this.answers, stayInPlace)
    this.setState({managerId: 0, managerCaption: ""})
  }

  render() {
    const {language, handleCancel, handleSubmit, storeId, storeCaption }  = this.props
    const { managers } = this.state
    const self = this
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
                  <h3>
                    {this.state.managerCaption}
                    { "  " }
                    {languageHelper.tr("is", language)}
                    { " ... "}
                  </h3>
                </section>
                <section className="survey-page-body">
                  {
                    this.state.questions.map(
                      (one) => {
                        self.answers[one.id]={ customerId:self.props.customerId ||1, surveyId: self.props.surveyId || 1,
                        choice: one.QuestionTypeId==3?-1:0, checked: false, value: ""}

                        return (
                          <div className="minorcard" key={one.id}>
                            <br/>

                            {
                              one.QuestionTypeId==3 &&
                              <DropDown id={one.id} question={one.Caption || one.Name}
                              key={one.id}
                              pleaseSelect={languageHelper.tr("Please Select", language)}
                              options={this.state.dropDownOptions}
                              onChange={this.handleAnswer.bind(this)} />
                            }
                            {
                              one.QuestionTypeId==5 &&
                                  <TextQuestion id={one.id} key={one.id} i={""}
                                    onChange={this.handleTextChange}
                                    question={one.Caption || one.Name} />
                            }
                            <br/>

                          </div>
                        )
                      }
                    )
                  }


                </section>
                <footer className="survey-footer">
                  <div className="text-center">
                    <br/>
                    <h3>
                      {
                        languageHelper.tr("Please feel free to review as many managers as you wish.", language)
                      }
                    </h3>

                  </div>

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
                  setManagerId={this.setManagerId.bind(this)} showButton={true} filterZero={true} />
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

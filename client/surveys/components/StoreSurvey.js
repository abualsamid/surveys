import React, { Component, PropTypes } from 'react'
import Checkbox from './questions/checkbox'
import TextQuestion from './questions/text'
import Radio from './questions/radio'
import * as languageHelper  from '../../../common/helpers/language'
import {GetSurveyQuestions}from '../../../common/middleware/botengine'
import DropDown from './questions/dropDown.js'
import ManagerDropDown from './ManagerDropDown'


export default class StoreSurvey extends Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: []
    }

    this.answers = {}

    this.handleCheckboxChange=this.handleCheckboxChange.bind(this)
    this.handleTextChange=this.handleTextChange.bind(this)
    this.handleRadio=this.handleRadio.bind(this)
    this.handleAnswer=this.handleAnswer.bind(this)
  }
  handleCheckboxChange(id, value) {
    const {customerId, surveyId} = this.props
    this.answers[id]={customerId: customerId||1, surveyId: surveyId||1, checked: value}
    try {
      console.log('setting checkbox answer ', id ,  ' value: ', value, parseInt(value));

    } catch(x) {}
  }

  handleAnswer(id, value) {
    if (!this.answers) {
      this.answers={}
    }
    const {customerId, surveyId} = this.props
    let isAnswered = false
    let choice=0
    if (value!=="") {
      isAnswered=true;
      choice=parseInt(value)
    }

    if (!this.answers[id]) {
      this.answers[id]={customerId:customerId, surveyId: surveyId, choice: choice, value: "", isAnswered: isAnswered}
    } else {
      const a = this.answers[id]
      this.answers[id] = { ...a, choice: choice, isAnswered: isAnswered }
    }
    console.log('Answers after handling: ', id, value, isAnswered, choice, ' are ', this.answers[id])
  }

  handleTextChange(id, value ) {
    if (!this.answers) {
      this.answers={}
    }

    const {customerId, surveyId} = this.props
    if (!this.answers[id]) {
      this.answers[id]={customerId: customerId, surveyId: surveyId, value: value, isAnswered: value?true:false}
    } else {
      const a = this.answers[id]
      this.answers[id] = { ...a, value: value, isAnswered: value?true:false }
    }
  }
  handleRadio(id, value) {
    const {customerId, surveyId} = this.props
    if (!this.answers) {
      this.answers={}
    }

    console.log('setting radio answer ', id , ' to  value: ', value);
    // for radio buttons the blank answer is "" and the "any" answer is 0, so we need to treat "" as not answered
    // and "0" as a proper answer
    if (!this.answers[id]) {

      this.answers[id]={customerId: customerId, surveyId: surveyId, choice: parseInt(value), isAnswered: value?true:false}
    } else {
      const a = this.answers[id]
      this.answers[id]={ ...a, choice: parseInt(value), isAnswered: value?true:false }
    }
  }
  componentDidMount() {
    const {customerId, surveyId, campaignId, language} = this.props
    const self = this
    let qs = []
    GetSurveyQuestions(customerId,campaignId, surveyId)
    .then(function(questions) {

      questions
      .filter(function(q) { return (q.SectionId==2 || q.SectionId==1) })
      .map(function(q,i,arr){
        if (q.Language==language) {
          qs[i] = q
        }
        self.answers[q.id]={ customerId:1, surveyId: 1, choice: 0, checked: false, value: "", isAnswered: false }
      })

      // for(var i=0;i<questions.length;i++) {
      //   const q = questions[i]
      //   if (q.Language==language) {
      //     qs[i] = q
      //   }
      //   self.answers[q.id]={ customerId:1, surveyId: 1, choice: 0, checked: false, value: ""}
      // }

      self.setState({questions: qs})
    })
  }

  render() {
    const {language, handleSkip, handleSubmit, handleCancel,storeId, storeCaption }  = this.props
    const {customerId, surveyId, campaignId} = this.props
    const self = this
    const RadioQuestions = [
        {id: "1", code: "Our work environment is positive" },
        {id: "2", code: "Management embraces and demonstrates company values, policies and culture" },
        {id: "3", code: "The communication is clear and effective" },
        {id: "4", code: "Management is open to feedback and ructive criticism" },
        {id: "5", code: "Managment makes decisions that are fair and equitable" },
        {id: "6", code: "Issues are resolved quickly and and effectively" },
        {id: "7", code: "Employees are motivated to be the best they can be" },
        {id: "8", code: "We have the tools/supplies we need to do our job" },
        {id: "9", code: "My training was thorough and effective" },
        {id: "10", code: "I have opportunities to learn and grow at work" }
      ];

    const TextQuestions = [
        { id:"11", code: "What do you like most about working for LEYE?"},
        { id:"12", code: "What do you like least about working for LEYE?"},
        { id:"13", code: "If you need something, who is the person you are most comfortable going to?"},
        { id:"14", code: "Have you noticed any improvements over the past 6 months to one year? Explain your answer."}
      ];

    const yes_no_sometimes = [
      { v:1, caption: languageHelper.tr("Yes", language), checked: false, className: "btn",
        checkedClassName: "btn btn-primary active" },
      { v:2, caption: languageHelper.tr("No", language), checked: false, className: "btn",  checkedClassName: "btn btn-danger active" },
      { v:3, caption: languageHelper.tr("Sometimes", language), checked: false, className: "btn",
        checkedClassName:"btn btn-info active"  }
    ]
    let counter = 1
    return (
      <div className="col-md-12">
        <div className="text-center" style={{color: "#B80000", fontWeight: "bold"}}>
          <h2>{storeCaption}</h2>
        </div>
        <br/>
        <article className="survey-page survey-page-white">

          <header className="survey-page-header">
            <div className="survey-title-container clearfix survey-title-align-left has-survey-title">
              <div className="survey-title-table-wrapper text-center">
                <h3 style={{ fontWeight: "bold", color: "white" }}>{languageHelper.tr("In General", language)}</h3>
              </div>

            </div>
          </header>
          <section className="survey-page-body">
            <div>
              <br/>

                  <div>
                    {
                      this.state.questions
                        .filter(function(q) { return q.SectionId==1 })
                        .map(function(v,index,arr){
                          self.answers[v.id]={
                                    customerId:self.props.customerId,
                                    surveyId: self.props.surveyId,
                                    choice: 0,
                                    checked: false,
                                    value: "",
                                    isAnswered: false
                                }
                          return (
                            <div className="card"  style={{margin:"1em"}} key={v.id + '_' + index}>
                              <Radio id={v.id} key={v.id} onChange={this.handleRadio}
                                question={v.Caption} options={yes_no_sometimes} />
                            </div>

                          )
                      },this)
                    }
                  </div>
            </div>
            <hr/>
            <div>
              <div>
                <h3>
                  {languageHelper.tr("Please use appropriate language when answering the following questions.", language)}
                </h3>
                <br/>
                <br/>
              </div>
              <div>
                {
                  this.state.questions
                    .filter(function(q) { return q.SectionId==2 })
                    .map(function(v,index,arr){
                      function prefix(i) {
                        return i ? `${i}.`  : ""
                      }
                      self.answers[v.id]={ customerId:self.props.customerId, surveyId: self.props.surveyId, choice: 0, checked: false, value: ""}
                      return (
                        <div className="minorcard" key={v.id}>
                        {
                          v.QuestionTypeId==3 &&

                          <div className="form-group">
                            <p className="lead">
                              <strong>
                                {prefix(counter++)}
                                {v.Caption}
                              </strong>
                            </p>

                            <ManagerDropDown storeId={storeId}
                              managers={this.props.managers}
                              language={language}
                              selectText={""}
                              filterZero={false}
                              caption={languageHelper.tr("Manager", language)}
                              setManagerId={
                              (value,caption) => self.handleAnswer(v.id,value ) } showButton={false} />
                          </div>

                        }
                        {
                          (v.QuestionTypeId==4 || v.QuestionTypeId==5 || v.QuestionTypeId==6)
                          &&
                            <TextQuestion id={v.id} key={v.id} i={counter++} onChange={this.handleTextChange}
                              question={v.Caption} />
                        }
                        </div>

                      )
                  },this)
                }

              </div>
            </div>

          </section>
          <footer className="survey-footer">
            <div className="clearfix">
                <button type="submit" className="btn btn-primary btn-lg btn-block"
                  onClick={ (e) => { e.preventDefault(); handleSubmit(this.answers)} }>
                  {languageHelper.tr("Submit Answers", language)}
                </button>
                <br/>
                <button type="submit" className="btn btn-lg btn-danger btn-block" onClick={handleCancel}>
                  {languageHelper.tr("Cancel", language)}
                </button>
            </div>
            <div><br/></div>
            <div><br/></div>
            <div className="text-center">

              {languageHelper.tr("Please answer all questions in order to proceed.", language)}

            </div>
            <div><br/></div>
          </footer>
        </article>

        <div><br/></div>
        <div><br/></div>
      </div>

    )
  }
}

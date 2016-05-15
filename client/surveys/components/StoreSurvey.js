import React, { Component, PropTypes } from 'react'
import Checkbox from './questions/checkbox'
import TextQuestion from './questions/text'
import Radio from './questions/radio'
import * as languageHelper  from '../../../common/helpers/language'

export default class StoreSurvey extends Component {
  constructor(props) {
    super(props)
    let a = {}
    for (var i=1;i<15;i++) {
      a[i]={ customerId:0, surveyId: 0, choice: 0, checked: false, value: ""}
    }
    this.answers = a

    this.handleCheckboxChange=this.handleCheckboxChange.bind(this)
    this.handleTextChange=this.handleTextChange.bind(this)
    this.handleRadio=this.handleRadio.bind(this)
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

  render() {

    const {language, handleSkip, handleSubmit, handleCancel,storeId, storeCaption }  = this.props
    const RadioQuestions = [
      {id: "1", code: "Our work environment is positive" },
      {id: "2", code: "Management embraces and demonstrates company values, policies and culture" },
      {id: "3", code: "The communication is clear and effective" },
      {id: "4", code: "Management is open to feedback and constructive criticism" },
      {id: "5", code: "Managment makes decisions that are fair and equitable" },
      {id: "6", code: "Issues are resolved quickly and and effectively" },
      {id: "7", code: "Employees are motivated to be the best they can be" },
      {id: "8", code: "We have the tools/supplies we need to do our job" },
      {id: "9", code: "My training was thorough and effective" },
      {id: "10", code: "I have opportunities to learn and grow at work" }
    ]

    const TextQuestions = [
      { id:"11", code: "What do you like most about working for LEYE?"},
      { id:"12", code: "What do you like least about working for LEYE?"},
      { id:"13", code: "If you need something, who is the person you are most comfortable going to?"},
      { id:"14", code: "Have you noticed any improvements over the past 6 months to one year? Explain your answer."}
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
                <h3>{languageHelper.tr("In General", language)}</h3>
              </div>

            </div>
          </header>
          <section className="survey-page-body">
            <div>
              <br/>

                  <div className="card">
                    {
                      RadioQuestions.map(function(v,index,arr){
                        return (
                          <Radio id={v.id} key={v.id} onChange={this.handleRadio}
                            question={languageHelper.tr(v.code,language)} />
                        )
                      },this)
                    }
                  </div>
            </div>
            <hr/>
            <div>
              <div>
                Please use appropriate language when answering the following questions.
                <br/>
                <br/>

              </div>
              <div>
                {
                  TextQuestions.map(function(v, index, arr){
                    return (
                      <div className="minorcard" key={v.id}>
                        <TextQuestion id={v.id} key={v.id} i={counter++} onChange={this.handleTextChange}
                          question={languageHelper.tr(v.code, language)} />
                      </div>
                    )
                  },this)
                }
              </div>

            </div>

          </section>
          <footer className="survey-footer">
            <div className="clearfix">
              <span style={{padding:'2em'}}>
                <button type="submit" className="btn btn-primary btn-lg"
                  onClick={ (e) => { e.preventDefault(); handleSubmit(this.answers)} }>
                  {languageHelper.tr("Submit Answers", language)}
                </button>
              </span>
              {    }
              <span>
                <button type="submit" className="btn btn-lg btn-danger" onClick={handleCancel}>
                  {languageHelper.tr("Cancel", language)}
                </button>
              </span>
            </div>
            <div><br/></div>
            <div><br/></div>

          </footer>
        </article>

        <div><br/></div>
        <div><br/></div>
      </div>

    )
  }
}

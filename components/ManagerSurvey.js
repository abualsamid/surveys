import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import Checkbox from './questions/checkbox'
import TextQuestion from './questions/text'
import DropDown from './questions/dropDown.js'
import ManagerDropDown from './ManagerDropDown'
import * as languageHelper  from '../helpers/language'

export default class ManagerSurvey extends Component {
  constructor(props) {
    super(props)
    this.state = {questions:[]}
    this.managerId = ""
  }


  componentWillReceiveProps(nextProps) {
    this.answers = {}
  }

  componentDidMount() {
    const {language} = this.props
    this.answers = {}
    const dropDownOptions = [
      { key: "5", value: languageHelper.tr("5",language)},
      { key: "4", value: languageHelper.tr("6",language)},
      { key: "3", value: languageHelper.tr("7",language)},
      { key: "2", value: languageHelper.tr("8",language)},
      { key: "1", value: languageHelper.tr("9",language)}
    ]
    this.setState({
      questions: [
          {id:"m1", question: languageHelper.tr("Friendly and easy to approach", language), options: dropDownOptions },
          {id:"m2", question: languageHelper.tr("Treats all employees equally and fairly", language), options: dropDownOptions },
          {id:"m3", question: languageHelper.tr("Listens to what we have to say", language), options: dropDownOptions },
          {id:"m4", question: languageHelper.tr("Cares about us personally and professionally appreciates us", language), options: dropDownOptions},
          {id:"m5", question: languageHelper.tr("Backs and supports us", language), options: dropDownOptions },
          {id:"m6", question: languageHelper.tr("Treats us with dignity and respect", language), options: dropDownOptions },
          {id:"m7", question: languageHelper.tr("Is an effective teacher, coach and manager", language), options: dropDownOptions },
          {id:"m8", question: languageHelper.tr("Gives clear directions", language), options: dropDownOptions },
          {id:"m9", question: languageHelper.tr("Keeps us informed", language), options: dropDownOptions },
          {id:"m10", question: languageHelper.tr("Motivates us to go good job", language), options: dropDownOptions },
          {id:"m11", question: languageHelper.tr("Rewards good performance", language), options: dropDownOptions },
          {id:"m12", question: languageHelper.tr("Handles issues and people well", language), options: dropDownOptions },
          {id:"m13", question: languageHelper.tr("Follows through on promises", language), options: dropDownOptions }
        ]
    })
  }

  handleAnswer(id, value) {
    this.answers[id]=value
  }



  nextStep() {
    browserHistory.push("/ManagerSurvey")
  }

  setManagerId(id) {
    this.managerId = id
  }

  handleSubmit(stayInPlace) {
    this.props.handleDone(this.managerId, this.answers, stayInPlace)
  }

  render() {
    const {language, handleCancel, handleDone, handleSubmit, storeId, managers,storeCaption }  = this.props

    return (
      <div className="col-md-12">
        <div className="text-center" style={{color: "#B80000", fontWeight: "bold"}}>
          <h2>{storeCaption}</h2>
        </div>

        <div>
          <h3>{languageHelper.tr("Manager Survey", language)}</h3>
          <br/>

          <form onSubmit={(e)=> e.preventDefault()}>

            <div className="card" >
              <ManagerDropDown storeId={storeId}  managers={managers}
                caption={languageHelper.tr("Manager", language)}
                setManagerId={this.setManagerId.bind(this)} />

            </div>

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

              <div>
                <span style={{padding: "1em"}}>
                  <button type="submit"
                      onClick={(e) => { e.preventDefault(); this.handleSubmit.bind(this)(false) }}
                      className="btn-lg btn-primary btn">
                    {
                      languageHelper.tr("Submit - I am done",language)
                    }
                  </button>
                </span>
                <span style={{padding: "1em"}}>
                  <button type="submit"
                    onClick={(e) => { e.preventDefault(); this.handleSubmit.bind(this)(true) }}
                    className="btn-lg btn-info btn">
                    {
                      languageHelper.tr("Submit - I want to review another manager", language)
                    }

                  </button>
                </span>
                <span style={{padding: "1em"}}>
                  <button type="submit" className="btn-lg btn-danger btn"
                    onClick={(e)=>{e.preventDefault();handleCancel()}}>
                    {
                      languageHelper.tr("Cancel", language)
                    }
                  </button>
                </span>
              </div>
          </form>
        </div>

      </div>
    )
  }
}

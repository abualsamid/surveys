import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import Checkbox from './questions/checkbox'
import TextQuestion from './questions/text'
import * as languageHelper  from '../helpers/language'

export default class StoreSurvey extends Component {
  constructor(props) {
    super(props)
    this.answers = {}
  }
  handleCheckboxChange(id, value) {
    this.answers[id]=value
  }
  handleTextChange(id, value ) {
    this.answers[id]=value
  }


  render() {

    const {language, handleSkip, handleSubmit, handleCancel }  = this.props
    

    return (
      <div className="col-md-12">
        <div>
          <h3>{languageHelper.tr("In General", language)}</h3>
          <form onSubmit={(e)=> e.preventDefault()}>
            <Checkbox id="g1" onCheckboxChange={this.handleCheckboxChange.bind(this)}
                question={languageHelper.tr("Our work environment is positive",language)} />
            <Checkbox id="g2" onCheckboxChange={this.handleCheckboxChange.bind(this)}
                question={languageHelper.tr("The communication is clear and effective",language)} />
            <Checkbox id="g3" onCheckboxChange={this.handleCheckboxChange.bind(this)}
                question={languageHelper.tr("We have the tools/supplies we need to do our job",language)} />
            <Checkbox id="g4" onCheckboxChange={this.handleCheckboxChange.bind(this)}
                question={languageHelper.tr("My training was thorough and effective",language)} />
            <Checkbox id="g5" onCheckboxChange={this.handleCheckboxChange.bind(this)}
                question={languageHelper.tr("I have opportunities to learn and grow at work",language)} />
          </form>
        </div>
        <hr/>
        <div>
          <TextQuestion id="g6" i={1} question={languageHelper.tr("What do you like most about working for LEYE?",language)}
            onChange={this.handleTextChange.bind(this)}
          />
          <TextQuestion id="g7" i={2} question={languageHelper.tr("What do you like least about working for LEYE?",language)}
            onChange={this.handleTextChange.bind(this)}
          />

          <TextQuestion id="g8" i={3}
            question={languageHelper.tr("If you need something, who is the person you are most comfortable going to?",language)}
            onChange={this.handleTextChange.bind(this)}
          />
          <TextQuestion id="g9" i={4}
          question={languageHelper.tr("Have you noticed any improvements over the past 6 months to one year? Explain your answer.",language)}
            onChange={this.handleTextChange.bind(this)}
          />

        </div>
        <div>
          <span style={{padding:'2em'}}>
            <button type="submit" className="btn btn-primary btn-lg"
              onClick={ (e) => { e.preventDefault(); handleSubmit(this.answers)} }>
              {languageHelper.tr("Submit Answers", language)}

            </button>
          </span>
          {    }
          <span style={{padding:'2em'}}>
            <button type="submit" className="btn btn-lg btn-info"
              onClick={handleSkip}>
              {languageHelper.tr("Skip - Go to Manager Review",language)}

            </button>
          </span>
          <span>
            <button type="submit" className="btn btn-lg btn-danger" onClick={handleCancel}>
              languageHelper.tr("Cancel", language)
            </button>
          </span>
        </div>
      </div>

    )
  }
}

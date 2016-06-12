import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {loadedQuestions}  from '../actions'
import {GetSurveyQuestionTranslation,SaveSurveyQuestionTranslation}  from '../../../common/middleware/botengine'

import Questions from '../components/questions'


class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {questions: [], message: ""}
    this._onSave=this._onSave.bind(this)
  }

  componentWillMount() {
    const self = this
    GetSurveyQuestionTranslation(1, 1, 1)
    .then(
      function(questions) {
        self.setState({questions: questions})
      }
    )
  }

  componentWillReceiveProps(nextProps) {
  }
  componentDidMount() {

  }
  _onSave(questions) {
    const self = this
    this.setState({message: "saving..."})
    SaveSurveyQuestionTranslation(1,1,1, questions)
    .then(function(result) {
      self.setState({message:"saved."})
      setTimeout(function() {
        self.setState({message:""})
      },2000)
    })
  }
  render() {
    return <div>
      <Questions surveyId={this.props.surveyID} questions={this.state.questions} onSave={this._onSave} />
      <br/>
      <br/>
      { this.state.message &&
        <div className="alert alert-success alert-dismissible" role="alert">
          <h3> {this.state.message} </h3>
        </div>
      }
    </div>
  }
}

export default connect(
  (state, ownProps) => (
    {
      email: state.login.email,
      isLoggedIn: state.login.isLoggedIn,
      surveyId: 1
    }
  ),
  loadedQuestions
)(Container)

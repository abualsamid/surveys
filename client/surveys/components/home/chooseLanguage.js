import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

import { connect } from 'react-redux'
import * as languageHelper  from '../../../../common/helpers/language'


function pickLanguage(w) {
  return {
    type: "CHOOSE_LANGUAGE",
    language: w
  }
}


class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {language} = ""
    return (
      <header className="hero-section container {styles.topStyle}"  >
        <div className="row">
          <div className="col-md-12">
            <h2>
              {
                languageHelper.tr("EMPLOYEE SURVEY FOR LEYE EMPLOYEES",language)
              }
            </h2>
            <br/>
            <br/>
            <div style={{whiteSpace: "pre-line"}}>
              <h3>
                {
                  languageHelper.tr(3,language)
                }
              </h3>

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
}

class ChooseLanguage extends Component {
  constructor(props) {
    super(props)
  }


  handleClick(choice) {
    const {pickLanguage, dispatch} = this.props
    pickLanguage(choice)
    browserHistory.push('/Store')
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div>
                <button className="btn btn-primary btn-lg btn-block" onClick={this.handleClick.bind(this,"en")}>
                  <span style={{fontSize: "x-large", fontWeight: "bold"}}>
                    English
                  </span>
                </button>
                <br/>
                <button className="btn btn-info btn-lg btn-block" onClick={this.handleClick.bind(this,"es")}>
                  <span style={{fontSize: "x-large", fontWeight: "bold"}}>
                    Español
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <br/>
              This survey works best in modern browsers such as chrome, safari or firefox.
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({}),
  {
    pickLanguage
  }
)(ChooseLanguage)

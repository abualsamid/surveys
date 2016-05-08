import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

import { connect } from 'react-redux'
import * as languageHelper  from '../../../../common/helpers/language'

const styles = require( '../../../../client/assets/css/home.css' );

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
                languageHelper.tr("EMPLOYEE SUREY FOR LEYE EMPLOYEES",language)
              }
            </h2>
            <br/>
            <br/>
            <div style={{whiteSpace: "pre-line"}}>
              {
                languageHelper.tr(3,language)
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
                <button className="btn btn-primary btn-lg" onClick={this.handleClick.bind(this,"en")}> English </button>
                <span>&nbsp; &nbsp; &nbsp;</span>
                <button className="btn btn-primary btn-lg" onClick={this.handleClick.bind(this,"es")}> Español </button>
              </div>
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

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
    const className=`hero-section container {styles.topStyles}`
    return (
      <header className={className}  >
        <div className="row">
          <div className="col-md-12">
            <br/>
                        <br/>
            <br/>
            <h2> Admin</h2>
            <br/>
            <br/>
            <div style={{whiteSpace: "pre-line"}}>
              {
                languageHelper.tr("Admin_Choose_Language",language)
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
    browserHistory.push('/admin/login')
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

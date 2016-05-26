import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import StoresDropDown from './StoresDropDown'

import * as languageHelper  from '../../../common/helpers/language'
import * as actions  from '../actions'
import * as api from '../../../common/middleware/botengine'


class EnterStore extends Component {
  constructor(props) {
    super(props)
    this.setStoreId = this.setStoreId.bind(this)
    this.renderSelectStore = this.renderSelectStore.bind(this)
    this.renderSelectCode = this.renderSelectCode.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.storeId=""
  }
  handleCode() {
    const self = this
    if (this.storeCode.value) {
      api.bootSurvey(this.storeCode.value)
      .then(function(variables) {
        if (variables) {
          self.props.setupSurveyVariables(variables)
          if (variables.IsSingleUse) {
            self.setStoreId(variables.LocationId, variables.LocationCaption)
            self.handleClick()
          }
        } else {
          browserHistory.push("/SurveyNotFound")

        }
      })
      .catch(function(doh) {
        console.log("error getting system variables.", doh)
        browserHistory.push("/SurveyNotFound")
      })
    } else {
      alert("please enter the code assigned to you.")
      console.log("missing code.")
    }
  }
  handleClick() {
    self = this
    this.props.selectStore(this.storeId, this.storeCaption)

    api.getManagers(this.props.customerId, this.storeId)
    .then(function(managers) {
      self.props.loadedManagers(managers)
    })
    .catch(function(doh) {
      console.log(doh)
      self.props.loadedManagers([])
    })

    setTimeout(
      browserHistory.push("/StoreSurvey/" + this.storeId),
      10
    )

  }

  handleCancel() {
    browserHistory.push("/surveys")
  }
  setStoreId(id, caption) {
    this.storeId = id
    this.storeCaption=caption
  }

  renderSelectStore() {
    const {language, areas, stores, handleCancel} = this.props
    return (
      <div>
        <br/>
        <span style={{fontWeight: "bold", fontSize: "large"}}> { languageHelper.tr("Please select your store",language)} </span>
        <br/>
        <br/>
        <StoresDropDown areas={areas} stores={stores} setStoreId={this.setStoreId} />

        <br/>
      </div>
    )
  }
  renderSelectCode() {
    const {language, areas, stores, handleCancel} = this.props
    return (
      <div>
        <br/>
        <span style={{fontWeight: "bold", fontSize: "large"}}> { languageHelper.tr("Please enter the code assigned to you",language)} </span>
        <br/>
        <br/>
        <input type="text"  ref={(ref) => this.storeCode = ref } ></input>
          <div>
            <br/>
            <br/>
            <span className="btn">
              <button className="btn btn-primary btn-lg" onClick={this.handleCode.bind(this)}>
                { languageHelper.tr("4",language)}
              </button>

            </span>
            <span className="btn">
              <button className="btn btn-lg btn-danger" onClick={this.handleCancel.bind(this)}>
                { languageHelper.tr("Cancel", language)}
              </button>
            </span>

          </div>
      </div>

    )
  }
  render() {
    const {language, areas, stores, handleCancel} = this.props
    if (!this.props.code) {
      return (
        <div className="col-md-12 text-center">
          { this.renderSelectCode() }

        </div>
      )
    } else {
      return (
        <div className="col-md-12 text-center">
          { this.renderSelectStore() }
          <div>
            <br/>
            <br/>
            <span className="btn">
              <button className="btn btn-primary btn-lg" onClick={this.handleClick.bind(this)}>
                { languageHelper.tr("4",language)}
              </button>

            </span>
            <span className="btn">
              <button className="btn btn-lg btn-danger" onClick={this.handleCancel.bind(this)}>
                { languageHelper.tr("Cancel", language)}
              </button>
            </span>

          </div>
        </div>
      )
    }

  }
}

export default connect(
  (state) => (
    {
      language: state.login.language,
      areas: state.admin.areas,
      stores: state.admin.stores,
      code: state.admin.code,
      customerId: state.admin.customerId ||1
    }
  ),
  actions
)(EnterStore)

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import StoresDropDown from './StoresDropDown'

import * as languageHelper  from '../helpers/language'
import * as actions from '../actions/survey'


class EnterStore extends Component {
  constructor(props) {
    super(props)
    this.setStoreId = this.setStoreId.bind(this)
    this.storeId=""
  }
  handleClick() {
    actions.selectStore(this.storeId, this.storeCaption)
    browserHistory.push("/StoreSurvey/" + this.storeId)

  }
  handleCancel() {
    browserHistory.push("/")
  }
  setStoreId(id, caption) {
    console.log("setting store id to ", id, " ", caption)
    this.storeId = id
    this.storeCaption=caption
  }
  render() {
    const {language, areas, stores, handleCancel} = this.props
    return (
      <div className="col-md-12 text-center">
        <div>
          <br/>
          <span style={{fontWeight: "bold", fontSize: "large"}}> { languageHelper.tr("Please select your store",language)} </span>
          <br/>
          <br/>
          <StoresDropDown areas={areas} stores={stores} setStoreId={this.setStoreId} />

          <br/>
        </div>
        <div>
          <br/>
          <span style={{fontWeight: "bold", fontSize: "large"}}> { languageHelper.tr("Please enter the code assigned to you",language)} </span>
          <br/>
          <br/>
          <input type="text"  ref={(ref) => this.storeCode = ref } ></input>
        </div>
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

export default connect(
  (state) => (
    {
      language: state.login.language,
      areas: state.admin.areas,
      stores: state.admin.stores
    }
  )
)(EnterStore)

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'

import Dashboard from '../components/Dashboard'

const Container = (props) => (<Dashboard />)
function mapStateToProps(state) {
  return {
    language:  "en",
    areas: state.admin.areas || [],
    stores: state.admin.stores || []
  }
}

export default connect(mapStateToProps,actionCreators)(Container)

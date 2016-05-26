import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'

import Codes from '../components/codes'


class Container extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return <Codes locationId={this.props.params.locationId}/>
  }
}

export default connect(
  (state, ownProps) => (
    {
      email: state.login.email,
      isLoggedIn: state.login.isLoggedIn
    }
  ),
  actionCreators

)(Container)

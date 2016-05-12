import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Nav extends Component {
  constructor(props) {
    super(props)
  }

  renderLoginSnippet() {
    const {isLoggedIn, email } = this.props
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
            { isLoggedIn && <Link to="/Dashboard"> {email} </Link> }
            { !isLoggedIn && <Link to="/login" className="glyphicon glyphicon-log-in"> Admin </Link> }

        </li>
      </ul>

    )
  }
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href='/surveys'><img src="/img/leye-logo-white.png"></img></a>
          </div>
          { this.renderLoginSnippet.bind(this)() }
        </div>
      </nav>
    )
  }
}

Nav.defaultProps = {
  isLoggedIn: false,
  email: ""
}
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.login.isLoggedIn,
    email: state.login.email,
  }
}

export default connect(mapStateToProps, {

})(Nav)

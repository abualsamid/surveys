import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import * as api from '../../../common/middleware/botengine'
import { browserHistory } from 'react-router'


import * as actionCreators from '../actions'
// https://developers.google.com/identity/sign-in/web/server-side-flow



function responseGoogle(googleUser) {
  // console.log('response from google: ', googleUser);


  // if (authResult['code']) {
  //
  //   // Hide the sign-in button now that the user is authorized, for example:
  //
  //   // Send the code to the server
  //   // dispatch redux action to go to server
  //
  //   $.ajax({
  //     type: 'POST',
  //     url: 'http://example.com/storeauthcode',
  //     contentType: 'application/octet-stream; charset=utf-8',
  //     success: function(result) {
  //       // Handle or verify the server response.
  //     },
  //     processData: false,
  //     data: authResult['code']
  //   });
  // } else {
  //   // dispatch redux action to show error
  //   // There was an error.
  // }
}

class LoginForm extends Component{
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    if (this.email && this.email.value ) {
      const profile = {email: this.email.value}
      const self = this;
      api
      .login({email: this.email.value, password: this.password.value})
      .then(function(res) {
        if (!res ||   !res.Token ||  !res.email) {
          console.log("login failed.  ", res)
          self.props.failure("",null)
        } else {
          if (window.sessionStorage) {
            sessionStorage.setItem('token',res.Token)
            sessionStorage.setItem('email',res.email)
          }

          self.props.success( res.Token || "nocando", res)
        }
      }).catch(function(doh) {
        console.log("login issue: ", doh)
      })
    }
  }
  renderGoogleLogin() {
    return (
      <div>
        <GoogleLogin
          clientId="789684712804-nr7p56u4grev55ct6lkujc7ih3pfpmeq.apps.googleusercontent.com"
          callback={this.googleResponse} />
      </div>
    )
  }
  render() {
    const { isLoggedIn, email } = this.props
    if (isLoggedIn) {
      return (
        <div>
          You are authenticated as { email }
        </div>
      )
    } else {
        return (
          <div>
            <div className='form'>
              <div className="form-group">
                <label>email</label>
                <input className="form-control" type="text" ref={(ref) => this.email = ref}></input>
              </div>
              <div className="form-group">
                <label>password</label>
                <input className="form-control" type="password" ref={(ref) => this.password = ref }></input>
              </div>
              <button className="btn btn-primary btn-lg" onClick={this.handleClick}>Submit</button>
            </div>
          </div>
        )
    }
  }
}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.googleResponse = this.googleResponse.bind(this)
    this.processLogin = this.processLogin.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.state = { email: this.props.email, isLoggedIn: this.props.isLoggedIn};
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }



  // this called for the Google login button.
  processLogin(profile) {
    console.log("In process login ...\n ");
    const { successfulLogin, failedLogin } = this.props
    const { router } = this.context
    try {
      // console.log(JSON.stringify(profile));
      fetch(API_ROOT  + "token-auth", {
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        method:"POST",
        body: JSON.stringify(profile)
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(token) {
        if (window.sessionStorage) {
          sessionStorage.setItem('token',token.token)
        }
        successfulLogin(token.token || "", profile)
        browserHistory.push('/admin/dashboard')
      })
      .catch(function(err) {
        console.log("Error in process login:", err)
        failedLogin()
      })
    } catch(x) {
      console.log(x);
    }
  }

  googleResponse(googleUser) {

    try {
      var profile = googleUser.getBasicProfile();
      var auth = googleUser.getAuthResponse();
      var id_token = auth.id_token;
      this.processLogin({
          "id": auth.idpId + "/" + profile.getId(),
          "sourceId": profile.getId(),
          "name": profile.getName(),
          "email": profile.getEmail(),
          "imageURL": profile.getImageUrl(),
          "access_token": auth.access_token,
          "id_token": auth.id_token,
          "idpId": auth.idpId,
          "expires_at": auth.expires_at,
          "expires_in": auth.expires_in,
          "first_issued_at": auth.first_issued_at,
          "login_hint": auth.login_hint,
          "scope": auth.scope
      });

    } catch(x) {
      console.log(x);
    }
  }

  onSuccess(token, profile ) {
    const { successfulLogin, failedLogin } = this.props
    profile.token = token
    this.setState({isLoggedIn: true, email: profile.email})
    successfulLogin(token, profile)
    browserHistory.push('/admin/dashboard')

  }
  onFailure() {
    alert("failed to login.")
  }

  render() {
    return (
      <div className="container">
        <LoginForm email={this.state.email} isLoggedIn={this.state.isLoggedIn} success={this.onSuccess} failure={this.onFailure} />
      </div>
    )
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default connect(
  (state, ownProps) => (
    {
      email: state.login.email,
      isLoggedIn: state.login.isLoggedIn
    }
  ),
  actionCreators

)(LoginPage)

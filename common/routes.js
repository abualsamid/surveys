import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import StoreSurvey from './containers/StoreSurvey'
import ManagerSurvey from './containers/ManagerSurvey'
import LoginPage from './containers/loginPage'
import SignupPage from './containers/SignupPage'
import LogoutPage from './containers/LogoutPage'
import Home from './components/home'
import EnterStore from './components/EnterStore'
import Admin from './containers/Admin'
import Dashboard from './containers/Dashboard'
import NotFound from './containers/NotFound'

export default (
  <Route path="/surveys" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/Store" component={EnterStore} />
    <Route path="/ManagerSurvey" component={ManagerSurvey} />
    <Route path="/StoreSurvey/:storeId" component={StoreSurvey} />
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/logout" component={LogoutPage} />
    <Route path="/admin" component={Admin}  />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/SurveyNotFound" component={NotFound} />
  </Route>
)

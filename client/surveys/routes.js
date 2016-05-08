import React from 'react'
import  { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import StoreSurvey from './containers/StoreSurvey'
import ManagerSurvey from './containers/ManagerSurvey'
import Home from './components/home'
import EnterStore from './components/EnterStore'
import ThankYou from './components/ThankYou'
import Login from './containers/loginPage'
import Dashboard from './containers/dashboard'
import Notfound from './containers/notFound'

export default (
  <Route path="/surveys" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/surveys.html" component={Home} />
    <Route path="/Store" component={EnterStore} />
    <Route path="/ManagerSurvey" component={ManagerSurvey} />
    <Route path="/StoreSurvey/:storeId" component={StoreSurvey} />
    <Route path="/ThankYou" component={ThankYou} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/SurveyNotFound" component={Notfound} />
  </Route>
)

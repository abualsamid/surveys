import React from 'react'
import  { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Home from './components/home'
import Dashboard from './containers/dashboard'
import Login from './containers/loginPage'
import Logout from './containers/logoutPage'
import Codes from './containers/codes'
import Questions from './containers/questions'
import Results from './containers/results'

export default (
  <Route path="/admin" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/admin/dashboard" component={Dashboard} />
    <Route path="/admin/questions" component={Questions} />
    <Route path="/admin/dashboard/codes/:locationId" component={Codes} />
    <Route path="/admin/login" component={Login} />
    <Route path="/admin/logout" component={Logout} />
    <Route path="/logout" component={Logout} />
    <Route path="/login" component={Login} />
    <Route path="/admin/results" component={Results} />
    <Route path="*" component={Home} />
  </Route>
)

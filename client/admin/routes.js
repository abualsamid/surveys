import React from 'react'
import  { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Home from './components/home'
import Dashboard from './containers/dashboard'
import Login from './containers/loginPage'
import Logout from './containers/logoutPage'

export default (
  <Route path="/admin" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="*" component={Home} />
  </Route>
)

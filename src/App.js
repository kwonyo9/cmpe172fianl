//test comment
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Movie from './views/Movies'
import Seats from './views/Seats'
import Navigation from './Navigation'
import Login from './views/Login'
//change//
import './App.css'
class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path='/dashboard' component={Movie} exact />
            <Route path='/seats' component={Seats} exact />
            <Route path='/' component={Login} exact />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App

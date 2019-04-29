import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NoMatch from './NoMatch'

import Home from './Home'
import Notice from './Notice'
import THome from './THome'
import ArticlePage from './ArticlePage'
import Profile from './Profile'
import Visit from './Visit'

import textEditorPage from './Page/textEditorPage'
import Join from './Page/Join'
import Settings from './Page/Settings'

const MainPage = props => {
  const token = window.localStorage.getItem('token')
  const { history } = props
  if (token) {
    return <THome component={history} />
  } else {
    return <Home component={history} />
  }
}

class App extends Component {
  render () {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/notice' component={Notice} />
            <Route path='/join' component={Join} />
            <Route path='/textEditorPage' component={textEditorPage} />
            <Route path='/article/:id' component={ArticlePage} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/visit/:id' component={Visit} />
            <Route path='/settings/profile' component={Settings} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App

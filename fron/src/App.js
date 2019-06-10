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
import Editor1 from './Editor'

import textEditorPage from './Page/textEditorPage'
import Join from './Page/Join'
import Settings from './Page/Settings'
import Agreement from './Page/Agreement'
import BookPage from './Page/BookPage'
import MoviePage from './Page/MoviePage'
import BookDetailPage from './Page/BookDetailPage'
import MovieDetailPage from './Page/MovieDetailPage'
import FigureDetailPage from './Page/FigureDetailPage'

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
            <Route exact path='/book' component={BookPage} />
            <Route path='/book/:id' component={BookDetailPage} />
            <Route exact path='/movie' component={MoviePage} />
            <Route path='/movie/:id' component={MovieDetailPage} />
            <Route path='/figure/:id' component={FigureDetailPage} />
            <Route path='/join' component={Join} />
            <Route path='/textEditorPage' component={textEditorPage} />
            <Route path='/article/:id' component={ArticlePage} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/visit/:id' component={Visit} />
            <Route path='/settings/profile' component={Settings} />
            <Route path='/agreement' component={Agreement} />
            <Route path='/editor' component={Editor1} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App

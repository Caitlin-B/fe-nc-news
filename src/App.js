import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Home from './components/Home';
import Header from './components/Header';
import Nav from './components/Nav';
import Topics from './components/Topics';
import Article from './components/Article';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import * as api from './api';

class App extends Component {
  state = { loggedInUser: null };

  render() {
    return (
      <div className='App'>
        <Header />
        <Nav />
        <Router>
          <Home path='/' />
          <Topics path='/topics/:topic' />
          <Article
            path='/articles/:article_id'
            loggedInUser={this.state.loggedInUser}
          />
          <LogIn path='/login' logUserIn={this.logUserIn} />
          <SignUp path='/signup' logUserIn={this.logUserIn} />
        </Router>
      </div>
    );
  }

  logUserIn = (e, username, password) => {
    e.preventDefault();
    api.postLogIn(username, password).then(() => {
      this.setState({ loggedInUser: username });
    });
  };
}

export default App;

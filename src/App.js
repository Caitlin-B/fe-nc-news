import React, { Component } from 'react';
import './App.css';
import { Router, navigate} from '@reach/router';
import Home from './components/Home';
import Header from './components/Header';
import Nav from './components/Nav';
import Topics from './components/Topics';
import Article from './components/Article';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import * as api from './api';
import User from './components/User';
import ErrorPage from './components/ErrorPage';

class App extends Component {
  state = { loggedInUser: null, invalidUser: false };

  render() {
    return (
      <div className='App'>
        <Header logUserOut={this.logUserOut} />
        <Nav />
        <Router>
          <Home path='/' />
          <Topics path='/topics/:topic' />
          <Article
            path='/articles/:article_id'
            loggedInUser={this.state.loggedInUser}
          />
          <LogIn
            path='/login'
            logUserIn={this.logUserIn}
            invalidUser={this.state.invalidUser}
          />
          <SignUp path='/signup' logUserIn={this.logUserIn} />
          <User path='/user/:username' />
          <ErrorPage path='/*' err={{ msg: 'Not Found!', status: 404 }} />
        </Router>
      </div>
    );
  }

  logUserIn = (e, username, password) => {
    e.preventDefault();
    api
      .postLogIn(username, password)
      .then(() => {
        this.setState({ loggedInUser: username, invalidUser: false });
        navigate(`/user/${username}`);
      })
      .catch(() => {
        this.setState({ invalidUser: true });
      });
  };

  logUserOut = () => {
    localStorage.clear();
    this.setState({ loggedInUser: null });
  };
}

export default App;

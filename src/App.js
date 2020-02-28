import React, { Component } from 'react';
import './App.css';
import { Router, navigate } from '@reach/router';
import Header from './components/Header';
import Nav from './components/Nav';
import Topics from './components/Topics';
import Article from './components/Article';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import * as api from './api';
import User from './components/User';
import ErrorPage from './components/ErrorPage';
import InfiniteScroller from './components/InfiniteScroller';

class App extends Component {
  state = { loggedInUser: null, invalidUser: false, topics: [] };

  render() {
    return (
      <div className='App'>
        <Header logUserOut={this.logUserOut} />
        <Nav topics={this.state.topics} />
        <Router>
          <InfiniteScroller path='/' addTopic={this.addTopic} />
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

  componentDidMount() {
    api.fetchTopics().then(topics => {
      this.setState({ topics });
    });
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

  addTopic = (e, slug, description) => {
    e.preventDefault();

    api.postTopic(slug, description).then(topic => {
      this.setState(currentState => {
        return { topics: currentState.topics.concat(topic) };
      });
      navigate(`/topics/${topic.slug}`);
    });
  };
}

export default App;

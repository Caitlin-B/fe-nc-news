import React, { Component } from 'react';
import * as api from '../api';
import {navigate} from '@reach/router'

class SignUp extends Component {
  state = { username: '', avatar_url: '', name: '', password: '' };

  render() {
    return (
      <form onSubmit={this.signUserUp}>
        <label>
          Name:{' '}
          <input
            type='text'
            onChange={e => {
              this.handleChange(e, 'name');
            }}
          />
        </label>
        <br></br>
        <label>
          Username:{' '}
          <input
            type='text'
            onChange={e => {
              this.handleChange(e, 'username');
            }}
          />
        </label>
        <br></br>
        <label>
          Password:{' '}
          <input
            type='text'
            onChange={e => {
              this.handleChange(e, 'password');
            }}
          />
        </label>
        <br></br>
        <label>
          Avatar Url:{' '}
          <input
            type='text'
            onChange={e => {
              this.handleChange(e, 'avatar_url');
            }}
          />
        </label>
        <button>Create Account</button>
      </form>
    );
  }
  handleChange = (e, input) => {
    this.setState({ [input]: e.target.value });
  };

  signUserUp = e => {
    e.preventDefault();
    api.postUser(this.state).then(() => {
      this.props.logUserIn(e, this.state.username, this.state.password);
    });
    navigate('/')
  };
}

export default SignUp;

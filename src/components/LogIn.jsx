import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';

class LogIn extends Component {
  state = { username: '', password: '' };
  render() {
    const { username, password } = this.state;
    return (
      <div>
        <form
          onSubmit={e => {
            this.props.logUserIn(e, username, password);
            navigate('/')
          }}>
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
          <button>Sign in</button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to='/signup'>
            <button>Sign up</button>
          </Link>
        </p>
      </div>
    );
  }

  handleChange = (e, input) => {
    this.setState({ [input]: e.target.value });
  };


}

export default LogIn;

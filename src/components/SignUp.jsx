import React, { Component } from 'react';
import * as api from '../api';
import {navigate} from '@reach/router';
import styles from './SignUp.module.css'

class SignUp extends Component {
  state = { username: '', avatar_url: '', name: '', password: '' };

  render() {
    return (
      <div className={styles.signup_form_block}>
      <form className={styles.signup_form} onSubmit={this.signUserUp}>
        <label>
          <div className={styles.form_input}>
          Name:{' '}
          <input className={styles.text_input}
            type='text'
            onChange={e => {
              this.handleChange(e, 'name');
            }} required
          />
          </div>
        </label>
        <br></br>
        <label>
        <div className={styles.form_input}>
          Username:{' '}
          <input className={styles.text_input}
            type='text'
            onChange={e => {
              this.handleChange(e, 'username');
            }} required
          />
          </div>
        </label>
        <br></br>
        <label>
        <div className={styles.form_input}>
          Password:{' '}
          <input className={styles.text_input}
            type='text'
            onChange={e => {
              this.handleChange(e, 'password');
            }} required
          />
          </div>
        </label>
        <br></br>
        <label>
        <div className={styles.form_input}>
          Avatar Url:{' '}
          <input className={styles.text_input}
            type='text'
            onChange={e => {
              this.handleChange(e, 'avatar_url');
            }}
          />
          </div>
        </label>
        <br></br>
        <button className={styles.signup_button}>Create Account</button>
      </form>
      </div>
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

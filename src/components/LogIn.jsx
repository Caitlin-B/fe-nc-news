import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';
import styles from './LogIn.module.css';

class LogIn extends Component {
  state = { username: '', password: '' };
  render() {
    const { username, password } = this.state;
    return (
      <div className={styles.login_form_block}>
        <form className={styles.login_form}
          onSubmit={e => {
            this.props.logUserIn(e, username, password);
            navigate('/');
          }}>
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
          <button className={styles.login_button}>Sign in</button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to='/signup'>
            <button className={styles.login_button}>Sign up</button>
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

import React from 'react';
import { Link, navigate } from '@reach/router';
import styles from './Header.module.css';

const Header = props => {
  return (
    <div>
      <header className={styles.App_header}>
          <h1 className={styles.NC_logo}>
            <button className={styles.NC_logo_button} onClick={() => {navigate('/')}}>NC News</button>
          </h1>
        {!localStorage.username ? (
          <div>
            <Link to='/login'>
              <button className={styles.login_button}>Log in</button>
            </Link> {' '}
            <Link to='/signup'>
              <button className={styles.login_button}>Sign up</button>
            </Link>
          </div>
        ) : (
          <div>
            <p className={styles.logged_in_text}>
              logged in as <button
                  className={styles.user_button}
                  onClick={() => navigate(`/user/${localStorage.username}`)}>
                  {' '}
                  {localStorage.username}
                </button>
              <button className={styles.logout_button}
                onClick={props.logUserOut}>
                Log out
              </button>
            </p>{' '}
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;

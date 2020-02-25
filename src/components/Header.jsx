import React from 'react';
import {Link} from '@reach/router'

const Header = (props) => {
  return (
    <div>
      <header className='App-header'>
        <Link to='/'>
          <h1 className='NC-logo'>
            <button className='NC-logo-button'>NC News</button>
          </h1>
        </Link>
        {!localStorage.username ? <div>
          <Link to='/login'>
          <button>Log in</button>
          </Link>
          <Link to='/signup'>
          <button>Sign up</button>
          </Link>
        </div> : <div><p>logged in as {localStorage.username} <button onClick={() => {localStorage.clear()}}>Log out</button></p> </div>}
      </header>
    </div>
  );

};

export default Header;
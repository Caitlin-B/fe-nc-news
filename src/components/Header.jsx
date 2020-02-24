import React from 'react';
import {Link} from '@reach/router'

const Header = () => {
  return (
    <div>
      <header className='App-header'>
        <Link to='/'>
          <h1 className='NC-logo'>
            <button className='NC-logo-button'>NC News</button>
          </h1>
        </Link>
        <div className=''>
          <button>Log in</button>
          <button>Sign up</button>
        </div>
      </header>
    </div>
  );
};

export default Header;
import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Home from './components/Home';
import Header from './components/Header';
import Nav from './components/Nav';
import Topics from './components/Topics';
import Article from './components/Article'

function App() {
  return (
    <div className='App'>
      <Header />
      <Nav />
      <Router>
        <Home path='/' />
        <Topics path='/topics/:topic' />
        <Article path='/articles/:article_id'/>
      </Router>
    </div>
  );
}

export default App;

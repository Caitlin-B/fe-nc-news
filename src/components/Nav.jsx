import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';
import styles from './Nav.module.css'

class Nav extends Component {
  state = { topics: [] };

  render() {
    const { topics } = this.state;

    return <div className={styles.nav_bar}>
    {topics.map(topic => {
      return (
        <Link to={`/topics/${topic.slug}`} key={topic.slug} className={styles.topic_link} style={{textDecoration:'none'}}>
          <div>{topic.slug}</div>
        </Link>
      );
    })}
    </div>
  }

  componentDidMount() {
    api.fetchTopics().then(topics => {
      this.setState({ topics });
    });
  }
}

export default Nav;

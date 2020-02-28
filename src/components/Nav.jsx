import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';
import styles from './Nav.module.css'

class Nav extends Component {

  render() {
    const { topics } = this.props;
    return <div className={styles.nav_bar}>
    {topics.map(topic => {
      const formattedTopicName= topic.slug.charAt(0).toUpperCase()+topic.slug.slice(1,topic.slug.length);

      return (
        <Link to={`/topics/${topic.slug}`} key={topic.slug} className={styles.topic_link} style={{textDecoration:'none'}}>
          <div>{formattedTopicName}</div>
        </Link>
      );
    })}
    </div>
  }

  // componentDidMount() {
  //   api.fetchTopics().then(topics => {
  //     this.setState({ topics });
  //   });
  // }
}

export default Nav;

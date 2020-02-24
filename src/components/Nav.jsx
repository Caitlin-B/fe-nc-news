import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';

class Nav extends Component {
  state = { topics: [] };

  render() {
    const { topics } = this.state;

    return topics.map(topic => {
      return (
        <Link to={`/topics/${topic.slug}`} key={topic.slug}>
          <div>{topic.slug}</div>
        </Link>
      );
    });
  }

  componentDidMount() {
    api.fetchTopics().then(topics => {
      this.setState({ topics });
    });
  }
}

export default Nav;

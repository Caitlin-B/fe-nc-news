import React, { Component } from 'react';
import ArticlesList from './ArticlesList';
import * as api from '../api';

class Home extends Component {
  state = {
    articles: [],
    isLoading: true
  };

  render() {
    const { articles, isLoading } = this.state;
    return (
      <div>
        {isLoading ? <p>loading...</p> : <ArticlesList articles={articles} />}
      </div>
    );
  }

  componentDidMount() {
    api.fetchArticles().then(articles => {
      this.setState({ articles, isLoading: false });
    });
  }
}

export default Home;

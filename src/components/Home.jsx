import React, { Component } from 'react';
import ArticlesList from './ArticlesList';
import * as api from '../api';
import SortArticles from '../components/SortArticles'

class Home extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortBy: ''
  };

  render() {
    const { articles, isLoading } = this.state;
    return (
      <div>
        <SortArticles filterOptions={this.filterOptions}/>
        {isLoading ? <p>loading...</p> : <ArticlesList articles={articles} />}
      </div>
    );
  }

  filterOptions = (event) => {
    const splitFilter = event.target.value.split('.');
    const sort_by = splitFilter[0];
    const order = splitFilter[1];
    api.fetchArticles({sort_by, order}).then(articles => {
      this.setState({articles})
    })
  }

  componentDidMount() {
    api.fetchArticles().then(articles => {
      this.setState({ articles, isLoading: false });
    });
  }
}

export default Home;

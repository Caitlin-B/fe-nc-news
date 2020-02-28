import React, { Component } from 'react';
import ArticlesList from './ArticlesList';
import * as api from '../api';
import SortArticles from './SortArticles';
import throttle from 'lodash/throttle';
import Toggle from './Toggle';
import AddTopic from './AddTopic'

class InfiniteScroller extends Component {
  state = {
    data: [],
    isLoading: true,
    page: 1,
    hasAllItems: false,
    sort_by: undefined,
    order: undefined
  };

  render() {
    const { data, isLoading } = this.state;
    return (
      <section>
        <SortArticles filterOptions={this.filterOptions} />
        {this.props.addTopic && (
          <Toggle buttonMessage='Add a new topic'>
            <AddTopic addTopic={this.props.addTopic}/>
          </Toggle>
        )}
        {isLoading ? <p>loading...</p> : <ArticlesList articles={data} />}
      </section>
    );
  }

  componentDidMount() {
    this.fetchData(this.props.topic);
    this.addScrollEventListener();
  }

  componentDidUpdate(prevProps) {
    if (this.props.topic !== prevProps.topic) {
      this.setState({ data: [], page: 1 }, () => {
        this.fetchData(this.props.topic);
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  filterOptions = event => {
    const splitFilter = event.target.value.split('.');
    const sort_by = splitFilter[0];
    const order = splitFilter[1];

    this.setState({ data: [], page: 1, sort_by, order }, () => {
      this.fetchData(this.props.topic);
    });
  };

  addScrollEventListener = () => {
    window.addEventListener('scroll', this.handleScroll);
  };

  handleScroll = throttle(event => {
    const distanceFromTop = window.scrollY;
    const heightOfScreen = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    if (distanceFromTop + heightOfScreen === documentHeight) {
      this.fetchData(this.props.topic);
    }
  }, 2000);

  fetchData = topic => {
    const { sort_by, order, page } = this.state;
    return api
      .fetchArticles({ p: page, sort_by, order, topic })
      .then(({ articles }) => {
        this.setState(currentState => {
          return {
            data: currentState.data.concat(articles),
            isLoading: false,
            page: currentState.page + 1
          };
        });
      });
  };
}

export default InfiniteScroller;

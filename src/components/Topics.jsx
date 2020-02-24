import React, { Component } from 'react';
import * as api from '../api';
import ArticlesList from '../components/ArticlesList';

class Topics extends Component {
  state = { articlesByTopic: [], topicDescription: '' };

  render() {
    return (
      <>
        <h2>{this.props.topic}</h2>
        <h3>{this.state.topicDescription}</h3>
        <ArticlesList articles={this.state.articlesByTopic} />
      </>
    );
  }

  componentDidMount() {
    const { topic } = this.props;

    api.fetchArticles({ topic }).then(articles => {
      this.setState({ articlesByTopic: articles });
    });

    api.fetchTopics().then(topics => {
      return topics.filter(eachTopic => {
        return eachTopic.slug === topic
      })
    }).then(([topic]) => {
      this.setState({topicDescription: topic.description})
    })
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props;

    if (topic !== prevProps.topic) {
      api.fetchArticles({ topic }).then(articles => {
        this.setState({ articlesByTopic: articles });
      });
      api.fetchTopics().then(topics => {
        return topics.filter(eachTopic => {
          return eachTopic.slug === topic
        })
      }).then(([topic]) => {
        this.setState({topicDescription: topic.description})
      })
    }
  }
}

export default Topics;

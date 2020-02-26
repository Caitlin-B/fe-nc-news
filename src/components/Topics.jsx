import React, { Component } from 'react';
import * as api from '../api';
import ArticlesList from '../components/ArticlesList';
import SortArticles from '../components/SortArticles';
import styles from './Topics.module.css';
import Toggle from '../components/Toggle';
import PostArticle from './PostArticle';


class Topics extends Component {
  state = { articlesByTopic: [], topicDescription: '' };

  render() {
    const {topic} = this.props;
    return (
      <>
      <div className={styles.topic_heading}>
        <h2 className={styles.topic_title}>{topic}</h2> 
        <h3 className={styles.topic_description}>{this.state.topicDescription}</h3>
        </div>
        <Toggle buttonMessage={`Post an article about ${topic}`}>
        <PostArticle topic={topic}/>
        </Toggle>
        <SortArticles filterOptions={this.filterOptions} />
        <ArticlesList articles={this.state.articlesByTopic} />
      </>
    );
  }

  filterOptions = event => {
    const splitFilter = event.target.value.split('.');
    const sort_by = splitFilter[0];
    const order = splitFilter[1];
    api.fetchArticles({ sort_by, order }).then(articles => {
      this.setState({ articles });
    });
  };

  componentDidMount() {
    const { topic } = this.props;

    api.fetchArticles({ topic }).then(articles => {
      this.setState({ articlesByTopic: articles });
    });

    api
      .fetchTopics()
      .then(topics => {
        return topics.filter(eachTopic => {
          return eachTopic.slug === topic;
        });
      })
      .then(([topic]) => {
        this.setState({ topicDescription: topic.description });
      });
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props;

    if (topic !== prevProps.topic) {
      api.fetchArticles({ topic }).then(articles => {
        this.setState({ articlesByTopic: articles });
      });
      api
        .fetchTopics()
        .then(topics => {
          return topics.filter(eachTopic => {
            return eachTopic.slug === topic;
          });
        })
        .then(([topic]) => {
          this.setState({ topicDescription: topic.description });
        });
    }
  }
}

export default Topics;

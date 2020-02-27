import React, { Component } from 'react';
import * as api from '../api';
import styles from './Topics.module.css';
import Toggle from '../components/Toggle';
import PostArticle from './PostArticle';
import InfiniteScroller from './InfiniteScroller';


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
          <br></br>
        <PostArticle topic={topic}/>
        </Toggle>
        <InfiniteScroller topic={topic}/>
      </>
    );
  }

  componentDidMount() {
    const { topic } = this.props;

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

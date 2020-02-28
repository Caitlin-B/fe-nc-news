import React, { Component } from 'react';
import * as api from '../api';
import styles from './Topics.module.css';
import Toggle from '../components/Toggle';
import PostArticle from './PostArticle';
import InfiniteScroller from './InfiniteScroller';
import ErrorPage from './ErrorPage'


class Topics extends Component {
  state = { articlesByTopic: [], topicDescription: '', err: false };

  render() {
    const {topic} = this.props;
    const formattedTopicName= topic.charAt(0).toUpperCase()+topic.slice(1,topic.length);
    
    return (
      <>
      {this.state.err ? <ErrorPage err={{ msg: 'Not Found!', status: 404 }} /> : (<>
      <div className={styles.topic_heading}>
        <h2 className={styles.topic_title}>{formattedTopicName}</h2> 
        <h3 className={styles.topic_description}>{this.state.topicDescription}</h3>
        </div>
        <Toggle buttonMessage={`Post an article about ${topic}`}>
          <br></br>
        <PostArticle topic={topic}/>
        </Toggle>
        <InfiniteScroller topic={topic}/></>)}
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
      }).catch(() => {
        this.setState({err: true})
      })
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

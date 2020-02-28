import React, { Component } from 'react';
import styles from './AddTopic.module.css';
import * as api from '../api';
import { navigate } from '@reach/router';

class AddTopic extends Component {
  state = { slug: '', description: '' };

  render() {
    return (
      <div>
        <form onSubmit={this.postTopic}>
          <section className={styles.post_topic_form}>
            <label>
              <div className={styles.topic_input_block}>
                Topic Name:{' '}
                <input
                  type='text'
                  className={styles.topic_name_input}
                  onChange={e => {
                    this.handleChange(e, 'slug');
                  }}
                  required
                />
              </div>
            </label>
            <br></br>
            <label>
              <div className={styles.topic_input_block}>
                Description:{' '}
                <input
                  type='text'
                  className={styles.topic_input}
                  onChange={e => {
                    this.handleChange(e, 'description');
                  }}
                  required
                />
              </div>
            </label>
          </section>
          <button className={styles.submit_topic_button}>Submit</button>
        </form>
      </div>
    );
  }

  handleChange = (e, input) => {
    this.setState({ [input]: e.target.value });
  };

  postTopic = e => {
    e.preventDefault();
    const { slug, description } = this.state;

    api.postTopic(slug, description).then(topic => {
      this.setState({ slug: '', description: '' });
      // navigate(`/topics/${topic.slug}`)
    });
  };
}

export default AddTopic;

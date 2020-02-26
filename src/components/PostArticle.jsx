import React, { Component } from 'react';
import * as api from '../api';
import { navigate } from '@reach/router';
import styles from './PostArticle.module.css';

class PostArticle extends Component {
  state = {
    title: '',
    body: '',
    err: false
  };
  render() {
    return (
      <div>
        <form onSubmit={this.postTopic}>
          <section className={styles.post_article_form}>
            <label>
              <div className={styles.article_input_block}>
                Title:{' '}
                <input
                  type='text'
                  className={styles.article_input}
                  onChange={e => {
                    this.handleChange(e, 'title');
                  }}
                  required
                />
              </div>
            </label>
            <br></br>
            <label>
              <div className={styles.article_input_block}>
                Article:{' '}
                <input
                  type='text'
                  className={styles.article_input}
                  onChange={e => {
                    this.handleChange(e, 'body');
                  }}
                  required
                />
              </div>
            </label>
          </section>
          <button className={styles.submit_article_button}>Submit</button> {this.state.err && <span className={styles.err_msg}>you must be logged in to post an article!</span>}
        </form>
      </div>
    );
  }

  handleChange = (e, input) => {
    this.setState({ [input]: e.target.value });
  };

  postTopic = e => {
    e.preventDefault();
    const { topic } = this.props;
    const { title, body } = this.state;
    const { username } = localStorage;

    api
      .postArticle({ topic, title, body, username })
      .then(article_id => {
        navigate(`/articles/${article_id}`);
      })
      .catch(() => {
        this.setState({err: true})
      });
  };
}

export default PostArticle;

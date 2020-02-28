import React, { Component } from 'react';
import * as api from '../api';
import styles from './AddComment.module.css';

class AddComment extends Component {
  state = { commentBody: '', err: false };
  render() {
    return (
      <form onSubmit={this.postComment}>
        <input
          type='text'
          className={styles.comment_input}
          value={this.state.commentBody}
          onChange={this.handleChange}
          required></input>{' '}
        <button className={styles.submit_comment_button}>Submit</button>{' '}
        {this.state.err && (
          <p className={styles.err_msg}>
            you must be logged in to post a comment!
          </p>
        )}
      </form>
    );
  }

  handleChange = event => {
    this.setState({ commentBody: event.target.value });
  };

  postComment = event => {
    event.preventDefault();
    const { articleId } = this.props;
    const { commentBody } = this.state;
    const username = localStorage.username;

    api
      .postComment(articleId, commentBody, username)
      .then(comment => {
        this.props.showNewComment(comment);
        this.setState({ commentBody: '' });
      })
      .catch(() => {
        this.setState({ err: true });
      });
  };
}

export default AddComment;

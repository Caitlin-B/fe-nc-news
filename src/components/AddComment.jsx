import React, { Component } from 'react';
import * as api from '../api';

class AddComment extends Component {
  state = { commentBody: '' };
  render() {
    return (
      <form onSubmit={this.postComment}>
        <input type='text' value={this.state.commentBody} onChange={this.handleChange}></input>
        <button >Submit</button>
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

    api.postComment(articleId, commentBody, username).then(comment => {
      this.props.showNewComment(comment);
      this.setState({ commentBody: '' });
    });
  };
}

export default AddComment;

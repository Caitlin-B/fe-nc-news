import React, { Component } from 'react';

class AddComment extends Component {
  state = { commentInput: '' };
  render() {
    return (
      <form onChange={this.handleChange}>
        <input type='text'></input>
        <button onClick={this.postComment}>Submit</button>
      </form>
    );
  }

  handleChange = event => {
    this.setState({ commentInput: event.target.value });
  };
  //make a post request for comment with jwt

  postComment = event => {
    event.preventDefault();
  };
}

export default AddComment;

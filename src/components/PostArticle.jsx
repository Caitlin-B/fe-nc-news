import React, { Component } from 'react';
import * as api from '../api';
import {navigate} from '@reach/router'

class PostArticle extends Component {
  state= {
    title: '',
    body: ''
  }
  render() {
    return (
      <div>
        <form onSubmit={this.postTopic}>
          <label>
          Title: <input type='text' onChange={(e) => {this.handleChange(e, 'title')}} require/>
          </label>
          <label>
          Article: <input type='text' onChange={(e) => {this.handleChange(e, 'body')}} require/>
          </label>
          <button>Submit</button>
        </form>
      </div>
    );
  }

  handleChange = (e, input) => {
    this.setState({ [input]: e.target.value });
  };

  postTopic = (e) => {
    e.preventDefault();
    const {topic} = this.props;
    const {title, body} = this.state;
    const {username} = localStorage;
    
    api.postArticle({topic, title, body, username}).then(article_id => {
      navigate(`/articles/${article_id}`)
    })
  }
}

export default PostArticle;
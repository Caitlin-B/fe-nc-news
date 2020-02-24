import React, { Component } from 'react';
import * as api from '../api';
import Comments from '../components/Comments';
import Toggle from '../components/Toggle';
import AddComment from '../components/AddComment';

class Article extends Component {
  state = {
    article: {},
    comments: [],
    articleIsLoading: true,
    commentsIsLoading: true
  };
  render() {
    const {
      title,
      body,
      votes,
      topic,
      author,
      created_at,
      comment_count
    } = this.state.article;
    return (
      <div>
        {this.state.articleIsLoading ? (
          <p>loading article...</p>
        ) : (
          <>
            <h2> {title}</h2>
            <p>{topic}</p>
            <p>
              posted by {author} at {created_at}
            </p>
            <p>{body}</p>
            <p>votes: {votes}</p>
            <p>comments: {comment_count}</p>
          </>
        )}
        <br></br>
        {this.state.commentsIsLoading ? (
          <p>loading comments...</p>
        ) : (
          <>
          <Toggle buttonMessage='Add a comment'>
            <AddComment articleId={this.props.article_id}/>
          </Toggle>
          <Comments comments={this.state.comments} />
          </>
        )}
      </div>
    );
  }

  componentDidMount() {
    const { article_id } = this.props;

    api.fetchArticle(article_id).then(article => {
      this.setState({ article, articleIsLoading: false });
    });
    api.fetchComments(article_id).then(comments => {
      this.setState({ comments, commentsIsLoading: false });
    });
  }
}

export default Article;

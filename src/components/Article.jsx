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
            <h2>
              {' '}
              {title}{' '}
              <button onClick={this.upvoteArticle}>
                <span role='img' aria-label='upvote'>
                  ⬆️
                </span>
              </button>{' '}
              <button onClick={this.downvoteArticle}>
                <span role='img' aria-label='downvote'>
                  ⬇️
                </span>
              </button>
            </h2>
            <p>{topic}</p>
            <p>
              posted by {author} at {created_at}
            </p>
            <p>{body}</p>
            <p>
              votes: {votes} comments: {comment_count}
            </p>
          </>
        )}
        <br></br>
        {this.state.commentsIsLoading ? (
          <p>loading comments...</p>
        ) : (
          <>
            <Toggle buttonMessage='Add a comment'>
              <AddComment
                articleId={this.props.article_id}
                loggedInUser={this.props.loggedInUser}
                showNewComment={this.showNewComment}
              />
            </Toggle>
            <Comments
              comments={this.state.comments}
              deleteComment={this.deleteComment}
              upvoteComment={this.upvoteComment}
              downvoteComment={this.downvoteComment}
            />
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

  //add functionality so you can only vote once??

  upvoteArticle = () => {
    api.patchArticleVotes(this.props.article_id, 1).then(votes => {
      this.setState(currentState => {
        return { article: { ...currentState.article, votes } };
      });
    });
  };

  downvoteArticle = () => {
    api.patchArticleVotes(this.props.article_id, -1).then(votes => {
      this.setState(currentState => {
        return { article: { ...currentState.article, votes } };
      });
    });
  };

  showNewComment = comment => {
    this.setState(currentState => {
      return { comments: [comment, ...currentState.comments] };
    });
  };

  deleteComment = (e, comment_id) => {
    api
      .removeComment(comment_id)
      .then(() => {
        return api.fetchComments(this.props.article_id);
      })
      .then(comments => {
        this.setState({ comments });
      });
  };
  
  upvoteComment = comment_id => {
    api.patchComment(comment_id, 1).then(() => {
      this.setState(currentState => {
          const newComments = currentState.comments.map(comment => {
          if (comment.comment_id === comment_id) {
            return { ...comment, votes: comment.votes + 1 };
          } else return {...comment};
        });
        return {comments: newComments}
      });
    });
  };


  downvoteComment = comment_id => {
    api.patchComment(comment_id, -1);
  };
}

export default Article;

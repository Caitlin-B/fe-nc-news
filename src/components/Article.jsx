import React, { Component } from "react";
import { navigate } from "@reach/router";
import * as api from "../api";
import Comments from "../components/Comments";
import Toggle from "../components/Toggle";
import AddComment from "../components/AddComment";
import { formatDate } from "../utils/utils";
import styles from "./Article.module.css";
import ErrorPage from "./ErrorPage";
import VotingButtons from "./VotingButtons";
import speechbubble from "../images/speechbubble.png";
import throttle from "lodash/throttle";

class Article extends Component {
  state = {
    article: {},
    comments: [],
    articleIsLoading: true,
    commentsIsLoading: true,
    page: 1,
    hasAllItems: false
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
    let formattedDate;
    if (created_at) {
      formattedDate = formatDate(created_at);
    }
    return this.state.err ? (
      <ErrorPage path="/*" err={{ msg: this.state.err.msg, status: this.state.err.status }} />
    ) : (
      <div>
        {this.state.articleIsLoading ? (
          <p>loading article...</p>
        ) : (
          <div className={styles.full_article_tile}>
            <h2 className={styles.article_title}> {title}</h2>
            <p className={styles.article_subheading}>
              posted by{" "}
              {author === localStorage.username ? (
                <span className={styles.you_name_replacement}> you </span>
              ) : (
                <button
                  className={styles.user_button}
                  onClick={() => navigate(`/user/${author}`)}>
                  {" "}
                  {author}
                </button>
              )}{" "}
              on {formattedDate} in{" "}
              <button
                className={styles.article_topic}
                onClick={() => navigate(`/topics/${topic}`)}>
                {" "}
                {topic}
              </button>
            </p>
            <p>{body}</p>
            <section className={styles.votes_comments_block}>
              {votes}
              <VotingButtons
                upvoteItem={this.upvoteArticle}
                downvoteItem={this.downvoteArticle}
              />{" "}
              {comment_count}{" "}
              <img
                className={styles.speechbubble_img}
                src={speechbubble}
                alt="comments"></img>{" "}
              {author === localStorage.username && (
                <button
                  className={styles.delete_article}
                  onClick={this.deleteArticle}>
                  Delete article
                </button>
              )}
            </section>
          </div>
        )}
        <br></br>
        {this.state.commentsIsLoading ? (
          <p>loading comments...</p>
        ) : (
          <>
            <Toggle buttonMessage="Add a comment">
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

    this.addScrollEventListener();

    api.fetchArticle(article_id).then(article => {
      this.setState({ article, articleIsLoading: false });
    });
    api
      .fetchComments(article_id)
      .then(comments => {
        this.setState(currentState => {
          return {
            comments,
            commentsIsLoading: false,
            page: currentState.page + 1
          };
        });
      })
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status }
        });
      });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  addScrollEventListener = () => {
    window.addEventListener("scroll", this.handleScroll);
  };

  handleScroll = throttle(event => {
    const distanceFromTop = window.scrollY;
    const heightOfScreen = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    if (distanceFromTop + heightOfScreen === documentHeight) {
      this.getComments(this.props.topic);
    }
  }, 2000);

  getComments = () => {
    return api
      .fetchComments(this.props.article_id, this.state.page)
      .then(comments => {
        this.setState(currentState => {
          return {
            comments: currentState.comments.concat(comments),
            isLoading: false,
            page: currentState.page + 1
          };
        });
      });
  };

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

  deleteArticle = () => {
    api.removeArticle(this.props.article_id).then(() => {
      navigate("/");
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
          } else return { ...comment };
        });
        return { comments: newComments };
      });
    });
  };

  downvoteComment = comment_id => {
    api.patchComment(comment_id, -1).then(() => {
      this.setState(currentState => {
        const newComments = currentState.comments.map(comment => {
          if (comment.comment_id === comment_id) {
            return { ...comment, votes: comment.votes - 1 };
          } else return { ...comment };
        });
        return { comments: newComments };
      });
    });
  };
}

export default Article;

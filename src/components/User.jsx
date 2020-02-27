import React, { Component } from 'react';
import * as api from '../api';
import ArticlesList from './ArticlesList';
import styles from './User.module.css';
import ErrorPage from './ErrorPage';

class User extends Component {
  state = {
    user: {},
    isLoading: true,
    articles: [],
    err: null
  };

  render() {
    const { username, name, avatar_url } = this.state.user;

    return this.state.err ? (
      <ErrorPage path='/*' err={{ msg: 'Not Found!', status: 404 }} />
    ) : this.state.isLoading ? (
      <p>loading...</p>
    ) : (
      <div>
        <section className={styles.user_tile}>
          <img className={styles.avatar_pic} src={avatar_url} alt='User avatar'></img>
          <div>
            <h2 className={styles.user_full_name}>{name}</h2>
            <h3>{username}</h3>
            <h3>{this.state.articles.length} posted articles</h3>
          </div>
        </section>
        <ArticlesList articles={this.state.articles} />
      </div>
    );
  }

  componentDidMount() {
    const { username } = this.props;

    return Promise.all([
      api.getUser(username),
      api.fetchArticles({ author: this.props.username })
    ])
      .then(([user, {articles}]) => {
        this.setState({ user, articles, isLoading: false });
      })
      .catch(() => {
        this.setState({ err: { msg: 'Not Found!', status: 404 } });
      });
  }
}

export default User;

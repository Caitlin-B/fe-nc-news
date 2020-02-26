import React, { Component } from 'react';
import * as api from '../api';
import ArticlesList from './ArticlesList';
import styles from './User.module.css';

class User extends Component {
  state = {
    user: {},
    isLoading: true,
    articles: []
  };

  render() {
    const { username, name, avatar_url } = this.state.user;

    return this.state.isLoading ? (
      <p>loading...</p>
    ) : (
      <div>
        <section className={styles.user_tile}>
          <img className={styles.avatar_pic} src={avatar_url}></img>
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
    ]).then(([user, articles]) => {
      this.setState({ user, articles, isLoading: false });
    });
  }

  getUserArticles = () => {
    return api.fetchArticles({ author: this.props.username });
  };
}

export default User;

import axios from 'axios';

const baseURL = 'https://cb-news.herokuapp.com/api';

export const fetchArticles = ({ author, topic, sort_by, order , p} = {}) => {
  return axios
    .get(baseURL + '/articles', { params: { author, topic, sort_by, order, p } })
    .then(result => {
      return result.data;
    });
};

export const fetchTopics = () => {
  return axios.get(baseURL + '/topics').then(result => {
    return result.data.topics;
  });
};

export const fetchArticle = article_id => {
  return axios
    .get(baseURL + `/articles/${article_id}`)
    .then(result => result.data.article);
};

export const fetchComments = (article_id, p) => {
  return axios
    .get(baseURL + `/articles/${article_id}/comments`, {params:{p}})
    .then(result => result.data.comments);
};

export const patchArticleVotes = (article_id, incrementBy) => {
  return axios
    .patch(baseURL + `/articles/${article_id}`, { inc_votes: incrementBy })
    .then(res => res.data.article.votes);
};

export const postLogIn = (username, password) => {
  return axios.post(baseURL + '/login', { username, password }).then(res => {
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('username', username);
  });
};

export const postUser = newUser => {
  return axios.post(baseURL + '/users', newUser);
};

export const postComment = (article_id, body, username) => {
  return axios
    .post(
      baseURL + `/articles/${article_id}/comments`,
      {
        username,
        body
      },
      {
        headers: { Authorization: 'BEARER ' + localStorage.token }
      }
    )
    .then(res => res.data.comment);
};

export const removeComment = comment_id => {
  return axios.delete(baseURL + `/comments/${comment_id}`);
};

export const patchComment = (comment_id, inc_votes) => {
  return axios
    .patch(baseURL + `/comments/${comment_id}`, { inc_votes })
    .then(res => res.data.comment.votes);
};

export const getUser = username => {
  return axios
    .get(baseURL + `/users/${username}`)
    .then(res => res.data.user);
};

export const postArticle = (newComment) => {
  return axios.post(baseURL + '/articles', newComment, {
    headers: { Authorization: 'BEARER ' + localStorage.token }
  }).then(res => res.data.article.article_id)
}

export const removeArticle = article_id => {
  return axios.delete(baseURL + `/articles/${article_id}`)
}

export const postTopic = (slug, description) => {
  return axios.post(baseURL + '/topics', {slug, description}).then(res => res.data.topic)
}
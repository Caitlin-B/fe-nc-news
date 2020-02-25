import axios from 'axios';

const baseURL = 'https://cb-news.herokuapp.com/api';

export const fetchArticles = ({ author, topic, sort_by, order } = {}) => {
  return axios
    .get(baseURL + '/articles', { params: { author, topic, sort_by, order } })
    .then(result => {
      return result.data.articles;
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

export const fetchComments = article_id => {
  return axios
    .get(baseURL + `/articles/${article_id}/comments`)
    .then(result => result.data.comments);
};

export const patchCommentVotes = (article_id, incrementBy) => {
  return axios
    .patch(baseURL + `/articles/${article_id}`, { inc_votes: incrementBy })
    .then(res => res.data.article.votes);
};

export const postLogIn = (username, password) => {
  return axios.post(baseURL + '/login', { username, password }).then(res => {
    localStorage.setItem('token', res.data.token);
  });
};

export const postUser = newUser => {
  return axios.post(baseURL + '/users', newUser);
};

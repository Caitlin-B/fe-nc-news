import axios from 'axios';

const baseURL = 'https://cb-news.herokuapp.com/api';

export const fetchArticles = ({ author, topic, sort_by }={}) => {
  return axios
    .get(baseURL + '/articles', { params: { topic } })
    .then(result => {
      return result.data.articles;
    });
};

export const fetchTopics = () => {
  return axios.get(baseURL + '/topics').then(result => {
    return result.data.topics;
  });
};

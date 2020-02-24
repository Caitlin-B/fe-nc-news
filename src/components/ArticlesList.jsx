import React from 'react';
import ArticleTile from './ArticleTile'

const ArticlesList = ({ articles }) => {
  return (
    <ul>
      {articles.map(article => {
        return (
          <li className='articleTile' key={article.article_id}>
            <ArticleTile article={article}/>
          </li>
        );
      })}
    </ul>
  );
};

export default ArticlesList;

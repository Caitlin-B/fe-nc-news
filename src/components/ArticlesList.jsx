import React from 'react';
import ArticleTile from './ArticleTile';
import styles from './ArticlesList.module.css'

const ArticlesList = ({ articles }) => {
  return (
    <ul 
    className={styles.article_list_block}
    >
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

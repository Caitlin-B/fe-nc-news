import React from 'react';
import { Link, navigate } from '@reach/router';
import styles from './ArticleTile.module.css';
import {formatDate} from '../utils/utils'

const ArticleTile = ({ article }) => {
  const {
    article_id,
    title,
    body,
    votes,
    topic,
    author,
    created_at,
    comment_count
  } = article;
  
  const formattedDate = formatDate(created_at)

  return (
    <div className={styles.article_list_item}>
      <Link to={`/articles/${article_id}`} style={{ textDecoration: 'none' }}>
        <h2 className={styles.article_title}> {title} </h2>{' '}
      </Link>
      <p className={styles.article_subheading}>
        posted by {author} on {formattedDate} in{' '}
        <button
          className={styles.article_topic}
          onClick={() => navigate(`/topics/${topic}`)}>
          {' '}
          {topic}
        </button>
      </p>
      <p>
        {body
          .split(' ')
          .slice(0, 40)
          .join(' ')}
        ...
      </p>
      <p>
        {votes} votes {comment_count} Comments
      </p>
    </div>
  );
};

export default ArticleTile;

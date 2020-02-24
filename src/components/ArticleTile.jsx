import React from 'react';
import {Link} from '@reach/router';

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

  return (
    <div>
      <h2> {title}</h2>
      <p>{topic}</p>
      <p>
        posted by {author} at {created_at}
      </p>
      <p>
        {body
          .split(' ')
          .slice(0, 40)
          .join(' ')}
        ...
      </p>
      <p>votes: {votes}</p>
      <p>comments: {comment_count}</p>
      <Link to={`/articles/${article_id}`}>See more...</Link>
    </div>
  );
};

export default ArticleTile;

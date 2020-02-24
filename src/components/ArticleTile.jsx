import React from 'react';

const ArticleTile = ({article}) => {
const {title, body, votes, topic, author, created_at, comment_count} = article; 
 return (
    <div>
      <h2> {title}</h2>
      <p>{topic}</p>
      <p>posted by {author} at {created_at}</p>
      <p>{body.split(' ').slice(0,40).join(' ')}...</p>
      <p>votes: {votes}</p>
      <p>comments: {comment_count}</p>
    </div>
  );
};

export default ArticleTile;
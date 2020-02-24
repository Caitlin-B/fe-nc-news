import React from 'react';

const Comments = props => {
  const { comments } = props;
  return comments.map(comment => {
    return <div key={comment.comment_id}>
      <p>{comment.author}</p>
      <p>{comment.created_at}</p>
      <p>{comment.body}</p>
      <p>votes: {comment.votes}</p>
      <br></br>
    </div>;
  });
};

export default Comments;

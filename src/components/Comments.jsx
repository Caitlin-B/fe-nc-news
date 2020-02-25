import React from 'react';

const Comments = props => {
  const { comments, deleteComment, upvoteComment, downvoteComment } = props;
  return comments.map(comment => {
    const { author, created_at, comment_id, body, votes } = comment;

    return (
      <div key={comment_id}>
        <p>{author}</p>
        <p>{created_at}</p>
        <p>{body}</p>
        <p>votes: {votes}</p>
        {author === localStorage.username && (
          <button
            onClick={e => {
              deleteComment(e, comment_id);
            }}>
            Delete comment
          </button>
        )}
        <button
          onClick={() => {
            upvoteComment(comment_id);
          }}>
          <span role='img' aria-label='upvote'>
            ⬆️
          </span>
        </button>{' '}
        <button
          onClick={() => {
            downvoteComment(comment_id);
          }}>
          <span role='img' aria-label='downvote'>
            ⬇️
          </span>
        </button>
        <br></br>
      </div>
    );
  });
};

export default Comments;

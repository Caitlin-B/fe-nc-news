import React from 'react';
import { navigate } from '@reach/router';
import { formatDate } from '../utils/utils';
import styles from './Comments.module.css';

const Comments = props => {
  const { comments, deleteComment, upvoteComment, downvoteComment } = props;
  return (
    <div className={styles.comments_list}>
      {comments.map(comment => {
        const { author, created_at, comment_id, body, votes } = comment;
        const formattedDate = formatDate(created_at);

        return (
          <div key={comment_id} className={styles.comment_tile}>
            <p className={styles.comment_body}>{body}</p>
            <p className={styles.comment_details_block}>
              posted by{' '}
              {author === localStorage.username ? (
                <span className={styles.you_name_replacement}> you </span>
              ) : (
                <button
                  className={styles.user_button}
                  onClick={() => navigate(`/user/${author}`)}>
                  {' '}
                  {author}
                </button>
              )}{' '}
              on {formattedDate}{' '}
              {author === localStorage.username && (
                <button
                  className={styles.delete_comment_button}
                  onClick={e => {
                    deleteComment(e, comment_id);
                  }}>
                  Delete comment
                </button>
              )}
            </p>
            <p className={styles.voting_block}>
              {votes} votes{' '}
              <button
                className={styles.comment_vote_button}
                onClick={() => {
                  upvoteComment(comment_id);
                }}>
                <span role='img' aria-label='upvote'>
                  ⬆️
                </span>
              </button>{' '}
              <button
                className={styles.comment_vote_button}
                onClick={() => {
                  downvoteComment(comment_id);
                }}>
                <span role='img' aria-label='downvote'>
                  ⬇️
                </span>
              </button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;

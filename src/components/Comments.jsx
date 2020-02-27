import React from 'react';
import { navigate } from '@reach/router';
import { formatDate } from '../utils/utils';
import styles from './Comments.module.css';
import VotingButtons from './VotingButtons';

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
            <section className={styles.voting_block}>
              {votes}{' '}
              <VotingButtons upvoteItem={upvoteComment} downvoteItem={downvoteComment} comment_id={comment_id}/>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;

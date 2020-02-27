import React, { Component } from 'react';
import styles from './VotingButtons.module.css';
import downblack from '../images/downblack.png';
import downred from '../images/downred.png';
import upblack from '../images/upblack.png';
import upgreen from '../images/upgreen.png';


class VotingButtons extends Component {
  state = { upvoted: false, downvoted: false };
  render() {
    return (
      <section className={styles.voting_buttons_block}>
        <button onClick={this.upvoteButton} className={styles.voting_button}>
          <span role='img' aria-label='upvote'>
            {this.state.upvoted ? (
              <img className={styles.voting_img}src={upgreen} alt='upvote'></img>
            ) : (
              <img className={styles.voting_img}src={upblack} alt='upvote'></img>
            )}
          </span>
        </button>
        <button onClick={this.downvoteButton} className={styles.voting_button}>
          <span role='img' aria-label='downvote'>
            {this.state.downvoted ? (
              <img className={styles.voting_img}src={downred} alt='downvote'></img>
            ) : (
              <img className={styles.voting_img}src={downblack} alt='downvote'></img>
            )}
          </span>
        </button>
      </section>
    );
  }

  upvoteButton = () => {
    const { upvoted } = this.state;
    const { upvoteItem, downvoteItem, comment_id } = this.props;

    if(comment_id) {
      if (!upvoted) {
        upvoteItem(comment_id);
        this.setState({ upvoted: true });
      } else {
        downvoteItem(comment_id);
        this.setState({ upvoted: false });
      }
    } else {
      if (!upvoted) {
        upvoteItem();
        this.setState({ upvoted: true });
      } else {
        downvoteItem();
        this.setState({ upvoted: false });
      }
    }
  };

  downvoteButton = () => {
    const { downvoted } = this.state;
    const { upvoteItem, downvoteItem, comment_id } = this.props;

    if(comment_id) {
      if (!downvoted) {
        downvoteItem(comment_id);
        this.setState({ downvoted: true });
      } else {
        upvoteItem(comment_id);
        this.setState({ downvoted: false });
      }
    } else {

      if (!downvoted) {
        downvoteItem();
        this.setState({ downvoted: true });
      } else {
        upvoteItem();
        this.setState({ downvoted: false });
      }
    }
  };
}

export default VotingButtons;

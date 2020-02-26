import React, { Component } from "react";
import styles from './Toddle.module.css'

class Toggle extends Component {
  state = { isShowing: false };
  render() {
    return (
      <div className={styles.toggle_block}>
        <button className = {styles.toggle_button} onClick={this.showing}>{this.props.buttonMessage}</button>
       {/* <div className={styles.add_comment_block}> */}
          {this.state.isShowing && this.props.children}
          {/* </div> */}
      </div>
    );
  }

  showing = () => {
    this.setState(currentState => {
      return { isShowing: !currentState.isShowing };
    });
  };
}

export default Toggle;
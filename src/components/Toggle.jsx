import React, { Component } from "react";
import styles from './Toggle.module.css'

class Toggle extends Component {
  state = { isShowing: false };
  render() {
    return (
      <div className={styles.toggle_block}>
        <button className = {styles.toggle_button} onClick={this.showing}>{this.props.buttonMessage}</button>
          {this.state.isShowing && this.props.children}
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
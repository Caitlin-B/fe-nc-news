import React from 'react';
import styles from './ErrorPage.module.css';

const ErrorPage = ({err}) => {
  return (
    <section className={styles.error_message}>
      <h2>{err.status}: {err.msg}</h2>
    </section>
  );
  }

export default ErrorPage;
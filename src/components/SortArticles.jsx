import React from 'react';
import styles from './SortArticles.module.css'

const SortArticles = props => {
  return (
    <label className={styles.sort_by_block}>
      Sort by:
      {' '}
      <select className={styles.sort_select} onChange={props.filterOptions}>
        <option className={styles.sort_option} value='created_at.desc'>Newest</option>
        <option value='created_at.asc'>Oldest</option>
        <option value='votes.desc'>Highest rated</option>
        <option value='votes.asc'>Lowest rated</option>
        <option value='comment_count.desc'>Most comments</option>
      </select>
    </label>
  );
};

export default SortArticles;

import React from 'react';

const SortArticles = props => {
  return (
    <label>
      Sort by:
      {' '}
      <select onChange={props.filterOptions}>
        <option value='created_at.desc'>Newest</option>
        <option value='created_at.asc'>Oldest</option>
        <option value='votes.desc'>Highest rated</option>
        <option value='votes.asc'>Lowest rated</option>
        <option value='comment_count.desc'>Most comments</option>
      </select>
    </label>
  );
};

export default SortArticles;

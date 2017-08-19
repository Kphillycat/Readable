import React, { Component } from 'react';

class SortControl extends Component {
  render(){
    const { sortByKey, handleOnChange } = this.props;
    return(
      <div>
        <select name="sort-order" value={sortByKey} onChange={handleOnChange}>
          <option value="voteScore">Vote Score</option>
          <option value="timestamp">Time</option>
        </select>
      </div>
    );
  }
}

export default SortControl;

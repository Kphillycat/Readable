import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SortControl extends Component {
  render(){
    const { sortByKey, handleOnChange } = this.props;
    return(
      <div>
        <SelectField
          floatingLabelText="Sort Order"
          name="sort-order"
          value={sortByKey}
          onChange={handleOnChange}
        >
            <MenuItem value={"voteScore"} primaryText="Vote Score" />
            <MenuItem value={"timestamp"} primaryText="Time" />
        </SelectField>
      </div>
    );
  }
}

export default SortControl;

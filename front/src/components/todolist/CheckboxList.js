import React from 'react';
import List from '@material-ui/core/List';
import CheckboxListItem from './CheckboxListItem';

const CheckboxList = props => (
  <div>
    <List className="Checkboxlist">
      {Object.keys(props.items).map((key, index) => {      	
        return (<CheckboxListItem key={key} id={key} className="CheckboxListItem-container" item={props.items[key]} {...props}/>);
      })}
    </List>
  </div>
)

export default CheckboxList;
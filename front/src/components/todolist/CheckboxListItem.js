import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import './CheckboxListItem.css';
import {updateTodo} from '../../api/todoApi';

class CheckboxListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	...props.item, id: props.id
    };
  }

  handleChange = (name, valueProperty, callback) => event => {
    this.setState({
      [name]: event.target[valueProperty],
    }, callback);
  }

  handleItemUpdate = () => {
    updateTodo(this.state).then(response => {
      console.log("todo updated")
    })
  }

  render() {
    return (
      <ListItem
        className={this.state.completed?'CheckboxListItem-completed':''}
	      dense>
	      	<Checkbox
	            checked={this.state[this.props.toggleField]}            
	            onChange={this.handleChange(this.props.toggleField, 'checked', this.handleItemUpdate)}
	            disableRipple/>
	      	<TextField value={this.state[this.props.textField]} 
	          	onChange={this.handleChange(this.props.textField, 'value')} 
              onBlur={this.handleItemUpdate}
	          	fullWidth/>	  	
          
            <IconButton aria-label="Delete" onClick={this.props.onItemDelete(this.state.id)}>
              <Icon>delete</Icon>
            </IconButton>
	    </ListItem>
    );
  }
}

export default CheckboxListItem;
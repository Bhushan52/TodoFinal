import React, {Component} from 'react';
//import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
//import IconButton from '@material-ui/core/IconButton';
//import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';

class CheckboxListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	...props.item, id: props.id
    };
  }

  handleChange = (name, valueProperty) => event => {
    this.setState({
      [name]: event.target[valueProperty],
    });
  }

  handleCheckboxChange = name => event => {
    this.setState({
      [name]: event.target.checked,
    });
  }

  render() {
    return (
      <ListItem
	      role={undefined}
	      dense>
	      	<Checkbox
	            checked={this.state[this.props.toggleField]}            
	            onChange={this.handleChange(this.props.toggleField, 'checked')}
	            disableRipple/>
	      	<TextField value={this.state[this.props.textField]} 
	          	onChange={this.handleChange(this.props.textField, 'value')} 
	          	fullWidth/>	  		
	    </ListItem>
    );
  }
}

export default CheckboxListItem;
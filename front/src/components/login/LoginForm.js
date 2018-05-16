import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './LoginForm.css';

class LoginForm extends Component {
   state = {
    username: '',
    password: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

    authenticate(){
        console.log('onClick');
    }

  render() {
    return (
      <div className="Login-form-wrapper">      
        <TextField
          id="name"
          label="Name"
          value={this.state.username}
          onChange={this.handleChange('username')}
          margin="normal"
          fullWidth
          className="Login-form-input"/>
        <TextField
          id="password-input"
          label="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          type="password"
          autoComplete="current-password"
          margin="normal"
          fullWidth
          className="Login-form-input"/>    
        <Button variant="raised"  
          color="primary" 
          fullWidth 
          className="Login-form-submit-btn"
          onClick={this.authenticate}>
                Login
        </Button>
          
      </div>
    );
  }
}

export default LoginForm;

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './LoginForm.css';

const LoginForm = (props) => (
  <div className="Login-form-wrapper">      
    <TextField
      id="name"
      label="Name"
      value={props.username}
      onChange={props.onFormChange('username')}
      margin="normal"
      fullWidth
      className="Login-form-input"/>
    <TextField
      id="password-input"
      label="Password"
      value={props.password}
      onChange={props.onFormChange('password')}
      type="password"
      autoComplete="current-password"
      margin="normal"
      fullWidth
      className="Login-form-input"/>    
    <Button variant="raised"  
      color="primary" 
      fullWidth 
      className="Login-form-submit-btn"
      onClick={props.authenticate}>
            Login
    </Button>
  </div>
);
export default LoginForm;
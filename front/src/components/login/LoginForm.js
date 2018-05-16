import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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

  render() {
    return (
      <div className="Login-form-wrapper">
        <Grid container
              spacing={16}
              alignItems='center'
              direction='column'
              justify='center'>
          <Grid item className="Login-form-input">
            <TextField
              id="name"
              label="Name"
              value={this.state.username}
              onChange={this.handleChange('username')}
              margin="normal"
              fullWidth/>
          </Grid>
          <Grid item className="Login-form-input">
            <TextField
              id="password-input"
              label="Password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              type="password"
              autoComplete="current-password"
              margin="normal"
              fullWidth/>    
          </Grid>

          <Grid item  className="Login-form-submit-container">
            <Button variant="raised"  color="primary" fullWidth className="Login-form-submit-btn">
                    Login
                  </Button>
              </Grid>
        </Grid>


         
          
      </div>
    );
  }
}

export default LoginForm;

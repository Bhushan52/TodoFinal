import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {authenticate, signup} from '../../api/UserApi';
import './LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.state = {userName: '', firstName: '', lastName: '', password: ''}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signupSubmit = this.signupSubmit.bind(this);
  }

  handleFormChange = name => event => {
    console.log("11111111111111111")
    console.log(name)
    this.setState({
      [name]: event.target.value,
    });
    console.log(name)
    console.log("222222222222222222222")
  }

  // signupFormChange = userName => event => {
  //   console.log("333333333333333")
  //   console.log(userName)
  //   this.setState({
  //     [userName]: event.target.value,
  //   });
  //   console.log("44444444444444")
  // }

  handleSubmit = event => {
    authenticate(this.state.username, this.state.password)
    .then(response => {
        this.props.onAuthenticationSuccess();
      })
    .catch(error => {
        this.props.onAuthenticationFail();
      }
    );
  }

  signupSubmit = event => {
    console.log("SEXY....")
    // signup("userName", "firstName", "lastName", "password")
    signup(this.state.userName, this.state.firstName, this.state.lastName, this.state.password)
    //signup(this.signupData.userName, this.signupData.firstName, this.signupData.lastName, this.signupData.password)
    .then(response => {
      console.log("Welldone bouy.......")
      //this.setState({ showMe : false} );
      window.location.reload();
        this.props.onAuthenticationSuccess();
        
      })
    .catch(error => {
        this.props.onAuthenticationFail();
      }
    );
  }

  handleSubmitt = event => {
    this.setState({ showMe : true} );
  }

  render() {
    if(this.state.showMe) { 
      console.log("Bhag benchod")

      return (
        <div className="Login-form-wrapper">      
          <TextField
            id="name"
            label="Name"
            value={this.state.userName}
            onChange={this.handleFormChange('userName')}
            margin="normal"
            fullWidth
            className="Login-form-input"/>
          <TextField
          id="firstName"
          label="First Name"
          value={this.state.firstName}
          onChange={this.handleFormChange('firstName')}
          margin="normal"
          fullWidth
          className="Login-form-input"/>
          <TextField
          id="lastName"
          label="Last Name"
          value={this.state.lastName}
          onChange={this.handleFormChange('lastName')}
          margin="normal"
          fullWidth
          className="Login-form-input"/>
          <TextField
            id="password-input"
            label="Password"
            value={this.state.password}
            onChange={this.handleFormChange('password')}
            type="password"
            autoComplete="current-password"
            margin="normal"
            fullWidth
            className="Login-form-input"/>    
          <Button variant="raised"  
            color="primary" 
            fullWidth 
            className="Login-form-submit-btn"
            onClick={this.signupSubmit}>
                  Register
          </Button>
        </div>
      )

    }else{
      console.log("Bhag madarchod")

      return (
        <div className="Login-form-wrapper">      
          <TextField
            id="name"
            label="Name"
            value={this.state.username}
            onChange={this.handleFormChange('username')}
            margin="normal"
            fullWidth
            className="Login-form-input"/>
          <TextField
            id="password-input"
            label="Password"
            value={this.state.password}
            onChange={this.handleFormChange('password')}
            type="password"
            autoComplete="current-password"
            margin="normal"
            fullWidth
            className="Login-form-input"/>    
          <Button variant="raised"  
            color="primary" 
            fullWidth 
            className="Login-form-submit-btn"
            onClick={this.handleSubmit}>
                  Login
          </Button>
          <Button variant="raised"  
            color="primary" 
            fullWidth 
            className="Login-form-submit-btn"
            onClick={this.handleSubmitt}>
                  Register
          </Button>
        </div>
      )
    }
  }
}

export default LoginForm;
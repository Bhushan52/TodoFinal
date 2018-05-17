import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import './Login.css';
import Logo from '../components/Logo';
import LoginForm from '../components/login/LoginForm';
import {authenticate} from '../api/userApi';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleFormChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  authenticate = () =>{
    authenticate(this.state.username, this.state.password)
    .then(response => {
        this.props.onAuthenticationSuccess();
      })
    .catch(error => {
        this.props.onAuthenticationFail();
      }
    );
  }

  render() {
    return (
      <div className="Login-container">
        <Logo className="Login_logo"/>
        <Paper className="Login-form-container" elevation={10} >

          <p className="Login-form-heading">Login to be productive</p>

          <LoginForm {...this.state} authenticate={this.authenticate} onFormChange={this.handleFormChange}/>

        </Paper>
      </div>
    );
  }
}

export default Login;

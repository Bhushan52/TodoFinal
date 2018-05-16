import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Login.css';
import Logo from '../components/Logo';
import LoginForm from '../components/login/LoginForm';

class Login extends Component {
  render() {
    return (
      <div className="Login-container">
        <Logo/>

        <Paper className="Login-form-container" elevation={10} >
          <p className="Login-form-heading">Login to be productive</p>

          <LoginForm/>
        </Paper>
      </div>
    );
  }
}

export default Login;

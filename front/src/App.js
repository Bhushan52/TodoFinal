import React from 'react';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import Grid from '@material-ui/core/Grid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null, isAuthenticated: true, isLoading: false };
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.loadSessionUser = this.loadSessionUser.bind(this);
  }

  loadSessionUser = () => {
    this.setState(null, false, true);
    // getSessionUser()
    // .then( user => {
    //   this.handleAuthentication(user);
    // }).catch(error => {
    //   this.handleAuthentication(null);
    // })
  }

  handleAuthentication = (user) => {
    if(user !==  null)
      this.setState(user, true, false)
    else
      this.setState(null, false, false)
  }

  
  setState = (user, isAuthenticated, isLoading) =>{
    this.setState(() => ({
      currentUser: user,
      isAuthenticated: isAuthenticated,
      isLoading: isLoading
    }))
  }

  getCurrentPage(){
    if(this.state.isAuthenticated)
      return <TodoList/>;
  
    return <Login onAuthentication={this.handleAuthentication}/>
  }

  render(){
  return (
    <Grid container 
      className="App-container"
      alignItems="center"
      justify="center">
      <Grid item lg={6} className="App-container-item">
        {this.getCurrentPage()}
      </Grid>
    </Grid>
  )}
}

export default App;

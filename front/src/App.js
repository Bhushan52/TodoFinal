import React from 'react';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import Grid from '@material-ui/core/Grid';
import {getSessionUser} from './api/userApi';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null, isAuthenticated: true, isLoading: false };
    this.loadSessionUser = this.loadSessionUser.bind(this);
  }

  loadSessionUser = () => {
    getSessionUser()
    .then(user => this.assignUser(user))
    .catch(error => {
        console.log(error);
        this.assignUser(null);
      }
    );
  }

  componentDidMount = () => {
    this.loadSessionUser();
  }

  assignUser = (user) => {
    if(user !==  null)
      this.setUserState(user, true, false)
    else
      this.setUserState(null, false, false)
  }

  handleAuthenticationSuccess = () =>{
    this.loadSessionUser();
  }

  handleAuthenticationFail = () => {
    this.assignUser(null);
  }

  setUserState = (user, isAuthenticated, isLoading) =>{
    this.setState(() => ({
      currentUser: user,
      isAuthenticated: isAuthenticated,
      isLoading: isLoading
    }))
  }

  getPageToRender(){
    if(this.state.isAuthenticated)
      return <TodoList/>;
  
    return <Login onAuthenticationSuccess={this.handleAuthenticationSuccess} 
      onAuthenticationFail={this.handleAuthenticationFail}/>
  }

  render(){
    return (
      <Grid container 
        className="App-container"
        alignItems="center"
        justify="center">
        <Grid item lg={6} className="App-container-item">
          {this.getPageToRender()}
        </Grid>
      </Grid>
  )}
}

export default App;

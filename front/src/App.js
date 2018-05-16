import React from 'react';
import Login from './pages/Login';

function App(props){
    console.log(props);
    if(props.isLoggedIn)
      return <div>Logged in</div>;
    return <Login/>
}

export default App;

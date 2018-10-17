import React, { Component } from 'react';
import NavBar from './Home/Navbar';
import Auth from './auth/Auth';
import Splash from './Home/Splash';
import Footer from './Home/Footer';
import './Home/footer.css';
import APIURL from './helpers/environment';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';



class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: ''  //1
    }
  }

componentWillMount() {
  const token = localStorage.getItem('token'); //4
  if (token && !this.state.sessionToken) {   //5 
    this.setState({ sessionToken: token });
  }
}
                //2
setSessionState = (token) => {
  localStorage.setItem('token', token); //3
  this.setState({ sessionToken: token });
}


// need to reset path to '/' on logout
logout = () => {
  this.setState({ 
    sessionToken: '', 
  });
  localStorage.clear();
}

//render method is down here

protectedViews = () => {
  if (this.state.sessionToken === localStorage.getItem('token')) {
    return (
      <Router>
        <Route path='/' exact>
          <Splash sessionToken={this.state.sessionToken} />
        </Route>
      </Router>
    )
  } else {
    return (
      <Route path='/auth' >
        <Auth setToken={this.setSessionState} />
      </Route>
    )
  }
}

  render() {
    return (
      <Router>
        <div>
          <NavBar clickLogout={this.logout} />
          {this.protectedViews()}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

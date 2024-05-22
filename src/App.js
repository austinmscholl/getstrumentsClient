// In App.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Home/Navbar';
import Auth from './auth/Auth';
import Splash from './Home/Splash';
import Footer from './Home/Footer';
import './styles.css'; // Consolidated CSS file

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: ''  //1
    }
  }

  componentDidMount() {  // Use componentDidMount instead of componentWillMount
    const token = localStorage.getItem('token'); //4
    if (token && !this.state.sessionToken) {   //5 
      this.setState({ sessionToken: token });
    }
  }
  
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

  protectedViews = () => {
    if (this.state.sessionToken === localStorage.getItem('token')) {
      return (
        <Routes>
          <Route path='/' element={<Splash sessionToken={this.state.sessionToken} />} />
        </Routes>
      )
    } else {
      return (
        <Routes>
          <Route path='/auth' element={<Auth setToken={this.setSessionState} />} />
        </Routes>
      )
    }
  }

  render() {
    return (
      <Router>
        <div className="baseColor">
          <NavBar clickLogout={this.logout} />
          {this.protectedViews()}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="nav-links">
          <Link to={'/game/new'}>Create new tabletop</Link>
          <Link to={'/games'}>Current games</Link>
        </div>
      )
    } else {
      return (
        <div className="nav-links session">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  render(){
    return(
      <div className="nav-container">
        { this.getLinks() }
      </div>
    )
  }

}

export default NavBar;
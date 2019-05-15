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
          <Link to={'/games/new'}>Create new tabletop</Link>
          <Link to={'/games'}>Current games</Link>
          <Link to={'/games/join'}>Join a game</Link>
          <button onClick={() => this.props.logout()}>Logout</button>
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
        <Link to="/"><h2><i className="fas fa-dice-d20"></i>TableTop</h2></Link>
        { this.getLinks() }
      </div>
    )
  }

}

export default NavBar;
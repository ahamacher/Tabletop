import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      //subject to change based on actual route
      this.props.history.push('/game');
    }
    this.setState({ errors: nextProps.errors })
  }

  update(form) {
    return e => this.setState({
      [form]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { login } = this.props;
    const { email, password } = this.state;
    const user = { email, password };
    login(user);
  }

  errorsRender() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="session-form login">
        <h2>Signup for Tabletop</h2>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            placeholder="Username"
            onChange={this.update('username')}
          />
          <input
            type="email"
            placeholder="Enter e-mail"
            onChange={this.update('email')}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={this.update('password')}
          />
          <input 
            type="password"
            placeholder="Confirm Password"
            onChange={this.update('password2')}
          />
          <button type="submit">Login</button>
        </form>
          <div className="session-form-footer">
          Already have an account? <Link to={'/login'}>Login</Link>
          </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);

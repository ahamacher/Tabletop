import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    return(
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
    return(
      <div className="session-form login">
        <h2>Login to Tabletop</h2>
        <form onSubmit={this.handleSubmit}>
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
        <button type="submit">Login</button>
        <button type="button">Demo User</button>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);

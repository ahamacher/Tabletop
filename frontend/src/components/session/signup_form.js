import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
// import { login } from '../../actions/session_actions';

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
    if (nextProps.signedIn === true) {
      //subject to change based on actual route
      this.props.history.push('/');
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
    const { signup } = this.props;
    const { email, password, username, password2 } = this.state;
    const user = { username, email, password, password2 };
    signup(user);
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
      <div className="session-form">
        <section className="session-form-body signup">
          <h2>Signup for Tabletop</h2>
          <section className="session-errors">
            {this.errorsRender()}
          </section>
          <form className='session-form-inputs' onSubmit={this.handleSubmit}>
           <label>Username</label>
            <input 
              type="text"
              onChange={this.update('username')}
            />
            <label>Email</label>
            <input
              type="email"
              onChange={this.update('email')}
            />
            <label>Password</label>
            <input
              type="password"
              onChange={this.update('password')}
            />
            <label>Verify Password</label>
            <input 
              type="password"
              onChange={this.update('password2')}
            />
            <button type="submit">Signup</button>
          </form>
            <div className="session-form-footer">
            Already have an account? <Link to={'/login'}>Login</Link>
            </div>
          </section>
      </div>
    );
  }
}

export default withRouter(SignupForm);

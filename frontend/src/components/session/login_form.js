import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';

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

  handleDemo(){
    const { login } = this.props;
    const user = { email: "mattmercer@dnd.com", password: "password" };
    login(user);
  }

  render() {
    return(
      <div className="session-form login">
        <section className="session-form-body">
          <h2>Login to Tabletop</h2>
          <section className="session-errors">
            {this.errorsRender()}
          </section>
          <form className='session-form-inputs' onSubmit={this.handleSubmit}>
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
          <button type="submit">Login</button>
          <button type="button" onClick={() => this.handleDemo()}>Demo User</button>
          </form>
          <div className="session-form-footer">
            Don't have an account? <Link to={'/signup'}>Signup</Link>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(LoginForm);

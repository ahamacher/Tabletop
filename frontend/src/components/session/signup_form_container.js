import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mSTP = state => ({
  signedIn: state.session.isSignedIn,
  errors: state.errors.session
});

const mDTP = dispatch => ({
  signup: user => dispatch(signup(user)),
  login: user => dispatch(login(user))
})

export default connect(mSTP, mDTP)(SignupForm);

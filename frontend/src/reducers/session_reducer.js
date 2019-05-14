import { 
  RECEIVE_USER_LOGOUT, 
  RECEIVE_USER_LOGIN, 
  RECEIVE_CURRENT_USER 
} from '../actions/session_actions';

export default function( state = {}, action ) {
  switch (action.type){
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_USER_LOGIN:
      return {
        isSignedIn: true,
        ...state
      };
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      }
    default: 
      return state;
  }
}

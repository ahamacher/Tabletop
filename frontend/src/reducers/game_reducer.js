import { 
  RECEIVE_ALL_GAMES, 
  RECEIVE_GAME 
} from '../actions/game_actions';
import { keyBy, merge } from "lodash";

const GameReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_ALL_GAMES:
      newState = merge({}, keyBy(action.games, "_id"))
      return newState;
    case RECEIVE_GAME:
      newState = merge({}, state, { [action.game._id]: action.game })
      return newState;
    default:
      return state;
  }
};

export default GameReducer;

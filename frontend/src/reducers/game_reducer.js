import { 
  RECEIVE_ALL_GAMES, 
  RECEIVE_GAME 
} from '../actions/game_actions';

const GameReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_GAMES:
      return action.games;
    case RECEIVE_GAME:
      return action.game
    default:
      return state;
  }
};

export default GameReducer;

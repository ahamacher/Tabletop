import { 
  RECEIVE_ALL_GAMES, 
  RECEIVE_GAME 
} from '../actions/game_actions';

const GameReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_GAMES:
      const newState = {};
      for (let i = 0; i < action.games.length; i++) {
        newState[action.games[i]._id] = action.games[i]
      }
      return newState;
    case RECEIVE_GAME:
      return action.game
    default:
      return state;
  }
};

export default GameReducer;

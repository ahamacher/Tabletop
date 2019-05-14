import * as gameApiUtil from "../utils/games_api_util";

export const RECEIVE_ALL_GAMES = "RECEIVE_ALL_GAMES";
export const RECEIVE_GAME = "RECEIVE_GAME";

export const receiveGames = (games) => ({
  type: RECEIVE_ALL_GAMES,
  games
});

export const receiveGame = (game) => {
  return ({
  type: RECEIVE_GAME,
  game
})
};

export const fetchGameById = (gameId) => (dispatch) => (
  gameApiUtil.fetchGamebyGameId(gameId)
  .then(res => {
   return dispatch(receiveGame(res.data))
  })
);

export const fetchAllGames = () => dispatch => (
  gameApiUtil.fetchAllGames().then(res => 
    dispatch(receiveGames(res.data))  
  )
);

export const joinGame = gameId => dispatch => (
  gameApiUtil.joinGame(gameId).then(res =>
    dispatch(receiveGame(res.data))
  )
);

export const createGame = game => dispatch => (
  gameApiUtil.createGame(game).then(res => 
    dispatch(receiveGame(res.data))  
  )
);

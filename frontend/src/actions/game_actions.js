import * as gameApiUtil from "../utils/games_api_util";

export const RECEIVE_ALL_GAMES = "RECEIVE_ALL_GAMES";
export const RECEIVE_GAME = "RECEIVE_GAME";

export const receiveGames = (games) => ({
  type: RECEIVE_ALL_GAMES,
  games
});

export const receiveGame = (game) => ({
  type: RECEIVE_GAME,
  game
});

export const fetchGameById = (gameId) => (dispatch) => (
  gameApiUtil.fetchGamebyGameId(gameId)
  .then(game => dispatch(receiveGame(game)))
);

export const fetchAllGames = () => dispatch => (
  gameApiUtil.fetchAllGames().then(games => 
    dispatch(receiveGames(games))  
  )
);

export const joinGame = gameId => dispatch => (
  gameApiUtil.joinGame(gameId).then(game =>
    dispatch(receiveGame(game))
  )
);

export const createGame = game => dispatch => (
  gameApiUtil.createGame(game).then(res => 
    dispatch(receiveGame(res))  
  )
);

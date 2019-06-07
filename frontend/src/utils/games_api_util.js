import axios from "axios";

export const fetchGamebyGameId = (gameId) => {
  return axios.get(`/api/games/${gameId}`)
}

export const createGame = (game) => {
  return axios({
    method: 'post',
    url: `/api/games`,
    data: game,
    config: { headers: {'Content-Type': 'multipart/form-data'}}
  });
};

export const joinGame = gameId => {
  return axios.put(`/api/games/${gameId}`)
}

export const fetchAllGames = () => {
  return axios.get(`/api/games/`)
}


import axios from "axios";

export const fetchGamebyGameId = (gameId) => {
  return axios.get(`/api/games/${gameId}`)
}

export const createGame = (game) => {
  return axios.post(`/api/games/`, {
    game
  })
}

export const joinGame = gameId => {
  return axios.put(`/api/games/${gameId}`)
}

export const fetchAllGames = () => {
  return axios.get(`/api/games/`)
}


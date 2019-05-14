import axios from "axios";

export const fetchGamebyGameId = (gameId) => {
  return axios.get(`/api/games/${gameId}`)
}

export const createGame = (name) => {
  return axios.post(`/api/games/`, {
    name
  })
}

export const joinGame = gameId => {
  return axios.put(`api/games/${gameId}`)
}

export const fetchAllGames = () => {
  return axios.get(`/api/games/`)
}


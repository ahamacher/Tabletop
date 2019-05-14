import axios from "axios";

export const getAllMessagesByGameId = (gameId) => {
    return axios.get(`/api/messages/game/${gameId}`)
}


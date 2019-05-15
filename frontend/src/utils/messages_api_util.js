import axios from "axios";

export const fetchMessagesByGameId = (gameId) => {
    return axios.get(`/api/messages/game/${gameId}`)
}

export const createMessage = (gameId, messageParams) => {
    return axios.post(`/api/messages/game/${gameId}`, {
        messageParams
    })
}
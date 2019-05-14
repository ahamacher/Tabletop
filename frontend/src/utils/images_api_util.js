import axios from "axios";

// #TODO get rid of redundant images/*/images in routes;
export const getImagesByGameId = (gameId) => {
    return axios.get(`/api/images/game/${gameId}`);
}

export const createImage = (gameId, image) => {
    return axios.post(`/api/images/game/${gameId}`, {
        image
    });
}


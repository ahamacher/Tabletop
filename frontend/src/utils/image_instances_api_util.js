import axios from "axios";

export const fetchImageInstancesByGameId = (gameId) => (
    axios.get(`api/image_instances/game/${gameId}`)
)

export const createImageInstance = (imageId, imageInstanceParams) => (
    axios.post(`api/image_instances/image/${imageId}`, imageInstanceParams)
)

// NOTE: updateParams takes in {positionX, positionY, scalefactor, and layer_id}
export const updateImageInstance = (imageInstanceId, updateParams) => {
    
    return axios.put(`api/image_instances/${imageInstanceId}`, updateParams)
}
import * as imageInstanceApiUtil from "../utils/image_instances_api_util";

export const RECEIVE_IMAGE_INSTANCES = "RECEIVE_IMAGE_INSTANCES";
export const RECEIVE_IMAGE_INSTANCE = "RECEIVE_IMAGE_INSTANCE";
export const CLEAR_IMAGE_INSTANCES = "CLEAR_IMAGE_INSTANCES";

export const clearImageInstances = () => ({
    type: CLEAR_IMAGE_INSTANCES
});

const receiveImageInstances = (imageInstances) => ({
    type: RECEIVE_IMAGE_INSTANCES,
    imageInstances
});

export const receiveImageInstance = (imageInstance) => ({
    type: RECEIVE_IMAGE_INSTANCE,
    imageInstance
});

export const fetchImageInstancesByGameId = (gameId) => dispatch => (
    imageInstanceApiUtil.fetchImageInstancesByGameId(gameId)
        .then((res) => dispatch(receiveImageInstances(res.data)))
);

export const createImageInstance = (imageId, imageInstanceParams) => dispatch => (
    imageInstanceApiUtil.createImageInstance(imageId, imageInstanceParams)
        .then((res) => dispatch(receiveImageInstance(res.data)))
);

export const updateImageInstance = (imageInstanceId, updateParams) => dispatch => (
    imageInstanceApiUtil.updateImageInstance(imageInstanceId, updateParams)
        .then(res => dispatch(receiveImageInstance(res.data)))
);
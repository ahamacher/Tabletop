import * as imageInstanceApiUtil from "../utils/image_instances_api_util";

export const RECEIVE_IMAGE_INSTANCES = "RECEIVE_IMAGE_INSTANCES";
export const RECEIVE_IMAGE_INSTANCE = "RECEIVE_IMAGE_INSTANCE";

const receiveImageInstances = (imageInstances) => ({
    type: RECEIVE_IMAGE_INSTANCES,
    imageInstances
});

const receiveImageInstance = (imageInstance) => ({
    type: RECEIVE_IMAGE_INSTANCE,
    imageInstance
});

export const fetchImageInstancesByGameId = (gameId) => dispatch => (
    imageInstanceApiUtil.fetchImageInstancesByGameId(gameId)
        .then((res) => dispatch(receiveImageInstances(res.data)))
);

export const createImageInstance = (imageId) => dispatch => (
    imageInstanceApiUtil.createImageInstance(imageId)
        .then((res) => dispatch(receiveImageInstance(res.data)))
);

export const updateImageInstance = (imageInstanceId, updateParams) => dispatch => {
    imageInstanceApiUtil.updateImageInstance(imageInstanceId, updateParams)
        .then(res => dispatch(receiveImageInstance(res.data)))
};
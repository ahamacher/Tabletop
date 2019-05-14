import { RECEIVE_IMAGE_INSTANCES, RECEIVE_IMAGE_INSTANCE } from '../actions/image_instance_actions';
import { keyBy, merge } from "lodash";

export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_IMAGE_INSTANCES:
            newState = merge({}, state, keyBy(action.imageInstances, "_id"));
            return newState
        case RECEIVE_IMAGE_INSTANCE:
            newState = merge({}, state);
            newState[action.imageInstance._id] = action.imageInstance;
            return newState
        default:
            return state;
    }
}
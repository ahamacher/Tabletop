import { RECEIVE_IMAGE_INSTANCES, RECEIVE_IMAGE_INSTANCE, CLEAR_IMAGE_INSTANCES } from '../actions/image_instance_actions';
import { keyBy, merge } from "lodash";

export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_IMAGE_INSTANCES:
            newState = {};
            for (let i = 0; i < action.imageInstances.length; i++) {
                newState[action.imageInstances[i]._id] = action.imageInstances[i];
            }
            return newState;
        case RECEIVE_IMAGE_INSTANCE:
            newState = merge({}, state);
            newState[action.imageInstance._id] = action.imageInstance;
            return newState;
        case CLEAR_IMAGE_INSTANCES:
            return {};
        default:
            return state;
    }
}
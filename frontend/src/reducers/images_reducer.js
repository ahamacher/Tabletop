import { RECEIVE_IMAGES, RECEIVE_IMAGE, CLEAR_IMAGES } from '../actions/image_actions';
import { keyBy, merge } from "lodash";

export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_IMAGES:
            newState = merge({}, keyBy(action.images, "_id"));
            return newState
        case RECEIVE_IMAGE:
            return merge({}, state, { [action.image.id]: action.image });
        case CLEAR_IMAGES:
            return {};
        default:
            return state;
    }
}
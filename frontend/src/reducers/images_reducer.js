import { RECEIVE_IMAGES, RECEIVE_IMAGE } from '../actions/image_actions';
import { keyBy } from "lodash";

export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_IMAGES:
            newState = Object.assign({}, keyBy(action.images, "_id"));
            return newState
        case RECEIVE_IMAGE:
            return Object.assign({}, state, { [action.image.id]: action.image })
        default:
            return state;
    }
}
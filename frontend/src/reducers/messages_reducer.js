
import { RECEIVE_MESSAGES, RECEIVE_MESSAGE } from "../actions/messages_actions";
import { keyBy, merge } from "lodash";

const messagesReducer = (state = {}, action) => {

    Object.freeze(state);
    let newState;
    switch(action.type) {
        case RECEIVE_MESSAGES:
            newState = merge({}, keyBy(action.messages, "_id"));
            return newState
        case RECEIVE_MESSAGE:
            newState = merge({}, state, {[action.message._id]: action.message} )
            return newState;
        default:
            return state;
    }
}

export default messagesReducer;
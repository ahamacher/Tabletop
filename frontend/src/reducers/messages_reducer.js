
import { RECEIVE_MESSAGES, RECEIVE_MESSAGE } from "../actions/messages_actions";
import { keyBy, merge } from "lodash";

const messagesReducer = (state = {}, action) => {

    Object.freeze(state);
    let newState;
    switch(action.type) {
        case RECEIVE_MESSAGES:
    
            while (action.messages.length > 5) {
               action.messages.pop();
            }
            
            newState = merge({}, keyBy(action.messages, "_id"));
            return newState

        case RECEIVE_MESSAGE:
            
            let newerMessages;
            if (Object.values(state).length >= 5) {
                const dates = keyBy(Object.values(state), "date");
                newerMessages = Object.values(state).filter( message => message.date !== Object.keys(dates).sort()[0]);
            }
            newState = merge({}, keyBy(newerMessages, "_id"), {[action.message._id]: action.message} )
            return newState;
        default:
            return state;
    }
}

export default messagesReducer;
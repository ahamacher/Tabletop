
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
            let reversed = action.messages.reverse();

            newState = merge({}, keyBy(reversed, "_id"));
            return newState

        case RECEIVE_MESSAGE:
            
            let newerMessages;
            
            if (Object.values(state).length > 5) {
                
                newerMessages = Object.values(state).slice(-5)
                state = keyBy(newerMessages, "_id")
                
            }
            

            newState = merge({}, state, {[action.message._id]: action.message} )
            return newState;
        default:
            return state;
    }
}

export default messagesReducer;